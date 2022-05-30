import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY, ValidateEmail } from "../../../utils/Utils";
import Text from '../../../component/common/Text';
import StatusHeader from './StatusHeader';
import { colorRedDC143C, mulish_bold, mulish_regular, colorWhiteffffff, ligh_green } from "../../../utils/Constants";
import TextInput from "../../../component/common/TextInput";
import Button from "../../../component/common/Button";
import StepsComponent from './StepsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { activateCardAction, resetActivateCardScreen, sendOTPEmail } from "../action/ActivateYourCardAction";

import Modal from '../../../component/common/Modal';
import { getAccountStatusAction } from "../action/StatusAction";
import CustomLoader from "../../../component/common/CustomLoader";
import { cardActivated } from '@assets';
import NotchView from "../../../component/common/NotchView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default ForgotPasswordSent = (props) => {

  const myTheme = useTheme();

  const [errors, setErrors] = useState({})

  const email = useRef('')
  const pin = useRef('')
  const cardLastDigits = useRef('')

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.activateCardReducer.isLoading)
  const otpResponse = useSelector(state => state.activateCardReducer.otpResponse)
  const cardActivationResponse = useSelector(state => state.activateCardReducer.cardActivationResponse)
  const isEmailSent = useSelector(state => state.activateCardReducer.isEmailSent)
  const isError = useSelector(state => state.activateCardReducer.isError)


  useEffect(() => {

    logFireBaseEvent('activate_your_card_screen')

  }, [])

  const sendActivationCodePressed = () => {

    if (isEmailValid()) {
      dispatch(sendOTPEmail(email.current))
    }

  }

  const isEmailValid = () => {

    let validationErrors = {}

    if (email.current === '' || email.current.trim() === '')
      validationErrors.email = 'Please enter email'
    else if (!ValidateEmail(email.current.trim()))
      validationErrors.email = 'Please enter valid email'

    if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
      setErrors(validationErrors)
      return true
    }
    else {
      setErrors(validationErrors)
      return false
    }

  }

  const isFormValid = () => {

    let validationErrors = {}

    if (pin.current === '' || pin.current.trim() === '')
      validationErrors.pin = 'Please enter Activation Code'

    if (cardLastDigits.current === '' || cardLastDigits.current.trim() === '' || cardLastDigits.current.trim().length !== 4)
      validationErrors.cardLastDigits = 'Please input last 4 digits'

    if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
      setErrors(validationErrors)
      return true
    }
    else {
      setErrors(validationErrors)
      return false
    }

  }

  const activateCardButton = () => {

    if (isFormValid()) {

      let obj = { pin: pin.current, last_four_digits: cardLastDigits.current }

      dispatch(activateCardAction(obj))

    }
  }


  const handleResponse = () => {

    if (otpResponse) {
      if (!isEmailSent) {
        return (
          <Modal responseMessage={otpResponse.message} modalType="error" onPress={() => dispatch(resetActivateCardScreen())} />
        )

      }
    }
    else if (cardActivationResponse) {

      if (isError) {
        return (
          <Modal responseMessage={cardActivationResponse.message} modalType="error" onPress={() => dispatch(resetActivateCardScreen())} />
        )
      }
      else {

        if (cardActivationResponse.success === true) {

          logFireBaseEvent('card_activated')
          dispatch(getAccountStatusAction())
        }
      }
    }

  }

  return (
    <View style={styles.bodyView}>
      <StatusHeader />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>


        <View style={{ height: 260, width: "90%", margin: 20, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: myTheme.colors.BACKGROUND_COLOR, elevation: 6, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 0 } }}>
          <Image source={require("../../../assets/images/card-activated-filled.png")} resizeMode='cover' style={styles.image} />
        </View>

        <View style={{ marginLeft: normalizeX(10) }}>
          <StepsComponent current={4} />
        </View>


        {!isEmailSent ?
          <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }} style={styles.fundRequestedTextContainer}>
            <Text style={[styles.fundRequestedText, { marginTop: normalizeY(7), color: myTheme.colors.DARK_TEXT_COLOR, textAlign: "center" }]}>Activate your card</Text>
            <Text style={[styles.moneyRequestText, { marginTop: normalizeY(5), color: myTheme.colors.DARK_TEXT_COLOR }]}>To activate your card please input your email</Text>

            <TextInput icon='email' theme={myTheme} containerStyle={styles.inputContainer} keyboardType='email-address' onChangeText={text => email.current = text} />
            {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}

            <View style={{ marginTop: normalizeY(25), alignItems: "center" }}>
              <Button style={{ width: "95%", borderRadius: 10, marginHorizontal: normalizeX(8) }} onPress={() => sendActivationCodePressed()} title="Send Activation Code" />
            </View>

          </LinearGradient>

          :

          <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }} style={styles.fundRequestedTextContainer}>

            <Text style={[styles.moneyRequestText, { color: myTheme.colors.DARK_TEXT_COLOR }]}>An email with an Activation Code has been sent to you</Text>
            <TextInput theme={myTheme} icon='lock' containerStyle={styles.inputContainer} keyboardType='phone-pad' placeholder='Enter your Activation Code' onChangeText={text => pin.current = text} />
            {errors.pin ? <Text style={styles.errorStyle}>{errors.pin} </Text> : null}

            <TextInput theme={myTheme} icon='credit-card' containerStyle={styles.inputContainer} keyboardType='phone-pad' placeholder='Enter the last 4 digits of your card' onChangeText={text => cardLastDigits.current = text} />
            {errors.cardLastDigits ? <Text style={styles.errorStyle}>{errors.cardLastDigits} </Text> : null}

            <View style={{ marginTop: normalizeY(25), alignItems: "center" }}>
              <Button style={{ width: "95%", borderRadius: 10, marginHorizontal: normalizeX(8) }} onPress={() => activateCardButton()} title="Activate Card" />
            </View>
          </LinearGradient>
        }

      </KeyboardAwareScrollView>

      {isLoading &&
        <CustomLoader />
      }
      {handleResponse()}
    </View>
  );
}


const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    marginBottom: normalizeY(10)
  },
  imageContainer: {
    flex: 1,
    elevation: 0.2,
    marginHorizontal: normalizeX(14),

  },
  fundRequestedTextContainer: {
    marginHorizontal: normalizeX(14),
    flex: 1,
    backgroundColor: colorWhiteffffff,



  },
  fundRequestedText: {
    fontSize: normalizeFont(22, true),
    fontFamily: mulish_bold,
    marginHorizontal: normalizeX(8)
  },
  moneyRequestText: {
    fontSize: normalizeFont(14),
    marginTop: normalizeY(20),
    fontFamily: mulish_regular,
    marginHorizontal: normalizeX(8)
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  inputContainer: {
    marginTop: normalizeY(10),
    marginHorizontal: normalizeX(8)
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  },
  bottomButtonsView: {
    marginTop: normalizeY(20),
    width: '50%',
    borderRadius: 5,
    marginHorizontal: normalizeX(8)
  },
  errorStyle: {
    color: colorRedDC143C,
    fontSize: 11,
    marginTop: 2
  },
  phoneNumberStyle: {
    color: ligh_green,
    fontSize: normalizeFont(13),
    fontFamily: mulish_regular,

  },
})
