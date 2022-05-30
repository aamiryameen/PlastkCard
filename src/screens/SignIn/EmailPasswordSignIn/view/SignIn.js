import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Linking,
  Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import signUpScreenStyles from '../../../SignUp/SignUpStyle';
import { normalizeFont, normalizeX, normalizeY, ValidateEmail } from "../../../../utils/Utils";
import TextInput from '../../../../component/common/TextInput';
import Button from '../../../../component/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserIPAction, performEmailPasswordSignIn, resetEmailPasswordSignIn, validateEmailTokenAction, validateSetPasswordTokenAction } from '../../EmailPasswordSignIn/action/EmailPasswordSignInAction';
import { colorRedDC143C, mulish_bold, mulish_medium, getIsDeepLinkHandledOnSignIn, IS_FIRST_TIME_LOGIN, setEmail, setIsDeepLinkHandledSignIn, setPassword, SIGN_IN_SCREEN, getIsDarkModeEnabled, getIsAutoSecureLoginShown, setIsAutoSecureLoginShown, getIsFirstLogin, setIsFirstLogin, getIsFingerPrintRegistered, getIsPinCodeRegistered, getLoginTries, setLoginTries, LOGIN_TRIES, MULTIPLE_INVALID_LOGIN_ERROR, setIsFreeUser, getFCMDeviceID } from '../../../../utils/Constants';
import Modal from '../../../../component/common/Modal';
import { getDataFromUserDefaults, saveDataInUserDefaults } from '../../../../utils/Utils';
import Text from '../../../../component/common/Text';
import LinearGradient from 'react-native-linear-gradient';
import NotchView from '../../../../component/common/NotchView';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { signInSuccess } from '../../../Splash/Action/SplashAction';
import ToggleSwitch from 'toggle-switch-react-native'
import { logoDark, logoLight } from '@assets';
import CustomLoader from '../../../../component/common/CustomLoader';

export default SignInScreen = (props) => {

  const myTheme = useTheme();

  const [errors, setErrors] = useState({})
  const email = useRef('')
  const password = useRef('')
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [rememberEmail, setRememberEmail] = useState(false)


  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.EmailPasswordLoginInReducer.isLoading)
  const response = useSelector(state => state.EmailPasswordLoginInReducer.response)
  const isError = useSelector(state => state.EmailPasswordLoginInReducer.isError)
  const tokenValidationResponse = useSelector(state => state.EmailPasswordLoginInReducer.tokenValidationResponse)

  const emailValidationResponse = useSelector(state => state.EmailPasswordLoginInReducer.emailValidationResponse)

  const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(true)
  const [isFingerPrintEnrolled, setIsFingerPrintEnrolled] = useState(true)

  const isForgotPasswordRef = useRef(false)


  const token = useRef('')

  useEffect(() => {

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        navigate(url);
      });

      Linking.addEventListener('url', handleOpenURL);
    } else {
      Linking.addEventListener('url', handleOpenURL);
    }

    return function cleanUp() {
      Linking.removeEventListener('url', handleOpenURL);
    }

  }, [])

  const updateSecureTextEntry = () => {
    setSecureTextEntry(
      !secureTextEntry
    )
  }




  useEffect(() => {

    setIsFreeUser(false)

    dispatch(fetchUserIPAction(SIGN_IN_SCREEN))



    FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => {
        setIsFingerPrintSupported(true)
      })
      .catch(error => {
        if (error.name === 'FingerprintScannerNotSupported' || error.name === 'FingerprintScannerNotAvailable') {
          setIsFingerPrintSupported(false)
        }
        else if (error.name === 'FingerprintScannerNotEnrolled') {
          setIsFingerPrintEnrolled(false)
        }
      });


    if (!getIsAutoSecureLoginShown() && getLoginTries() < 5) {
      if (getIsFingerPrintRegistered()) {
        props.navigation.navigate('SecureLogin', { selectedScreen: 'fingerPrint', isFingerPrintSupported: isFingerPrintSupported, myThemeStyle: myTheme })
      } else if (getIsPinCodeRegistered()) {
        props.navigation.navigate('SecureLogin', { selectedScreen: 'pinCode', isFingerPrintSupported: isFingerPrintSupported, myThemeStyle: myTheme })
      }
      setIsAutoSecureLoginShown(true)
    }

    return function cleanUp() {
      FingerprintScanner.release()
    }

  }, [])


  const navigate = (url) => {
    try {
      if (url === null || getIsDeepLinkHandledOnSignIn()) {
        return
      }

      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[1];

      let splitted = routeName.split('?')

      if (splitted[0] === 'set-password') {

        setIsDeepLinkHandledSignIn(true)

        if (splitted[1].split('=')[1].includes('resetPassword')) {
          isForgotPasswordRef.current = true
        }

        if (isForgotPasswordRef.current)
          token.current = splitted[1].split('=')[1].split('&')[0];
        else
          token.current = splitted[1].split('=')[1];

        if (token.current !== undefined && token.current !== '')
          setTimeout(() => {
            dispatch(validateSetPasswordTokenAction(token.current, SIGN_IN_SCREEN))
          }, 250);

      } else if (splitted[0] === 'redirect-page') {

        if (splitted[1].includes('checkToken')) {

          setIsDeepLinkHandledSignIn(true)
          token.current = splitted[1].split('=')[1];

          if (token.current !== undefined && token.current !== '')
            setTimeout(() => {
              dispatch(validateEmailTokenAction(token.current, SIGN_IN_SCREEN))
            }, 250);

        }

      }
    } catch (error) {

    }


  }

  const handleOpenURL = (event) => {
    navigate(event.url);
  }

  const tokenValidation = () => {
    if (tokenValidationResponse !== '') {
      let resp = tokenValidationResponse


      setTimeout(() => {
        if (resp === 'success')
          props.navigation.navigate("SetPassword", { token: token.current, isForgotPassword: isForgotPasswordRef.current })
        else
          props.navigation.navigate("ForgotPassword")
      }, 250);
    }
  }


  const emailValidation = () => {

    if (emailValidationResponse !== '') {


      let resp = emailValidationResponse


      if (resp === 'success') {
        return (
          <Modal responseMessage='Email validated successfully. Please login to continue' modalType="success" onPress={() => dispatch(resetEmailPasswordSignIn(SIGN_IN_SCREEN))} />
        )

      } else {
        setTimeout(() => {

          props.navigation.navigate("ForgotPassword")
        }, 100);

      }

    }
  }


  useEffect(() => {

    (async () => {
      let rememberMeVal = await getDataFromUserDefaults("remember")


      if (rememberMeVal !== null && rememberMeVal !== undefined) {

        let getEmail = await getDataFromUserDefaults("keyEmail")
        let emailIdObject = await JSON.parse(getEmail);
        if (emailIdObject !== null && emailIdObject !== undefined) {

          email.current = emailIdObject
          setRememberEmail(true)

        }
      }

    })()

  }, [])


  const signInButtonPressed = () => {  

    if (isFormValid()) {

      let createProfileDataObject = {}

      createProfileDataObject.email = email.current.trim().toLowerCase()
      createProfileDataObject.password = password.current.trim()
      createProfileDataObject.fcm_device_id = getFCMDeviceID()

      dispatch(performEmailPasswordSignIn(createProfileDataObject, SIGN_IN_SCREEN))
    }
 
  }

  const loginWithFingerPrintButtonPressed = () => {

    if (isFingerPrintEnrolled) {

      if (getIsFingerPrintRegistered() === false) {

        setErrorMessage("Biometric Login is not Registered")
      }
      else if (getLoginTries() < 5) {
        props.navigation.navigate('SecureLogin', { selectedScreen: 'fingerPrint', isFingerPrintSupported: isFingerPrintSupported, myThemeStyle: myTheme })
      } else {
        setErrorMessage(MULTIPLE_INVALID_LOGIN_ERROR)
      }
    }
    else {
      setErrorMessage("Authentication could not start because Fingerprint Scanner has no enrolled fingers")
    }
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

  const showMessage = () => {

    if (response) {

      if (isError) {
        return (
          <Modal responseMessage={response.message} modalType="error" onPress={() => dispatch(resetEmailPasswordSignIn(SIGN_IN_SCREEN))} />
        )
      }
      else {

        (async () => {

          if (rememberEmail === true) {

            await saveDataInUserDefaults("remember", JSON.stringify(rememberEmail))

            await saveDataInUserDefaults("keyEmail", JSON.stringify(email.current))

          }

        })()
        setEmail(email.current)
        setPassword(password.current)
        
        setLoginTries(0)

        if (response.is_free === false) {




          if (getIsFirstLogin() === true) {
            dispatch(resetEmailPasswordSignIn(SIGN_IN_SCREEN));
            (async () => {

              await saveDataInUserDefaults(IS_FIRST_TIME_LOGIN, 'false')
              setIsFirstLogin(false)

              await saveDataInUserDefaults(LOGIN_TRIES, '0')


            })()
            setTimeout(() => {
              props.navigation.navigate('RegisterSecureLogin', { theme: myTheme })
            }, 250);

          }
          else {

            (async () => {

              await saveDataInUserDefaults(LOGIN_TRIES, '0')

            })()

            setTimeout(() => {
              dispatch(signInSuccess('cardHolder'))
            }, 250);

          }

        }
        else {


          dispatch(resetEmailPasswordSignIn(SIGN_IN_SCREEN));
          setTimeout(() => {
            dispatch(signInSuccess('freeUser'))
          }, 250);
        }


      }

    }
    else if (errorMessage) {
      return (
        <Modal responseMessage={errorMessage} modalType="error" onPress={() => setErrorMessage('')} />
      )
    }
  }

  const loginWithPinCodeButtonPressed = () => {

    if (getIsPinCodeRegistered() === false) {

      setErrorMessage("Code Login is not Registered")
    }
    else if (getLoginTries() < 5) {
      props.navigation.navigate('SecureLogin', { selectedScreen: 'pinCode', isFingerPrintSupported: isFingerPrintSupported, myThemeStyle: myTheme })
    } else {
      setErrorMessage(MULTIPLE_INVALID_LOGIN_ERROR)
    }

  }

  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={signUpScreenStyles.container}>
      <StatusBar
        barStyle={myTheme.colors.STATUS_BAR_STYLE}
        backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}
      />
      <ScrollView contentContainerStyle={styles.bodyContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

        <NotchView />
        <View style={{ alignItems: "center", marginTop: normalizeY(20) }}>
          <Image source={getIsDarkModeEnabled() ? logoDark : logoLight} style={{ height: normalizeY(45), width: '100%', resizeMode: 'contain' }} />
        </View>

        <View style={{ marginTop: normalizeY(25), flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ flexDirection: 'column' }}>
            <Text size={18} bolder color={myTheme.colors.LABEL_COLOR} >Welcome Back!</Text>
            <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(3) }} >We are glad to see you!</Text>
          </View>


          <TouchableOpacity onPress={() => props.navigation.navigate("FcsSignUp")} style={{ flexDirection: 'column', width: '45%', borderRadius: 10, elevation: 3, backgroundColor: '#ffad0e', justifyContent: 'center', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 0 } }}>

            <Text numberOfLines={2} style={{ color: 'white', textAlign: 'center', fontSize: normalizeFont(13) }}>Free Credit Score</Text>

          </TouchableOpacity>
        </View>

        <View style={{ marginTop: normalizeY(30) }}>
          <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR, }}>Enter your credentials to continue</Text>
        </View>

        <TextInput theme={myTheme} icon='email' containerStyle={styles.inputContainer} keyboardType='email-address' placeholder='Email' defaultValue={email.current} onChangeText={text => email.current = text} maxLength={40} />
        {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}

        <TextInput theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureTextEntry ? true : false} onPress={updateSecureTextEntry} containerStyle={styles.inputContainer} placeholder='Password' onChangeText={text => password.current = text} maxLength={25} />
        {errors.password ? <Text style={styles.errorStyle}>{errors.password} </Text> : null}
        <View style={styles.swtichForgotPasswordContainer}>

          <View style={{ alignItems: 'flex-start', marginTop: normalizeY(13), flex: 1, flexDirection: 'row' }}>
            <ToggleSwitch
              onColor={"#FECF31"}
              offColor="#dcdcdc"
              isOn={rememberEmail}

              onToggle={() => setRememberEmail(!rememberEmail)}
            />
            <Text style={{ ...styles.rememberMe, color: myTheme.colors.TEXTINPUT_LABEL_COLOR }}>Remember me</Text>
          </View>
          <View style={{ alignItems: 'flex-end', marginTop: normalizeY(13) }}>
            <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
              <Text style={{ color: "red", fontFamily: "Mulish-Bold", fontSize: 13 }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.bottomButtonsView}>
          <Button onPress={() => signInButtonPressed()} title="Sign In" />

          {isFingerPrintSupported && ((getIsFingerPrintRegistered() && !getIsFirstLogin()) || getIsFirstLogin()) ?
            <Button materialIconsIcon="fingerprint" style={{ backgroundColor: "#000" }} title="Sign In with Fingerprint" onPress={() => loginWithFingerPrintButtonPressed()} />
            : null}

          {
            (getIsPinCodeRegistered() && !getIsFirstLogin() || getIsFirstLogin()) ?
              <Button materialIconsIcon="lock-outline" style={{ backgroundColor: "#000" }} title="Sign In with Code" onPress={() => loginWithPinCodeButtonPressed()} />
              :
              null
          }


          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("PersonalInfoStepOne")} style={{ marginLeft: normalizeX(5), }}>
              <Text style={{ color: "#a1c452", marginTop: normalizeY(-2) }}>Sign up</Text>
              <View style={{ borderBottomColor: "#a1c452", borderBottomWidth: 1, width: "100%" }} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      {isLoading &&
        <CustomLoader />
      }

      {showMessage()}
      {tokenValidation()}
      {emailValidation()}

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
  bodyContainer: {
    flexGrow: 1,
    paddingHorizontal: normalizeX(15),
  },
  inputContainer: {
    marginTop: normalizeY(25)
  },
  bottomButtonsView: {
    flex: 1,
    marginTop: normalizeY(15),
    justifyContent: 'space-evenly',
  },
  swtichForgotPasswordContainer: {
    flexDirection: 'row',
  },
  darkModeText: {
    fontFamily: mulish_bold,
    textAlign: 'center'
  },
  rememberMe: {
    marginLeft: normalizeX(7),
    fontFamily: mulish_medium

  }
})