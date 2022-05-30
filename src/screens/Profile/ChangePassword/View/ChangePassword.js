import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import signUpScreenStyles from '../../../SignUp/SignUpStyle';
import { getDataFromUserDefaults, logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from "../../../../utils/Utils";
import TextInput from '../../../../component/common/TextInput';
import Button from '../../../../component/common/Button'
import Text from '../../../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { fetchChangePassword, resetChangePassword } from '../../../Profile/ChangePassword/Actions/changePasswordActions'
import { colorRedDC143C, getEmail, getPassword, setPassword, IS_FINGER_PRINT_LOGIN_REGISTERED, IS_PIN_CODE_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY } from '../../../../utils/Constants';
import Modal from '../../../../component/common/Modal'
import * as Keychain from 'react-native-keychain';
import CustomLoader from '../../../../component/common/CustomLoader'


export default SignInScreen = (props) => {

  const myTheme = useTheme();

  const [errors, setErrors] = useState({})
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [currentPasswordSecurity, setcurrentPasswordSecurity] = useState(true)
  const [secureConfrimTextEntry, setSecureConfirmTextEntry] = useState(true)

  const currentPassword = useRef('')
  const password = useRef('')
  const confirmPassword = useRef('')

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.changePasswordReducer.isLoading)
  const response = useSelector(state => state.changePasswordReducer.response)
  const isError = useSelector(state => state.changePasswordReducer.isError)


  const nextButtonPressed = () => {

    if (isFormValid()) {

      let changePasswordDataObject = {}

      changePasswordDataObject.email = getEmail()
      changePasswordDataObject.password = currentPassword.current.trim()
      changePasswordDataObject.newPassword = password.current.trim()

      dispatch(fetchChangePassword(changePasswordDataObject))
    }
  }

  const updateSecureTextEntry = () => {
    setSecureTextEntry(
      !secureTextEntry
    )
  }

  const currentPasswordSecureTextEntry = () => {
    setcurrentPasswordSecurity(
      !currentPasswordSecurity
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
      validationErrors.password = "Please Enter Your New Password"
    else if (password.current.trim().length < 8 || !password.current.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
      validationErrors.password = "Password should include both letters and numbers, Password should be eight characters long!"
    if (confirmPassword.current === undefined || confirmPassword.current === '' || confirmPassword.current.trim() === '')
      validationErrors.confirmPassword = "Please Re-Enter Your New Password"
    else if (password.current.trim() !== confirmPassword.current.trim())
      validationErrors.confirmPassword = "Password do not Match"
    else if (!confirmPassword.current.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
      validationErrors.confirmPassword = "Password should include both letters and numbers, Password should be eight characters long!"
    if (currentPassword.current === undefined || currentPassword.current === '' || currentPassword.current.trim() === '')
      validationErrors.currentPassword = "Please Enter Your Current Password"
    else if (currentPassword.current !== getPassword())
      validationErrors.currentPassword = " Your current Password doesn't Match"


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
          <Modal responseMessage={response.message} modalType="error" onPress={() => dispatch(resetChangePassword())} />
        )
      }
      else {

        logFireBaseEvent('password_updated')

        setPassword(password.current);
        dispatch(resetChangePassword());

        (async () => {


          let isFingerPrintLoginRegistered = await getDataFromUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED)
          let isPinCodeLoginRegistered = await getDataFromUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED)
      

          if (isFingerPrintLoginRegistered === 'true' || isPinCodeLoginRegistered === 'true') {

            await Keychain.setInternetCredentials(KEYCHAIN_EMAIL_KEY, getEmail(), getPassword())
          }


        })()

        setTimeout(() => {
          props.navigation.navigate("PasswordUpdated");
        }, 500);
      }
    }

  }

  return (

    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }} >
      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}
      />

      <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.body}>

        <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={currentPasswordSecurity ? true : false} onPress={currentPasswordSecureTextEntry} containerStyle={[signUpScreenStyles.textinput_style]}
          placeholder='Current Password' onChangeText={text => currentPassword.current = text} maxLength={25} />
        {errors.currentPassword ? <Text style={styles.errorStyle}>{errors.currentPassword} </Text> : null}

        <View style={{ marginTop: normalizeY(15) }}>
          <Text style={[styles.passwordText, { color: myTheme.colors.LABEL_COLOR }]}>{`The password should include both letters and numbers. Password should be eight characters long!`}</Text>
        </View>

        <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureTextEntry ? true : false} onPress={updateSecureTextEntry} containerStyle={signUpScreenStyles.textinput_style}
          placeholder='Password' onChangeText={text => password.current = text} maxLength={25} />
        {errors.password ? <Text style={styles.errorStyle}>{errors.password} </Text> : null}
        <TextInput icon='lock-outline' theme={myTheme} icon='lock-outline' ionicons="eye-off" antDesign="eye" secureTextEntry={secureConfrimTextEntry ? true : false} onPress={updateSecureConfirmTextEntry} containerStyle={signUpScreenStyles.textinput_style}
          placeholder=' Confirm Password' onChangeText={text => confirmPassword.current = text} maxLength={25} />
        {errors.confirmPassword ? <Text style={styles.errorStyle}>{errors.confirmPassword} </Text> : null}

      </LinearGradient>

      <View style={[signUpScreenStyles.button, { marginHorizontal: normalizeX(10) }]}>
        <Button style={{ width: "95%" }} onPress={() => nextButtonPressed()} title="Confirm" />
      </View>

      {isLoading ?
        <CustomLoader/> : null
      }

      {showMessage()}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  passwordText: {
    fontSize: normalizeFont(12),
    marginTop: 20,
  },

  body: {
    marginHorizontal: normalizeX(15),
    flex: 0.97,
  },
  errorStyle: {
    color: colorRedDC143C,
    fontSize: 11,
    marginTop: 2
  },

})