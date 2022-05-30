import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'

import Text from '../../component/common/Text'
import TextInput from '../../component/common/TextInput'
import Button from '../../component/common/Button'
import Modal from '../../component/common/Modal'
import { useTheme } from '@react-navigation/native';
import { colorRedDC143C, getEmail, getIsFingerPrintRegistered, getIsPinCodeRegistered, getPassword, KEYCHAIN_PIN_KEY, ligh_green, mulish_bold, mulish_regular, setMyCreditAuthDone } from '../../utils/Constants'

import { normalizeFont, normalizeX, normalizeY, ValidateEmail } from '../../utils/Utils'
import FingerprintScanner from 'react-native-fingerprint-scanner';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import * as Keychain from 'react-native-keychain';






export const MyCreditAuthScreen = (props) => {

    const myTheme = useTheme();
    const [emailPasswordLogin, showEmailPasswordLogin] = useState(!(getIsFingerPrintRegistered() || getIsPinCodeRegistered()))


    const [errors, setErrors] = useState({})
    const [secureTextEntry, setSecureTextEntry] = React.useState(true)

    const [errorMessage, setErrorMessage] = useState('')

    const email = useRef('')
    const password = useRef('')

    const pin = useRef('')


    useEffect(() => {

        if (getIsFingerPrintRegistered() && !emailPasswordLogin) {
            enableFingerPrintDetection()
        } else if (getIsPinCodeRegistered())
            fetchPinCode()

        return function cleanUp() {
            try {
                FingerprintScanner.release()
            }
            catch (error) {

            }

        }
    }, [])

    const fetchPinCode = async () => {

        const response = await Keychain.getInternetCredentials(KEYCHAIN_PIN_KEY);

        pin.current = response.password

    };

    const updateSecureTextEntry = () => {
        setSecureTextEntry(
            !secureTextEntry
        )
    }

    const signInButtonPressed = () => {

        if (isFormValid()) {

            if (getEmail() === email.current.toLocaleLowerCase() && getPassword() === password.current) {

                setMyCreditAuthDone(true)
                props.callback()

            }
            else {
                setErrorMessage('Invalid credentials entered')
            }
        }
    }

    const onPinCodeSuccess = () => {

        setMyCreditAuthDone(true)
        props.callback()
    }

    const isFormValid = () => {

        let validationErrors = {}

        if (password.current === undefined || password.current === '' || password.current.trim() === '')
            validationErrors.password = "Please Enter Your Password"
        else if (password.current.trim().length < 8 || !password.current.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
            validationErrors.password = "Password should include both letters and numbers, Password should be eight characters long!"
        if (email.current === undefined || email.current === '' || email.current.trim() === '')
            validationErrors.email = "Please Enter Your Email"
        else if (!ValidateEmail(email.current.trim()))
            validationErrors.email = "Please Enter Valid Email"
        if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
            setErrors(validationErrors)
            return true
        }
        else {
            setErrors(validationErrors)
            return false
        }
    }


    const enableFingerPrintDetection = () => {

        FingerprintScanner
            .authenticate({ title: 'Use FingerPrint for Secure Login' })
            .then(() => {
                onPinCodeSuccess()
            }).catch((error) => {
                setErrorMessage(error.message)
                FingerprintScanner.release()
            });
    }


    const showErrorModal = () => {

        if (errorMessage) {
            return (<Modal responseMessage={errorMessage} modalType="error" onPress={() => setErrorMessage('')} />)
        }
    }

    return (

        <View style={styles.container}>

            <View style={{ height: 260, width: "90%", margin: 20, marginTop: normalizeY(10), borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: myTheme.colors.BACKGROUND_COLOR, elevation: 6 }}>
                <Image source={require('../../assets/images/MyCreditAuthImage.png')} style={styles.image} />

            </View>

            <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(10), fontSize: normalizeFont(14), textAlign: 'center' }}>Authenticate to access My Credit</Text>

            {emailPasswordLogin ?

                <View style={{ marginTop: normalizeY(10) }}>

                    <TextInput theme={myTheme} icon='email' containerStyle={styles.inputContainer} keyboardType='email-address' placeholder='Email' onChangeText={text => email.current = text} maxLength={40} />
                    {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}

                    <TextInput theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureTextEntry ? true : false} onPress={updateSecureTextEntry} containerStyle={styles.inputContainer} placeholder='Password' onChangeText={text => password.current = text} maxLength={25} />
                    {errors.password ? <Text style={styles.errorStyle}>{errors.password} </Text> : null}

                    <View style={styles.bottomButtonsView}>
                        <Button onPress={() => signInButtonPressed()} title="Continue" />


                    </View>

                </View>


                : getIsFingerPrintRegistered() ?

                    <>
                        <View style={{ marginTop: normalizeY(20), alignItems: "center", justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableOpacity onPress={() => enableFingerPrintDetection()}>
                                <Image
                                    source={require("../../assets/images/fingerprint.png")}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 15
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={{ marginTop: normalizeY(20), paddingTop: normalizeY(15) }}>
                                <Text style={{ fontFamily: mulish_bold, fontSize: 20, color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }}> Fingerprint</Text>
                            </View>
                            <View style={{ marginTop: normalizeY(15) }}>
                                <Text style={{ fontFamily: mulish_regular, fontSize: 15, color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }}>{`Touch the finger sensor and lift after you feel a vibration`}</Text>
                            </View>
                        </View>

                        <View style={styles.bottomButtonsView}>
                            <Button onPress={() => showEmailPasswordLogin(true)} title="Authenticate via Email/Password" />
                        </View>
                    </>

                    :
                    <>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(30), textAlign: 'center' }}>Enter your 4 digit Code</Text>
                            <OTPInputView
                                style={{ width: '90%', height: normalizeY(100), justifyContent: 'center', alignContent: 'center' }}
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
                                        setErrorMessage('Code does not Match')
                                    }

                                }}
                            />

                        </View>

                        <View style={styles.bottomButtonsView}>
                            <Button onPress={() => showEmailPasswordLogin(true)} title="Authenticate via Email/Password" />
                        </View>

                    </>

            }

            { showErrorModal()}


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: normalizeX(15)
    },
    inputContainer: {
        marginTop: normalizeY(20)
    },
    errorStyle: {
        color: colorRedDC143C,
        fontSize: 11,
        marginTop: 2
    },
    bottomButtonsView: {
        flex: 1,
        marginTop: normalizeY(20),
        justifyContent: 'space-evenly',
    },
    image: {
        height: normalizeY(350),
        width: normalizeX(300),
        marginLeft: normalizeX(8),
        resizeMode: 'contain'
    },
    highlightedField: {
        borderColor: 'black',
    },

})