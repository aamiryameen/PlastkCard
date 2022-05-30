import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { normalizeY, normalizeX, saveDataInUserDefaults } from '../../utils/Utils'
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get("window");
const { height } = Dimensions.get('window');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useTheme } from '@react-navigation/native'
import * as Keychain from 'react-native-keychain';
import { colorWhiteffffff, getEmail, ligh_green, getPassword, IS_PIN_CODE_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, KEYCHAIN_PIN_KEY, mulish_regular, REGISTER_VIA_PIN_CODE_SCREEN } from '../../utils/Constants';
import Modal from '../../component/common/Modal'
import PINS from '../../utils/Helpers/pins_not_allowed';



export default changePincode = (props) => {


  const pin = useRef('')
  const setPin = useRef('')
  const confirmPin = useRef('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false);
  const [isPincodeMatch, setIsPincodeMatch] = useState(false);

  const myTheme = useTheme();

  const fetchPinCode = async () => {

    const response = await Keychain.getInternetCredentials(KEYCHAIN_PIN_KEY);
    pin.current = response.password


  };

  const storePinCode = async () => {

    await Keychain.setInternetCredentials(KEYCHAIN_PIN_KEY, setPin.current, confirmPin.current);
    await Keychain.setInternetCredentials(KEYCHAIN_EMAIL_KEY, getEmail(), getPassword())

  };

  const setPinCodeButtonPressed = () => {

    if (setPin.current !== '' && setPin.current.length === 4 && setPin.current === confirmPin.current) {
      storePinCode();
      saveDataInUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED, 'true')
      setError(false)
      setMessage("Code updated successfully")
    }
  }

  useEffect(() => {

    fetchPinCode();


  }, [])

  const showMessage = () => {

    if (isPincodeMatch === true) {

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

    else {
      if (message) {
        return (
          <Modal responseMessage={message} modalType='error' onPress={() => setMessage('')} />
        )
        {

        }
      }
    }


  }

  const resetState = () => {

    setMessage(''),
    props.navigation.goBack()
  }

  return (

    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>

      { isPincodeMatch === false ?

        <View>
          <Text style={{ color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(17), marginTop: normalizeY(20) }}>Enter your old Code</Text>

          <View style={{ marginTop: normalizeY(20), alignItems: 'center', justifyContent: 'center' }}>

            <OTPInputView
              style={{ width: '90%', height: normalizeY(100) }}
              pinCount={4}
              codeInputHighlightStyle={styles.highlightedField}
              autoFocusOnLoad={false}
              secureTextEntry={true}
              codeInputFieldStyle={{ color: ligh_green }}
              keyboardType='number-pad'
              onCodeFilled={(enteredCode) => {

                if (pin.current === enteredCode)
                  setIsPincodeMatch(true)

                else {
                  setIsPincodeMatch(false)
                  setMessage('Code does not Match')
                }

              }}
            />

          </View>
        </View>
        :
        <View>

          <View style={{ marginTop: normalizeY(20), alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular }}>Enter your new 4 digit Code</Text>

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
            <Text style={{ color: myTheme.colors.LABEL_COLOR }}>Re-enter your new 4 digit Code</Text>

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
                  }
                  else {
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
        </View>
      }

      <Text style={{ color: myTheme.colors.PIN_SHARE, fontFamily: mulish_regular, paddingLeft: normalizeX(15) }}>Don't share your Code with anyone</Text>
      {showMessage()}

    </LinearGradient>
  )
}

const styles = StyleSheet.create({

  blur: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: width,
    height: height
  },
  avoidingView: {
    borderRadius: 10,
    height: 150,
    width: width - 30
  },
  containerCodePin: {
    borderRadius: 10
  },
  pinStyle: {
    backgroundColor: theme.BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: theme.PIN_CODE_BORDER_COLOR,
    width: "50%", height: 50, color: "#A1C452",
    marginLeft: normalizeX(3),
    marginRight: normalizeX(3),
    fontFamily: mulish_regular,
  },
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
})