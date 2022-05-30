import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getDataFromUserDefaults, logFireBaseEvent, normalizeFont, normalizeX, normalizeY, saveDataInUserDefaults, ValidateEmail } from "../../../../utils/Utils";
import TextInput from '../../../../component/common/TextInput';
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { performSetPasswordAction, resetSetPasswordScreenAction } from '../../setPassword/action/setPasswordActions'
import { colorRedDC143C, getEmail, getPassword, IS_FIRST_TIME_LOGIN, setEmail, setPassword, SET_PASSWORD_SCREEN, getIsDarkModeEnabled, ligh_green, getFCMDeviceID } from '../../../../utils/Constants';
import Modal from '../../../../component/common/Modal'
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from '../../../SignIn/EmailPasswordSignIn/action/EmailPasswordSignInAction';
import { signInSuccess } from '../../../Splash/Action/SplashAction';
import { logoDark, logoLight } from '../../../../assets';
import CustomLoader from '../../../../component/common/CustomLoader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default SignInScreen = (props) => {

    const myTheme = useTheme();

    const [isUserAvailable, setIsUserAvailable] = useState(true)

    const [errors, setErrors] = useState({})
    const [secureTextEntry, setSecureTextEntry] = React.useState(true)
    const [secureConfrimTextEntry, setSecureConfirmTextEntry] = React.useState(true)
    const email = useRef('')
    const password = useRef('')
    const confirmPassword = useRef('')
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.setPasswordReducer.isLoading)
    const responseMessage = useSelector(state => state.setPasswordReducer.message)
    const isError = useSelector(state => state.setPasswordReducer.isError)

    const isLoadingSignIn = useSelector(state => state.setPasswordLoginReducer.isLoading)
    const responseSignIn = useSelector(state => state.setPasswordLoginReducer.response)
    const isErrorSignIn = useSelector(state => state.setPasswordLoginReducer.isError)

    const [isResetPassword, setIsResetPassword] = useState(true)

    const isFirstLogin = useRef(undefined)

    const isBackOverRiddenRef = useRef(false)

    const nextButtonPressed = () => {

        if (props.route.params && props.route.params.user) {
            email.current = props.route.params.user.email
        }

        if (isFormValid()) {

            let createProfileDataObject = {}

            createProfileDataObject.email = email.current.trim()
            createProfileDataObject.password = password.current.trim()
            createProfileDataObject.token = props.route.params.token.trim()

            dispatch(performSetPasswordAction(createProfileDataObject))
        }
    }

    useEffect(() => {

        if (props.route.params && props.route.params.hasOwnProperty('user')) {
            setIsUserAvailable(true)
        } else {
            setIsUserAvailable(false)
        }

        if (props.route.params && props.route.params.hasOwnProperty('isForgotPassword')) {
            props.navigation.setOptions({ headerTitle: 'Set Your Password' });
            setIsResetPassword(true)
        } else {
            setIsResetPassword(false)
        }


        (async () => {
            isFirstLogin.current = await getDataFromUserDefaults(IS_FIRST_TIME_LOGIN)
        })()



        props.navigation.addListener('beforeRemove', (e) => {

            if(isBackOverRiddenRef.current === false) {

                isBackOverRiddenRef.current = true
                e.preventDefault();

                props.navigation.navigate('SignIn')
            }

        })

    }, [])

    const updateSecureTextEntry = () => {
        setSecureTextEntry(
            !secureTextEntry
        )
    }

    const updateSecureConfirmTextEntry = () => {
        setSecureConfirmTextEntry(
            !secureConfrimTextEntry
        )
    }

    const isFormValid = () => {

        let validationErrors = {}

        if (password.current === undefined || password.current === '' || password.current.trim() === '')
            validationErrors.password = "Please Enter Your Password"
        else if (password.current.trim().length < 8 || !password.current.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
            validationErrors.password = "Password should include both letters and numbers, Password should be eight characters long!"
        if (confirmPassword.current === undefined || confirmPassword.current === '' || confirmPassword.current.trim() === '')
            validationErrors.confirmPassword = "Please Enter Your Password"
        else if (password.current.trim() !== confirmPassword.current.trim())
            validationErrors.confirmPassword = "Password do not Match"
        else if (!confirmPassword.current.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
            validationErrors.confirmPassword = "Password should include both letters and numbers, Password should be eight characters long!"
        if (email.current === undefined || email.current === '' || email.current.trim() === '')
            validationErrors.email = "Please Enter Email"
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


    const showMessage = () => {
        if (responseMessage) {

            if (isError) {
                return (
                    <Modal responseMessage={responseMessage} modalType="error" onPress={() => dispatch(resetSetPasswordScreenAction())} />
                )
            }
            else {

                logFireBaseEvent('signup_completed')
                setEmail(email.current)
                setPassword(password.current)

                dispatch(resetSetPasswordScreenAction())


                if (isFirstLogin.current === undefined) {
                    (async () => {

                        if (isFirstLogin.current === undefined)
                            await saveDataInUserDefaults(IS_FIRST_TIME_LOGIN, 'false')
                    })()
                    setTimeout(() => {
                        props.navigation.navigate('RegisterSecureLogin', { theme: myTheme })
                    }, 250);

                }
                else {

                    let loginDataObject = {}

                    loginDataObject.email = getEmail()
                    loginDataObject.password = getPassword()
                    loginDataObject.fcm_device_id = getFCMDeviceID()
                    dispatch(performEmailPasswordSignIn(loginDataObject, SET_PASSWORD_SCREEN))
                }

            }
        }
        else if (responseSignIn) {

            if (isErrorSignIn) {
                return (
                    <Modal responseMessage={responseSignIn.message} modalType="error" onPress={() => dispatch(resetEmailPasswordSignIn(SET_PASSWORD_SCREEN))} />
                )
            }
            else {

                setTimeout(() => {

                    dispatch(signInSuccess('cardHolder'))

                }, 250);
            }
        }
    }
    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>
            <StatusBar
                barStyle={myTheme.colors.STATUS_BAR_STYLE}
                backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}
            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ margin: 5 }} keyboardShouldPersistTaps={'handled'}>
                <View style={{ flex: 1, alignItems: "center", marginTop: normalizeY(15) }}>
                    <Image source={getIsDarkModeEnabled() ? logoDark : logoLight} style={{ height: 30, width: 160, margin: 20, padding: 30, }} />
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 5 }}>

                    {isUserAvailable ?

                        <>
                            <TextInput icon='person' theme={myTheme} containerStyle={styles.textinput_style} placeholder='First Name' defaultValue={(props.route.params && props.route.params.user) ? props.route.params.user.first_name : ''} isEditable={false} />

                            <TextInput icon='person' theme={myTheme} containerStyle={styles.textinput_style} placeholder='Last Name' defaultValue={(props.route.params && props.route.params.user) ? props.route.params.user.last_name : ''} isEditable={false} />

                        </>
                        :

                        null
                    }


                    <TextInput icon='email' theme={myTheme} keyboardType='email-address' containerStyle={styles.textinput_style} maxLength={40}
                        placeholder='Email' onChangeText={text => email.current = text} defaultValue={(props.route.params && props.route.params.user) ? props.route.params.user.email : ''} isEditable={!isUserAvailable} />
                    {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}
                    <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureTextEntry ? true : false} onPress={updateSecureTextEntry} containerStyle={styles.textinput_style}
                        placeholder='Password' onChangeText={text => password.current = text} maxLength={25} />
                    {errors.password ? <Text style={styles.errorStyle}>{errors.password} </Text> : null}
                    <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureConfrimTextEntry ? true : false} onPress={updateSecureConfirmTextEntry} containerStyle={styles.textinput_style}
                        placeholder=' Confirm Password' onChangeText={text => confirmPassword.current = text} maxLength={25} />
                    {errors.confirmPassword ? <Text style={styles.errorStyle}>{errors.confirmPassword} </Text> : null}

                    <View style={styles.button}>
                        <Button style={{ marginTop: normalizeY(30) }} onPress={() => nextButtonPressed()} title="Set Password" />
                    </View>


                    {(isLoading || isLoadingSignIn) &&
                        <CustomLoader />
                    }
                    {showMessage()}
                </View>
            </KeyboardAwareScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    errorStyle: {
        color: colorRedDC143C,
        fontSize: 11,
        marginTop: 2
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
    textinput_style: {
        marginTop: normalizeY(15),
    },
    button: {
        alignItems: "center",
        marginTop: normalizeY(30)
    },
})