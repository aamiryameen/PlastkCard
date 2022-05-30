import React, { useEffect, useState, useRef } from 'react'

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'



import FingerprintScanner from 'react-native-fingerprint-scanner';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native'
import { getEmail, getIsFreeUser, getPassword, IS_FINGER_PRINT_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, mulish_bold, mulish_regular, setIsFingerPrintRegistered } from '../../utils/Constants';
import { normalizeY, saveDataInUserDefaults, getDataFromUserDefaults } from '../../utils/Utils';
import * as Keychain from 'react-native-keychain';
import Modal from '../../component/common/Modal'




export default FingerPrintSignUpScreen = (props) => {

    const [message, setMessage] = useState('')

    const [isError, setIsError] = useState(false)
    const isFingerPrintLoginRegistered = useRef(undefined)


    const myTheme = useTheme();

    useEffect(() => {

        (async () => {

            isFingerPrintLoginRegistered.current = await getDataFromUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED)

            if (isFingerPrintLoginRegistered.current !== undefined && isFingerPrintLoginRegistered.current !== '') {
                enableFingerPrintDetection()
            }

        })()

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

                setIsError(false);
                saveCredentials();

                setMessage("Fingerprint Set Successfully")
                setIsFingerPrintRegistered(true)


            }).catch((error) => {

                setIsError(true)
                setMessage(error.message)
            });


    }

    const showMessage = () => {

        if (message) {

            if (isError) {
                return (
                    <Modal responseMessage={message} modalType={'error'} onPress={() => resetState()} />
                )
            }
            else  {

                return (
                    <Modal responseMessage={message} modalType={'success'} onPress={() => resetState()} />
                )

            }

        }

    }

    const resetState = () => {

        setIsError(false);
        setMessage('');
        FingerprintScanner.release();
        
        if(getIsFreeUser())
            props.navigation.navigate("FCSDashboard")
        else
            props.navigation.navigate("DashBoard")

    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }} >

            <View style={{ marginTop: normalizeY(40), alignItems: "center" }}>
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
                <View style={{ marginTop: normalizeY(20), paddingTop: normalizeY(20) }}>
                    <Text style={{ fontFamily: mulish_bold, fontSize: 20, color: myTheme.colors.LABEL_COLOR }}> FingerPrint </Text>
                </View>
                <View style={{ marginTop: normalizeY(20) }}>
                    <Text style={{ fontFamily: mulish_regular, fontSize: 15, color: myTheme.colors.SEGMENTED_TEXT_COLOR }}>Tap the icon above for FingerPrint verification</Text>
                </View>
            </View>
            {showMessage()}

        </LinearGradient>
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