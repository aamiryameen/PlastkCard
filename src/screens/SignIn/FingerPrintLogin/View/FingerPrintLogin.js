import React, { useEffect, useState, useRef } from 'react'

import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import FingerprintScanner from 'react-native-fingerprint-scanner';

import { FINGER_PRINT_SIGN_IN_SCREEN, getFCMDeviceID, getLoginTries, IS_FINGER_PRINT_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, LOGIN_TRIES, mulish_bold, mulish_regular, setEmail, setLoginTries, setPassword } from '../../../../utils/Constants';
import { getDataFromUserDefaults, normalizeY, saveDataInUserDefaults } from '../../../../utils/Utils';
import Modal from '../../../../component/common/Modal'
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from '../../EmailPasswordSignIn/action/EmailPasswordSignInAction';
import * as Keychain from 'react-native-keychain';
import { signInSuccess } from '../../../Splash/Action/SplashAction';
import CustomLoader from '../../../../component/common/CustomLoader';



export default FingerPrintLogin = (props) => {

    const myTheme = useTheme();
    const [errorMessage, setErrorMessage] = useState('')

    const isLoading = useSelector(state => state.fingerPrintSignInReducer.isLoading)
    const isError = useSelector(state => state.fingerPrintSignInReducer.isError)
    const response = useSelector(state => state.fingerPrintSignInReducer.response)

    const dispatch = useDispatch()

    const email = useRef('')
    const password = useRef('')

    const isFingerPrintLoginRegistered = useRef(undefined)

    const shouldGoBackRef = useRef(false)


    useEffect(() => {

        (async () => {
            
            const emailPassword = await Keychain.getInternetCredentials(KEYCHAIN_EMAIL_KEY);
            email.current = emailPassword.username
            password.current = emailPassword.password

            isFingerPrintLoginRegistered.current = await getDataFromUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED)


            if(isFingerPrintLoginRegistered.current !== undefined && isFingerPrintLoginRegistered.current !== '')
                enableFingerPrintDetection()

        })()

        return function cleanUp() {
            FingerprintScanner.release()
        }

    }, [])

    const enableFingerPrintDetection = () => {

        if (isFingerPrintLoginRegistered.current === undefined || isFingerPrintLoginRegistered.current === '')
            setErrorMessage('FingerPrint Login not registered')
        else {
            FingerprintScanner
                .authenticate({ title: 'Use FingerPrint for Secure Login' })
                .then(() => {

                    let obj = { email: email.current, password: password.current, fcm_device_id: getFCMDeviceID() }

                    setEmail(email.current)
                    setPassword(password.current)

                    dispatch(performEmailPasswordSignIn(obj, FINGER_PRINT_SIGN_IN_SCREEN))


                }).catch((error) => {

                    if(error.name === 'DeviceLocked') {
                        setLoginTries(5)
                        saveDataInUserDefaults(LOGIN_TRIES, getLoginTries().toString())
                        shouldGoBackRef.current = true
                    }
                    setErrorMessage(error.message)

                });
        }

    }


    const showMessage = () => {

        if (errorMessage) {

            return (
                <Modal responseMessage={errorMessage} modalType="error" onPress={() => { setErrorMessage(''); FingerprintScanner.release(); shouldGoBackRef.current ? props.navigation.goBack() : '' }} />
            )
        }
    }

    const handleResponse = () => {
        if (response) {
            FingerprintScanner.release()

            if (isError) {
                return (
                    <Modal responseMessage={response.message} modalType={isError ? "error" : 'success'} onPress={() => { dispatch(resetEmailPasswordSignIn(FINGER_PRINT_SIGN_IN_SCREEN)) }} />
                )
            }
            else {
                if(response.is_free === false) {
                    setTimeout(() => {
                        dispatch(signInSuccess('cardHolder'))
    
                    }, 500);
                } else {
                    setTimeout(() => {
                        dispatch(signInSuccess('freeUser'))
    
                    }, 500);
                }
                
            }

        }

    }

    return (

        <View>
            <StatusBar
                barStyle={myTheme.colors.STATUS_BAR_STYLE}
                backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}
            />
            <View style={{ marginTop: normalizeY(40), alignItems: "center" }}>
                <TouchableOpacity onPress={() => enableFingerPrintDetection()}>
                    <Image
                        source={require("../../../../assets/images/fingerprint.png")}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 15
                        }}
                    />
                </TouchableOpacity>
                <View style={{ marginTop: normalizeY(20), paddingTop: normalizeY(20) }}>
                    <Text style={{ fontFamily: mulish_bold, fontSize: 20, color: myTheme.colors.LABEL_COLOR }}> Fingerprint</Text>
                </View>
                <View style={{ marginTop: normalizeY(20) }}>
                    <Text style={{ fontFamily: mulish_regular, fontSize: 15, color: myTheme.colors.LABEL_COLOR }}>{`Touch the finger sensor and lift after
you feel a vibration`}</Text>
                </View>
            </View>

            {showMessage()}
            {handleResponse()}
            {isLoading &&
               <CustomLoader/>
            }


        </View>
    )
}


const styles = StyleSheet.create({

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

        marginTop: normalizeY(35),
        // backgroundColor: 'red',
    }
})