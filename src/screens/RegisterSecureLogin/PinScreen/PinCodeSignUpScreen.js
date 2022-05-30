import React, { useRef, useState } from 'react'

import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { normalizeY, normalizeX, saveDataInUserDefaults } from '../../../utils/Utils'

const { width } = Dimensions.get("window");
const { height } = Dimensions.get('window');
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native';


import * as Keychain from 'react-native-keychain';

import { ligh_green,getEmail, getPassword, IS_PIN_CODE_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, KEYCHAIN_PIN_KEY, mulish_regular, REGISTER_VIA_PIN_CODE_SCREEN, setIsPinCodeRegistered, getFCMDeviceID } from '../../../utils/Constants';

import Modal from '../../../component/common/Modal'
import { signInSuccess } from '../../Splash/Action/SplashAction';
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from '../../SignIn/EmailPasswordSignIn/action/EmailPasswordSignInAction';
import PINS from '../../../utils/Helpers/pins_not_allowed';
import CustomLoader from '../../../component/common/CustomLoader'


export default PinCodeSignUpScreen = (props) => {

    const myTheme = useTheme();
    const pin = useRef('')
    const confirmPin = useRef('')

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.pinCodeRegisterReducer.isLoading)
    const response = useSelector(state => state.pinCodeRegisterReducer.response)
    const isError = useSelector(state => state.pinCodeRegisterReducer.isError)

    const storePinCode = async () => {
        await Keychain.setInternetCredentials(KEYCHAIN_PIN_KEY, pin.current, confirmPin.current);
        await Keychain.setInternetCredentials(KEYCHAIN_EMAIL_KEY, getEmail(), getPassword())
    };


    const setPinCodeButtonPressed = () => {
        if (pin.current !== '' && pin.current.length === 4 && pin.current === confirmPin.current) {
            storePinCode();
            saveDataInUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED, 'true')

            let loginDataObject = {}

            setIsPinCodeRegistered(true)

            loginDataObject.email = getEmail()
            loginDataObject.password = getPassword()
            loginDataObject.fcm_device_id = getFCMDeviceID()
            dispatch(performEmailPasswordSignIn(loginDataObject, REGISTER_VIA_PIN_CODE_SCREEN))

        }
    }

    const showMessage = () => {
        if (message) {
            return (
                <Modal responseMessage={message} modalType='error' onPress={() => { setMessage('') }} />
            )
        }
    }

    const handleResponse = () => {

        if (response) {
            if (isError) {
                return (
                    <Modal responseMessage={response.message} modalType='error' onPress={() => dispatch(resetEmailPasswordSignIn(REGISTER_VIA_PIN_CODE_SCREEN))} />
                )
            }
            else {
                dispatch(resetEmailPasswordSignIn(REGISTER_VIA_PIN_CODE_SCREEN))
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

    return (
        <View >

            <View style={{ marginTop: normalizeY(20), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{color: myTheme.colors.LABEL_COLOR}}>Enter your 4 digit Code</Text>
                <OTPInputView
                    style={{ width: '90%', height: normalizeY(100) }}
                    pinCount={4}
                    codeInputHighlightStyle={styles.highlightedField}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{ color: ligh_green }}
                    secureTextEntry={true}
                    keyboardType='number-pad'
                    onCodeFilled={(code) => {
                        pin.current = code
                    }}
                />
            </View>

            <View style={{ marginTop: normalizeY(20), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{color: myTheme.colors.LABEL_COLOR}}>Re-enter your 4 digit Code</Text>

                <OTPInputView
                    style={{ width: '90%', height: normalizeY(100) }}
                    pinCount={4}
                    codeInputHighlightStyle={styles.highlightedField}
                    autoFocusOnLoad={false}
                    secureTextEntry={true}
                    codeInputFieldStyle={{ color: ligh_green }}
                    keyboardType='number-pad'
                    onCodeFilled={(code) => {
                        confirmPin.current = code

                        if (pin.current === confirmPin.current) {
                            if (PINS.includes(pin.current)) {
                                setMessage('This Code is Not Allowed')
                            } else {
                                setPinCodeButtonPressed()
                            }
                        }

                        else
                            setMessage('Code does not match')

                    }}
                />

            </View>

            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, paddingLeft: normalizeX(10) }}>Don't share your Code with any one</Text>
            {showMessage()}
            {handleResponse()}

            {isLoading &&
                <CustomLoader/>
            }
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
    highlightedField: {
        borderColor: 'black',
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
})