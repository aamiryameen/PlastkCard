import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../../../../component/common/Text'
import Button from '../../../../component/common/Button'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { colorRedDC143C, getIsDarkModeEnabled, isIOS, mulish_bold, mulish_regular, SCREEN_WIDTH } from '../../../../utils/Constants'
import { useSelector, useDispatch } from "react-redux";
import { resetRequestCreditIncreaseScreenAction, submitRequestCreditIncreaseActionPressed, requestCreditLimitPendingAction, resetCreditLimitIncreasePending } from '../Actions/CreditIncreaseLineActions'
import Modal from '../../../../component/common/Modal'
import Moment from 'moment'
var currencyFormatter = require('currency-formatter')
import CustomLoader from '../../../../component/common/CustomLoader'
import Carousel, { Pagination } from 'react-native-snap-carousel';





export default RequestCreditIncrease = (props) => {

    const myTheme = useTheme();
    const interacCodeRef = useRef('')
    const [validationError, setValidationError] = useState('')
    const textInputRef = useRef('')
    const dispatch = useDispatch()

    const [activeSlide, setActiveSlide] = useState(0)

    const isLoading = useSelector(state => state.requestCreditIncreaseReducer.isLoading)
    const interacResponse = useSelector(state => state.requestCreditIncreaseReducer.interacResponse)
    const requestCreditPendingResponse = useSelector(state => state.requestCreditIncreaseReducer.creditLimitPending)

    const submitButtonPressed = () => {

        if (interacCodeRef.current === '' || interacCodeRef.current === null || interacCodeRef.current === undefined) {
            setValidationError('Please enter Interac Reference Number')
        }
        else {
            setValidationError('')
            dispatch(submitRequestCreditIncreaseActionPressed(interacCodeRef.current))
        }
    }

    useEffect(() => {
        dispatch(requestCreditLimitPendingAction(10, 1))

        return function cleanUp() {
            dispatch(resetCreditLimitIncreasePending())
        }
    }, [])

    const renderItem = ({ item }) => {

        return (

            <View style={[styles.pendingContainer, { borderColor: myTheme.colors.HISTORY_BORDER_COLOR }]}>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>Date : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>{Moment(item.incoming_transactions.created_at).format("DD-MMM-YYYY")}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Bank Name : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1} >{item.incoming_transactions.SenderBankName}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Name : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1}>{item.incoming_transactions.SenderName}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Amount : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(item.incoming_transactions.Amount, { code: 'CAD' })}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Reference Number : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.incoming_transactions.ReferenceNumber}</Text>
                </View>
            </View>

        )

    }


    const renderPendingSwipe = () => {

        return (
            <View >
                <Carousel
                    data={isIOS ? requestCreditPendingResponse.paginatedData.items.reverse() : requestCreditPendingResponse.paginatedData.items}
                    renderItem={(item, index) => renderItem(item)}
                    layout={'default'}
                    firstItem={isIOS ? 0 : requestCreditPendingResponse.paginatedData.items.length}
                    loop={false}
                    sliderWidth={SCREEN_WIDTH}
                    itemWidth={SCREEN_WIDTH - 40}
                    containerCustomStyle={{ marginHorizontal: -normalizeX(25) }}
                    contentContainerCustomStyle={{ paddingVertical: 10 }}
                    layoutCardOffset={11}
                    onSnapToItem={(index) => setActiveSlide(index) }
                />

                <Pagination
                    dotsLength={requestCreditPendingResponse.paginatedData.items.length}
                    activeDotIndex={activeSlide}
                    dotStyle={{
                        width: 5,
                        height: 5,
                        borderRadius: 5,
                        marginHorizontal: 3,
                        backgroundColor: getIsDarkModeEnabled() ? 'rgba(255, 255, 255, 0.92)' : 'rgba(0, 0, 0, 0.92)' 
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />

            </View>
        )
    }



    const handlePendingLimitResponse = () => {

        if (requestCreditPendingResponse !== '') {

            if (requestCreditPendingResponse.success) {
                if (requestCreditPendingResponse.paginatedData.items.length === 0) {

                    return (
                        <View>
                            <Text style={{ fontWeight: '600', color: myTheme.colors.LABEL_COLOR, textAlign: 'center', marginTop: normalizeY(25), fontSize: normalizeFont(14) }}>No Pending Requests Available</Text>
                        </View>
                    )
                }
                else {

                    return renderPendingSwipe()

                }
            } else {
                return (
                    <View>
                        <Text style={{ fontWeight: '600', color: myTheme.colors.LABEL_COLOR, textAlign: 'center', marginTop: normalizeY(25), fontSize: normalizeFont(14) }}>No Pending Requests Available</Text>
                    </View>
                )
            }
        }
    }

    const handleResponse = () => {

        if (interacResponse !== '') {

            try {
                interacCodeRef.current = ''
                textInputRef.current.clear()
            }
            catch (error) {

            }
            if (interacResponse.hasOwnProperty('error') && interacResponse.error) {

                return (<Modal responseMessage={interacResponse.message} modalType={'error'} onPress={() => dispatch(resetRequestCreditIncreaseScreenAction())} />)
            }
            else if (interacResponse.success === true) {
                if (interacResponse.data === null || interacResponse.data === undefined || interacResponse.data === '') {

                    return (<Modal responseMessage={interacResponse.message} modalType={'error'} onPress={() => dispatch(resetRequestCreditIncreaseScreenAction())} />)
                }
                else if (interacResponse.success === true) {

                    const payment = interacResponse.data

                    setTimeout(() => {
                        props.navigation.navigate('RequestCreditIncreaeSuccess', { paymentInfo: payment })
                    }, 250);
                    dispatch(resetRequestCreditIncreaseScreenAction())
                    dispatch(resetCreditLimitIncreasePending())
                    dispatch(requestCreditLimitPendingAction(10, 1))

                }
            }
        }
    }

    return (

        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

                <View>
                    <Text style={[styles.interacText, { color: myTheme.colors.LABEL_COLOR }]} >Interac Reference Number</Text>

                    <View style={[styles.textInputContainer, { borderBottomColor: '#DCDCDC' }]}>
                        <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR }}>Enter Interac Reference Number </Text>
                        <TextInput style={[styles.input, { color: myTheme.colors.LABEL_COLOR, width: '100%' }]} ref={(input) => { textInputRef.current = input }} onChangeText={text => interacCodeRef.current = text} />
                    </View>
                    {validationError ? <Text style={styles.errorStyle}>{validationError} </Text> : null}
                    <Text style={[styles.infoText, { color: getIsDarkModeEnabled() ? '#fff' : colorRedDC143C }]}>*The time between sending the deposit & updating the activation code needs to be about 30 minutes.</Text>
                </View>

                <Text style={{ fontWeight: '700', color: myTheme.colors.LABEL_COLOR, textAlign: 'center', marginVertical: normalizeY(10), fontSize: normalizeFont(14) }}>Pending Requests</Text>

                {handlePendingLimitResponse()}

                <View style={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                    <Button title="Submit Request" style={styles.button} onPress={() => submitButtonPressed()} />
                </View>

                {handleResponse()}


                {isLoading &&
                    <CustomLoader />
                }

            </ScrollView>


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
    textInputStyle: {
        paddingBottom: 3,
        fontSize: normalizeFont(14),
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
    input: {
        height: normalizeY(40) > 50 ? 50 : normalizeY(40),
        fontSize: normalizeFont(12.5),
        fontFamily: mulish_regular,
        marginBottom: normalizeY(0),
        paddingBottom: 0

    },
    iconInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    icon: {
        marginRight: 5,
    },
    pendingContainer: {
        borderWidth: 1,
        padding: normalizeX(10),
        flex: 1,
        width: "90%",
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: normalizeX(10)
    },


    rowStyle: {
        flexDirection: 'row',
        marginTop: normalizeY(5),
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: normalizeFont(13),
        color: '#000000',
        opacity: 0.65,
    },
    textStyle: {
        flex: 1,
        fontSize: normalizeFont(13),
        color: '#000000',
        opacity: 0.65,
    },
});

