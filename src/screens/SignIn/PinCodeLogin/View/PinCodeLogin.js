import React, { useRef, useEffect, useState } from 'react'

import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import { normalizeY, normalizeX, getDataFromUserDefaults, saveDataInUserDefaults } from '../../../../utils/Utils'

const { width } = Dimensions.get("window");
const { height } = Dimensions.get('window');

import OTPInputView from '@twotalltotems/react-native-otp-input';


import * as Keychain from 'react-native-keychain';
import Modal from '../../../../component/common/Modal'


import { getFCMDeviceID, getLoginTries, IS_PIN_CODE_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, KEYCHAIN_PIN_KEY, ligh_green, LOGIN_TRIES, mulish_regular, MULTIPLE_INVALID_LOGIN_ERROR, PIN_CODE_SIGN_IN_SCREEN, setEmail, setLoginTries, setPassword } from '../../../../utils/Constants';
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from '../../EmailPasswordSignIn/action/EmailPasswordSignInAction';
import { signInSuccess } from '../../../Splash/Action/SplashAction';
import CustomLoader from '../../../../component/common/CustomLoader'


export default PinCodeLogin = (props) => {

    const myTheme = useTheme();

    const pin = useRef('')
    const email = useRef('')
    const password = useRef('')

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.pinCodeSignInReducer.isLoading)
    const response = useSelector(state => state.pinCodeSignInReducer.response)
    const isError = useSelector(state => state.pinCodeSignInReducer.isError)

    const [errorMessage, setErrorMessage] = useState('')

    const isPinCodeLoginRegistered = useRef(undefined)


    const fetchPinCode = async () => {

        const response = await Keychain.getInternetCredentials(KEYCHAIN_PIN_KEY);

        const emailPassword = await Keychain.getInternetCredentials(KEYCHAIN_EMAIL_KEY);

        email.current = emailPassword.username
        password.current = emailPassword.password

        pin.current = response.password

        isPinCodeLoginRegistered.current = await getDataFromUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED)


    };

    useEffect(() => {
        fetchPinCode()

    }, [])

    const onPinCodeSuccess = () => {

        let obj = { email: email.current, password: password.current, fcm_device_id: getFCMDeviceID() }

        setEmail(email.current)
        setPassword(password.current)

        dispatch(performEmailPasswordSignIn(obj, PIN_CODE_SIGN_IN_SCREEN))

    }

    const handleResponse = () => {
        if (response) {

            if (isError) {
                return (
                    <Modal responseMessage={response.message} modalType={isError ? "error" : 'success'} onPress={() => { dispatch(resetEmailPasswordSignIn(PIN_CODE_SIGN_IN_SCREEN)) }} />
                )
            }
            else {
                if(response.is_free === false) {
                    setTimeout(() => {
                        dispatch(signInSuccess('cardHolder'))
                    }, 250);
                } else {
                    setTimeout(() => {
                        dispatch(signInSuccess('freeUser'))
                    }, 250);
                }
                

            }
        }
    }

    const showErrorMessage = () => {

        if (errorMessage) {

            let message = errorMessage

            let shouldGoBack = false

            if(getLoginTries() >= 4){
                setLoginTries(getLoginTries() + 1)
                message = MULTIPLE_INVALID_LOGIN_ERROR
                shouldGoBack = true
                saveDataInUserDefaults(LOGIN_TRIES, getLoginTries().toString())
            } else {
                setLoginTries(getLoginTries() + 1)
                saveDataInUserDefaults(LOGIN_TRIES, getLoginTries().toString())
            }

            return (
                <Modal responseMessage={message} modalType={"error"} onPress={() => { setErrorMessage(''); shouldGoBack ? props.navigation.goBack(): '' }} />
            )
        }
    }


    return (


        <View >
            <StatusBar
                barStyle={myTheme.colors.STATUS_BAR_STYLE}
                backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}
            />

            <View style={{ marginTop: normalizeY(40), width: "100%", alignItems: "center", flex: 0.7 }}>



                <Text style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(40) }}>Enter your 4 digit Code</Text>
                <OTPInputView
                    style={{ width: '90%', height: normalizeY(100) }}
                    pinCount={4}
                    codeInputHighlightStyle={styles.highlightedField}
                    autoFocusOnLoad={false}
                    secureTextEntry={true}
                    codeInputFieldStyle={{ color: ligh_green }}
                    keyboardType='number-pad'
                    onCodeFilled={(enteredCode) => {

                        if (pin.current === enteredCode)
                            onPinCodeSuccess()
                        else {
                            if (isPinCodeLoginRegistered.current === undefined || isPinCodeLoginRegistered.current === '')
                                setErrorMessage('Code Login not Registered')
                            else
                                setErrorMessage('Code does not Match')
                        }

                    }}
                />
            </View>

            {isLoading &&
                <CustomLoader/>
            }
            {handleResponse()}
            {showErrorMessage()}
        </View>


    )


}

const styles = StyleSheet.create({
    blur: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: width,
        height: height
    },
    avoidingView: {
        borderRadius: 10,
        height: 150,
        width: width - 30
    },
    containerCodePin: {
        borderRadius: 10
    },
    pinStyle: {
        backgroundColor: theme.BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor: theme.PIN_CODE_BORDER_COLOR,
        width: "50%", height: 50, color: "#A1C452",
        marginLeft: normalizeX(3),
        marginRight: normalizeX(3),
        fontFamily: mulish_regular,
    },
    success: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center'
    },
    pin_text: {
        fontFamily: mulish_regular,
        fontSize: 17,
        color: theme.LABEL_COLOR,
        paddingRight: normalizeX(50),

    },
    button: {
        alignItems: 'center',
        marginTop: normalizeY(50)
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#a1c452",
        elevation: 2
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
    bottomButtonsView: {

        marginTop: normalizeY(15),
        // backgroundColor: 'red',
    },
    highlightedField: {
        borderColor: 'black',
    },

})