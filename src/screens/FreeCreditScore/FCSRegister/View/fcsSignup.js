import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeY, normalizeX, ValidateEmail, logFireBaseEvent } from '../../../../utils/Utils';
import TextInput from '../../../../component/common/TextInput';
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import { colorRedDC143C, FCS_REGISTER_SCREEN, getFCMDeviceID, getIsDarkModeEnabled, setEmail, setPassword, } from '../../../../utils/Constants';
import { logoDark, logoLight } from '@assets';
import { useSelector, useDispatch } from 'react-redux'
import { fcsRegisterPressedAction, resetFCSScreenAction } from '../Actions/FCSRegisterActions';
import CustomLoader from '../../../../component/common/CustomLoader';
import Modal from '../../../../component/common/Modal'
import { signInSuccess } from '../../../Splash/Action/SplashAction';
import Toast from 'react-native-simple-toast';
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from '../../../SignIn/EmailPasswordSignIn/action/EmailPasswordSignInAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default FcsSignUpScreen = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.fcsRegisterReducer.isLoading)
    const response = useSelector(state => state.fcsRegisterReducer.response)

    const isLoadingLogIn = useSelector(state => state.fcsRegisterScreenLoginReducer.isLoading)
    const loginResponse = useSelector(state => state.fcsRegisterScreenLoginReducer.response)

    const [errors, setErrors] = useState({})
    const [secureTextEntry, setSecureTextEntry] = React.useState(true)
    const [secureConfrimTextEntry, setSecureConfirmTextEntry] = React.useState(true)
    const email = useRef('')
    const password = useRef('')
    const confirmPassword = useRef('')

    useEffect(() => {
        logFireBaseEvent('fcs_register_screen')
    }, [])


    const nextButtonPressed = () => {
        if (isFormValid()) {

            let obj = {}
            obj.email = email.current
            obj.password = password.current

            dispatch(fcsRegisterPressedAction(obj))
        }

    }

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


    const handleResponse = () => {

        if (loginResponse) {

            if (loginResponse.success === false) {
                return (<Modal responseMessage={loginResponse.message} modalType="error" onPress={() => dispatch(resetEmailPasswordSignIn(FCS_REGISTER_SCREEN))} />)
            } else {

                dispatch(resetEmailPasswordSignIn(FCS_REGISTER_SCREEN))
                setEmail(email.current)
                setPassword(password.current)

                if (loginResponse.is_free) {
                    setTimeout(() => {

                        dispatch(signInSuccess('freeUser'))

                    }, 250);
                }
            }

        }

        else if (response) {

            if (response.success === false) {

                return (<Modal responseMessage={response.message} modalType="error" onPress={() => dispatch(resetFCSScreenAction())} />)
            }
            else {

                logFireBaseEvent('fcs_register_success')

                Toast.showWithGravity(response.message, Toast.LONG, Toast.TOP);
                dispatch(resetFCSScreenAction())

                setTimeout(() => {

                    let obj = {}
                    obj.email = email.current
                    obj.password = password.current
                    obj.fcm_device_id = getFCMDeviceID()

                    dispatch(performEmailPasswordSignIn(obj, FCS_REGISTER_SCREEN))

                }, 250);

            }
        }
    }


    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body} keyboardShouldPersistTaps={'handled'}>

                <View style={styles.logoContainer}>
                    <Image source={getIsDarkModeEnabled() ? logoDark : logoLight} style={{ width: '40%', height: '100%', resizeMode: 'contain' }} />
                    <Text style={{color: myTheme.colors.LABEL_COLOR}}>Please register to check your free credit score</Text>
                </View>

                <View style={styles.formContainer}>

                    <TextInput icon='email' theme={myTheme} keyboardType='email-address' maxLength={40}
                        placeholder='Email' autoCorrect={false} onChangeText={text => email.current = text} />
                    {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}
                    <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureTextEntry ? true : false} onPress={updateSecureTextEntry}
                        placeholder='Password' onChangeText={text => password.current = text} maxLength={25} />
                    {errors.password ? <Text style={styles.errorStyle}>{errors.password} </Text> : null}
                    <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureConfrimTextEntry ? true : false} onPress={updateSecureConfirmTextEntry}
                        placeholder=' Confirm Password' onChangeText={text => confirmPassword.current = text} maxLength={25} />
                    {errors.confirmPassword ? <Text style={styles.errorStyle}>{errors.confirmPassword} </Text> : null}

                </View>

                <View style={styles.buttonsContainer}>
                    <Button onPress={() => nextButtonPressed()} title="Register" />
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: normalizeY(20) }}>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR }}>Already have an Account?</Text>
                        <TouchableOpacity onPress={() => props.navigation.goBack("SignIn")} style={{ marginLeft: normalizeX(5), }}>
                            <Text style={{ color: "#a1c452", marginTop: normalizeY(-2) }}>Log in</Text>
                            <View style={{ borderBottomColor: "#a1c452", borderBottomWidth: 1, width: "100%" }} />
                        </TouchableOpacity>
                    </View>

                    {handleResponse()}

                </View>

                {(isLoading || isLoadingLogIn) && <CustomLoader />}
            </KeyboardAwareScrollView>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: normalizeX(15),
    },
    logoContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 0.45,
        justifyContent: 'space-evenly'
    },
    buttonsContainer: {
        flex: 0.3,
        justifyContent: 'center'
    },
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
        // marginTop: normalizeY(15),
    }
})