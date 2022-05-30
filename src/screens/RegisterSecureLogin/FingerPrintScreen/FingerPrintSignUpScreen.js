import React, { useEffect, useState } from 'react'

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'



import FingerprintScanner from 'react-native-fingerprint-scanner';

import { useDispatch, useSelector } from 'react-redux'

import { getEmail, getFCMDeviceID, getPassword, IS_FINGER_PRINT_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, mulish_bold, mulish_regular, REGISTER_VIA_FINGER_PRINT_SCREEN, setIsFingerPrintRegistered } from '../../../utils/Constants';
import { normalizeY, saveDataInUserDefaults } from '../../../utils/Utils';
import * as Keychain from 'react-native-keychain';
import Modal from '../../../component/common/Modal'
import { signInSuccess } from '../../Splash/Action/SplashAction';
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from '../../SignIn/EmailPasswordSignIn/action/EmailPasswordSignInAction';
import { useTheme } from '@react-navigation/native';
import CustomLoader from '../../../component/common/CustomLoader';



export default FingerPrintSignUpScreen = (props) => {

    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)

    const dispatch = useDispatch()

    const myTheme = useTheme();

    const isLoading = useSelector(state => state.fingerPrintRegisterReducer.isLoading)
    const response = useSelector(state => state.fingerPrintRegisterReducer.response)
    const isAPIError = useSelector(state => state.fingerPrintRegisterReducer.isError)


    useEffect(() => {

        return function cleanUp() {
            FingerprintScanner.release()
        }

    }, [])

    const saveCredentials = async () => {
        await Keychain.setInternetCredentials(KEYCHAIN_EMAIL_KEY, getEmail(), getPassword())
    }

    const enableFingerPrintDetection = () => {

        FingerprintScanner
            .authenticate({ title: 'Register your FingerPrint Scan for Secure Login' })
            .then(() => {
                saveDataInUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED, 'true')

                setIsError(false)
                saveCredentials()
                setIsFingerPrintRegistered(true)
                setMessage("FingerPrint Login Registered")
            
            }).catch((error) => {

                setIsError(true)
                setMessage(error.message)
                console.log(error)
            });

    }

    const showMessage = () => {
        if (message) {
            if (isError) {
                return (
                    <Modal responseMessage={message} modalType={isError ? 'error' : 'success'} onPress={() => resetState()} />
                )
            }
            else {

                let loginDataObject = {}

                loginDataObject.email = getEmail()
                loginDataObject.password = getPassword()
                loginDataObject.fcm_device_id = getFCMDeviceID()
                resetState()
                dispatch(performEmailPasswordSignIn(loginDataObject, REGISTER_VIA_FINGER_PRINT_SCREEN))
            }

        }

    }

    const handleResponse = () => {

        if (response) {
            if (isAPIError) {
                return (
                    <Modal responseMessage={response.message} modalType='error' onPress={() => dispatch(resetEmailPasswordSignIn(REGISTER_VIA_FINGER_PRINT_SCREEN))} />
                )
            }
            else {
                dispatch(resetEmailPasswordSignIn(REGISTER_VIA_FINGER_PRINT_SCREEN))

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

    const resetState = () => {

        setIsError(false);
        setMessage('');
        FingerprintScanner.release()
    }



    return (


        <View>
            <View style={{ marginTop: normalizeY(40), alignItems: "center"}}>
                <TouchableOpacity onPress={() => enableFingerPrintDetection()}>
                    <Image
                        source={require("../../../assets/images/fingerprint.png")}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 15
                        }}
                    />
                </TouchableOpacity>
                <View style={{  marginTop: normalizeY(20), paddingTop: normalizeY(20) }}>
                    <Text style={{ fontFamily: mulish_bold, fontSize: 20, color: myTheme.colors.LABEL_COLOR }}> FingerPrint</Text>
                </View>
                <View style={{  marginTop: normalizeY(20) }}>
                    <Text style={{ fontFamily: mulish_regular, fontSize: 15, color: myTheme.colors.LABEL_COLOR }}>Tap the icon above for FingerPrint verification</Text>
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
})