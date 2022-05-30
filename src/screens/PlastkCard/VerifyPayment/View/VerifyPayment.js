import React, { useRef, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../../../../component/common/Text'
import Button from '../../../../component/common/Button'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { colorRedDC143C, getIsDarkModeEnabled, mulish_bold, mulish_regular } from '../../../../utils/Constants'
import { useSelector, useDispatch } from "react-redux";
import { resetInteracCodePaymentScreenAction, submitInteracCodePaymentActionPressed } from '../Actions/VerifyPaymentActions'
import Modal from '../../../../component/common/Modal'
import CustomLoader from '../../../../component/common/CustomLoader'

export default VerifyPayment = (props) => {
    
    const myTheme = useTheme();
    const interacCodeRef = useRef('')
    const [validationError, setValidationError] = useState('')
    const textInputRef = useRef('')


    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.verifyPaymentsReducer.isLoading)
    const interacResponse = useSelector(state => state.verifyPaymentsReducer.interacResponse)

    const submitButtonPressed = () => {
        if (interacCodeRef.current === '' || interacCodeRef.current === null || interacCodeRef.current === undefined) {
            setValidationError('Please enter Interac Reference Number')
        }
        else {
            setValidationError('')
            dispatch(submitInteracCodePaymentActionPressed(interacCodeRef.current))
        }
    }

    const handleResponse = () => {

        try {
            interacCodeRef.current = ''
            textInputRef.current.clear()
        }
        catch (error) {

        }

        if (interacResponse !== '') {
            if (interacResponse.hasOwnProperty('error') && interacResponse.error)
                return (<Modal responseMessage={interacResponse.message} modalType={'error'} onPress={() => dispatch(resetInteracCodePaymentScreenAction())} />)
            else if (interacResponse.hasOwnProperty('status') && interacResponse.status) {

                const payment = interacResponse.payment
                setTimeout(() => {
                    props.navigation.navigate('VerifyPaymentSuccess', { paymentInfo: payment })
                }, 500);
                dispatch(resetInteracCodePaymentScreenAction())
            }
        }
    }

    return (

        <View style={styles.container}>

            <View>
                <Text style={[styles.interacText, { color: myTheme.colors.LABEL_COLOR }]} >Interac Reference Number</Text>

                <View style={[styles.textInputContainer, { borderBottomColor: '#DCDCDC' }]}>
                        <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR }}>Enter Interac Reference Number below </Text>
                        <TextInput style={[styles.input, { color: myTheme.colors.LABEL_COLOR, width: '100%' }]} ref={(input) => { textInputRef.current = input }} onChangeText={text => interacCodeRef.current = text} />
                    </View>
                {validationError ? <Text style={styles.errorStyle}>{validationError} </Text> : null}
                <Text style={[styles.infoText, { color: getIsDarkModeEnabled() ? '#fff' : colorRedDC143C }]}>*The time between sending the deposit & updating the activation code needs to be about 30 minutes.</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                <Button title="Confirm Payment" style={styles.button} onPress={() => submitButtonPressed()} />
            </View>

            {handleResponse()}

            {isLoading &&
                <CustomLoader/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalizeX(10),
        marginBottom: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
   
    input: {
        height: normalizeY(40) > 50 ? 50 : normalizeY(40),
        fontSize: normalizeFont(12.5),
        fontFamily: mulish_regular,
        marginBottom: normalizeY(0),
        paddingBottom: 0

    },
    interacText: {
        marginTop: normalizeY(20),
        fontFamily: mulish_bold,
        fontSize: 18,
        fontStyle: "normal",
     
    },
    textInputContainer: {
        borderBottomWidth: 0.8,
        width: "100%",
        marginTop: normalizeY(20)
    },
    button: {
        width: '100%',
        marginTop: 30,
       
    },
    errorStyle: {
        color: colorRedDC143C,
        fontSize: 11,
        marginTop: 2
    },
    infoText: {
        fontSize: normalizeFont(13),
        marginTop: normalizeY(15)
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});