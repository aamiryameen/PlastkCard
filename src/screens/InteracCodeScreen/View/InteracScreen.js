import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../component/common/Button'
import Text from '../../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import { colorRedDC143C, getAuthenticationToken, getEmail, getIsDarkModeEnabled, mulish_regular } from '../../../utils/Constants'
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../../utils/Utils'
import { useSelector, useDispatch } from 'react-redux'
import { createApplicationAction, fetchAccountStatusInteracScreen, resetInteracCodeScreen, submitInteracCode, useCurrentAsLimitAction } from '../Actions/InteracCodesActions'
import Modal from '../../../component/common/Modal'
import { getAccountStatusAction } from '../../Status/action/StatusAction'
import DialogModal from '../../../component/common/DialogModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getBaseUrl } from '../../../utils/WebService';
var currencyFormatter = require('currency-formatter');




export default InteracScreen = (props) => {

    const myTheme = useTheme();

    const [creditLimit, setCreditLimit] = useState(0)
    const [receivedAmount, setReceivedAmount] = useState(0)

    const referenceCode = useRef('')
    const [validationErrors, setValidationErrors] = useState({})
    const [showModalMessage, setShouldShowModalMessage] = useState(false)
    const [showInfoModal, setShouldShowInfoModal] = useState(false)

    const textInputRef = useRef('')

    const dispatch = useDispatch()

    const actionRef = useRef('')
    const isAutoCallSent = useRef(false)

    const interacCodeSubmissionResponse = useSelector(state => state.interacCodesReducer.interacCodeSubmissionResponse)
    const useCurrentAsLimitResponse = useSelector(state => state.interacCodesReducer.useCurrentAsLimitResponse)
    const createApplicationResponse = useSelector(state => state.interacCodesReducer.createApplicationResponse)


    useEffect(() => {
        getUserStatus(false)
    }, [])


    useEffect(() => {

        if (receivedAmount >= 300) {
            setTimeout(() => {

                setShouldShowModalMessage(true)

            }, 300);
        }

    }, [receivedAmount])


    const submitButtonPressed = () => {

        if (referenceCode.current.trim() === '') {
            let errors = {}
            errors.referenceCode = 'Please input your Interac Reference Number'
            setValidationErrors(errors)
        }
        else {
            setValidationErrors({})

            let obj = { ReferenceNumber: referenceCode.current.trim() }

            dispatch(submitInteracCode(obj))
        }
    }

    async function getUserStatus(shouldUpdate = false) {

        let jsonResponse = ''
        let response = ''
        await fetch(getBaseUrl() + 'users/get-current-status', {

            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthenticationToken()
            },
        }
        ).then(data => {
            response = data
        }).catch((error) => {
            console.error('Error:', error);
        });

        if (response.status === 200) {
            jsonResponse = await response.json()


            if (shouldUpdate)
                actionRef.current = 'submit interac success'

            setCreditLimit(jsonResponse.user.credit_limit)
            setReceivedAmount(jsonResponse.user.received_amount)
        }
    }


    const handleResponse = () => {
         if (interacCodeSubmissionResponse) {

            try {
                referenceCode.current = ''
                textInputRef.current.clear()
            }
            catch (error) {
            }

            if (interacCodeSubmissionResponse.success === false || !interacCodeSubmissionResponse.hasOwnProperty('transaction') || interacCodeSubmissionResponse.transaction.length === 0) {

                return (
                    <Modal responseMessage={interacCodeSubmissionResponse.message} modalType="error" onPress={() => dispatch(resetInteracCodeScreen())} />
                )
            }
            else {

                actionRef.current = 'submit interac success'
                setTimeout(() => {
                    dispatch(resetInteracCodeScreen())
                    getUserStatus(true)

                    if (!props.isHistoryAvailable)
                        dispatch(fetchAccountStatusInteracScreen())
                }, 250);

            }
        }
        else if (createApplicationResponse) {
            if (createApplicationResponse.success === false || createApplicationResponse.error) {

                return (
                    <Modal responseMessage={createApplicationResponse.application} modalType="error" onPress={() => dispatch(resetInteracCodeScreen())} />
                )
            }
            else {

                dispatch(resetInteracCodeScreen())
                setTimeout(() => {
                    dispatch(getAccountStatusAction())
                }, 250);

                setTimeout(() => {
                    props.navigation.goBack()
                }, 500);
            }
        }
        else if (useCurrentAsLimitResponse) {

            if (useCurrentAsLimitResponse.success === false || useCurrentAsLimitResponse.error) {

                return (
                    <Modal responseMessage={interacCodeSubmissionResponse.message} modalType="error" onPress={() => dispatch(resetInteracCodeScreen())} />
                )
            }
            else {

                actionRef.current = ''

                isAutoCallSent.current = true
                setTimeout(() => {
                    dispatch(resetInteracCodeScreen())

                    let obj = { email: getEmail() }
                    dispatch(createApplicationAction(obj))

                }, 500);

            }
        }
        else if (actionRef.current !== '') {

            actionRef.current = ''

        }
    }

    const positiveButtonPressed = () => {

        if (showInfoModal) {
            setShouldShowInfoModal(false)

        } else {
            setShouldShowModalMessage(false)

            setTimeout(() => {
                let obj = { email: getEmail(), credit_limit: receivedAmount }
                dispatch(useCurrentAsLimitAction(obj))
            }, 250);
        }


    }

    const negativeButtonPressed = () => {

        if (creditLimit < receivedAmount) {
            setTimeout(() => {
                setShouldShowInfoModal(true)

            }, 300);
        }

        setShouldShowModalMessage(false)

    }

    const showModal = () => {

        if (creditLimit === receivedAmount && isAutoCallSent.current === false && receivedAmount >= 300) {

            logFireBaseEvent('deposit_confirmation_completed')
            setShouldShowInfoModal(false)
            setShouldShowModalMessage(false)

            isAutoCallSent.current = true
            let obj = { email: getEmail() }
            dispatch(createApplicationAction(obj))
        }

        else if (showModalMessage) {

            let msg = ''
            if (creditLimit > receivedAmount) {
                msg = 'Your new Credit Limit will now be lower than the one requested in the application. Please accept your new limit of ' + currencyFormatter.format(receivedAmount, { code: 'CAD' })
            }
            else if (creditLimit < receivedAmount) {
                msg = 'Your new Credit Limit will now be greater than the one requested in the application. Please accept your new limit of ' + currencyFormatter.format(receivedAmount, { code: 'CAD' })
            }

            if(msg!=='')
                return (<DialogModal message={msg} modalType='interactive' buttons={['Yes', 'No']}
                positiveButtonPressed={positiveButtonPressed} negativeButtonPressed={negativeButtonPressed} hideOnClick={true} />)
        }
        else if (showInfoModal) {

            let msg = 'Kindly contact Plastk Customer Support at hello@plastk.ca or +1-855-485-0102 for updating your Credit Limit.'
            return (<DialogModal message={msg} modalType='info' buttons={['OK']}
                positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
        }
    }


    return (

        <View>

            {props.isHistoryAvailable ?
                <View >
                    <View style={styles.textRowStyle}>

                        <Text style={[styles.textTitleStyle, { color: myTheme.colors.DARK_TEXT_COLOR }]}>Credit Limit Requested: </Text>
                        <Text style={[styles.textValueStyle, { color: myTheme.colors.DARK_TEXT_COLOR }]}> {creditLimit} </Text>
                    </View>

                    <View style={styles.textRowStyle}>
                        <Text style={[styles.textTitleStyle, { color: myTheme.colors.DARK_TEXT_COLOR }]}>Total Received Amount: </Text>
                        <Text style={[styles.textValueStyle, { color: myTheme.colors.DARK_TEXT_COLOR }]}> {receivedAmount} </Text>

                    </View>

                    <View style={styles.textRowStyle}>
                        <Text style={[styles.textTitleStyle, { color: myTheme.colors.DARK_TEXT_COLOR }]}>Total Remaining Amount: </Text>
                        <Text style={[styles.textValueStyle, { color: myTheme.colors.DARK_TEXT_COLOR }]}> {creditLimit - receivedAmount} </Text>

                    </View>

                </View>

                : null
            }


            <View>

                <View style={{ marginTop: normalizeY(25), borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'grey', flexDirection: 'column' }}>
                    <Text style={[styles.placeholderText, { color: myTheme.colors.LABEL_COLOR }]}>Enter Interac Reference Number</Text>

                    <View style={styles.iconInputContainer}>
                        <MaterialIcons
                            name='confirmation-number'
                            color={myTheme.colors.LABEL_COLOR}
                            size={normalizeFont(16, true)}
                            style={styles.icon}
                        />
                        <TextInput style={[styles.input, { color: myTheme.colors.LABEL_COLOR, width: '100%' }]} icon="confirmation-number" ref={(input) => { textInputRef.current = input }} onChangeText={text => referenceCode.current = text} />
                    </View>
                </View>

                <Text style={[styles.infoText], { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(10) }}>{props.isHistoryAvailable ? 'Please enter another Reference Number' : 'One Reference Number at a time. Max 8 characters'}</Text>
                {validationErrors.referenceCode ? <Text style={styles.errorStyle}>{validationErrors.referenceCode} </Text> : null}
            </View>

            <View style={styles.bottomButtonsView}>

                <Button title="Submit" onPress={() => submitButtonPressed()} />

                <Text style={[styles.infoText, { color: getIsDarkModeEnabled() ? myTheme.colors.DARK_TEXT_COLOR : colorRedDC143C }]}>{'*Our system requires 30 minutes between the time you send the security funds and you enter the reference number before your details can be updated'}</Text>

            </View>


            {handleResponse()}
            {showModal()}
        </View>
    )
}


const styles = StyleSheet.create({
    textRowStyle: {
        flexDirection: 'row',
        marginTop: normalizeX(10)
    },
    textTitleStyle: {
        fontWeight: 'bold',
        fontSize: normalizeFont(12),
        color: '#000000',
        opacity: 0.65
    },
    textValueStyle: {
        fontSize: normalizeFont(12),
        color: '#000000',
        opacity: 0.65
    },
    inputContainer: {
        marginTop: normalizeY(25),
    },
    bottomButtonsView: {
        marginTop: normalizeY(15),
    },

    errorStyle: {
        color: colorRedDC143C,
        fontSize: 11,
        marginTop: 2
    },
    infoText: {
        color: colorRedDC143C,
        fontSize: normalizeFont(13),
        marginTop: normalizeY(15),
        fontFamily: mulish_regular
    },
    placeholderText: {
        fontSize: 12,
        color: 'grey',
    },
    input: {
        height: normalizeY(40) > 50 ? 50 : normalizeY(40),
        fontSize: normalizeFont(12.5),
        fontFamily: mulish_regular,
    },
    icon: {
        marginRight: 5,
    },
    iconInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
    },

})
