import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { normalizeY, normalizeX, saveDataInUserDefaults } from '../../utils/Utils'
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTheme } from '@react-navigation/native'
import * as Keychain from 'react-native-keychain';
import { getEmail, ligh_green, getPassword, IS_PIN_CODE_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, KEYCHAIN_PIN_KEY, mulish_regular, REGISTER_VIA_PIN_CODE_SCREEN, setIsPinCodeRegistered, getIsFreeUser } from '../../utils/Constants';
import Modal from '../../component/common/Modal'
import PINS from '../../utils/Helpers/pins_not_allowed';

export default SetPinCode = (props) => {

    const setPin = useRef('')
    const confirmPin = useRef('')
    const [message, setMessage] = useState('')

    const [error, setError] = useState(false);

    const myTheme = useTheme();

    const storePinCode = async () => {

        await Keychain.setInternetCredentials(KEYCHAIN_PIN_KEY, setPin.current, confirmPin.current);
        await Keychain.setInternetCredentials(KEYCHAIN_EMAIL_KEY, getEmail(), getPassword())

    };

    const setPinCodeButtonPressed = () => {

        if (setPin.current !== '' && setPin.current.length === 4 && setPin.current === confirmPin.current) {
            storePinCode();
            saveDataInUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED, 'true')
            setError(false)
            setMessage("Code set Successfully")
            setIsPinCodeRegistered(true)
        }
    }

    const showMessage = () => {

        if (message) {

            if (error) {

                return (
                    <Modal responseMessage={message} modalType='error' onPress={() => setMessage('')} />
                )
            }
            else {
                return (
                    <Modal responseMessage={message} modalType='success' onPress={() => resetState()} />
                )
            }

        }
    }

    const resetState = () => {

        setMessage('')
        if(getIsFreeUser())
            props.navigation.navigate("FCSDashboard")
        else
            props.navigation.navigate("DashBoard")
    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>

            <View style={{ marginTop: normalizeY(20), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular }}>Enter your 4 digit Code</Text>

                <OTPInputView
                    style={{ width: '90%', height: normalizeY(100) }}
                    pinCount={4}
                    codeInputHighlightStyle={styles.highlightedField}
                    autoFocusOnLoad={false}
                    secureTextEntry={true}
                    codeInputFieldStyle={{ color: ligh_green }}
                    keyboardType='number-pad'
                    onCodeFilled={(code) => {
                        setPin.current = code
                    }}
                />

            </View>

            <View style={{ marginTop: normalizeY(20), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: myTheme.colors.LABEL_COLOR }}>Re-enter your 4 digit Code</Text>

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

                        if (setPin.current === confirmPin.current) {

                            if (PINS.includes(setPin.current)) {
                                setError(true)
                                setMessage('This Code is Not Allowed')
                            } else {
                                setPinCodeButtonPressed()
                            }

                        }

                        else {
                            setError(true)
                            setMessage('Code does not match')
                        }

                    }}
                />
            </View>
            <Text style={{ color: myTheme.colors.PIN_SHARE, fontFamily: mulish_regular, paddingLeft: normalizeX(15) }}>Don't share your Code with any one</Text>

            {showMessage()}

        </LinearGradient>
    )

}

const styles = StyleSheet.create({

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
    highlightedField: {
        borderColor: 'black',
    },
})