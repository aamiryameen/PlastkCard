import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Touchable
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import TextInput from '../../../../component/common/TextInput';
import NotchView from '../../../../component/common/NotchView';
import Text from '../../../../component/common/Text';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from "../../../../utils/Utils";
import Button from '../../../../component/common/Button'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Picker from "../../../../component/common/Picker";
import { colorRedDC143C, getUserIP, ligh_green, mulish_bold, mulish_medium, EQUIFAX_DISCLAIMER_MESSAGE } from "../../../../utils/Constants";
import Modal from '../../../../component/common/Modal'
import { fcsResendOTPAction, fcsSignUpPressedAction, resetFcsSignUpAction, resetFcsSignUpDataAction } from "../Actions/FCSSignUpActions";
import { fcsGetStatusAction } from "../../FCSDashBoard/Actions/FCSDashBoardActions";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { logoutAppAction } from "../../../Splash/Action/SplashAction";
import ToggleSwitch from 'toggle-switch-react-native'
import DialogModal from '../../../../component/common/DialogModal';


const titles = [
  {
    label: "Less than $12,000",
    value: 'Less than $12,000'
  }, {
    label: "$12,000 - $29,999",
    value: '$12,000 - $29,999'
  }, {
    label: '$30,000 - $59,999',
    value: '$30,000 - $59,999'
  }, {
    label: '$60,000 - $79,999',
    value: '$60,000 - $79,999'
  }, {
    label: '$80,000 - $99,999',
    value: '$80,000 - $99,999'
  }, {
    label: '$100,000 - $149,999',
    value: '$100,000 - $149,999'
  }, {
    label: 'Over $150,000"',
    value: 'Over $150,000"'
  }];

export default FCSFinancialInfo = (props) => {

  const myTheme = useTheme();
  const [plastkSentinel, setplastkSentinel] = useState(false)
  const [equifaxCreditScore, setequifaxCreditScore] = useState(false)
  const [optEquifax, setOptEquifax] = useState(false)
  const [updateView, setUpdateView] = useState(false)
  const [showDisclaimerModal, shouldSHowDisclaimerModal] = useState(false)
  const [disable, setDisabled] = useState(true)
  const signUpData = useSelector(state => state.fcsSignUpReducer.signUpDataObject)

  const [errors, setErrors] = useState({})
  const annualSalary = useRef('')
  const totp = useRef('')

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.fcsSignUpReducer.isLoading)
  const response = useSelector(state => state.fcsSignUpReducer.response)


  const submitButtonPressed = () => {

    if (isFormValid()) {

      let signUpDataObject = signUpData

      signUpDataObject.annual_salary_before_tax = annualSalary.current
      signUpDataObject.ip = getUserIP()
      signUpDataObject.totp = totp.current
      signUpDataObject.tnc_plastk = new Date()

      dispatch(fcsSignUpPressedAction(signUpDataObject))

    }

  }

  const handleDisclaimerModal = () => {
    if (showDisclaimerModal) {
      return (<DialogModal message={EQUIFAX_DISCLAIMER_MESSAGE} modalType='info' buttons={['OK']}
        positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
    }

  }

  const positiveButtonPressed = () => {
    shouldSHowDisclaimerModal(false)
  }

  useEffect(() => {

    if (equifaxCreditScore || plastkSentinel) {
      setOptEquifax(false)
    }

    if (plastkSentinel & equifaxCreditScore) {

      setDisabled(false)

    }
    else {
      setDisabled(true)
    }

  }, [plastkSentinel, equifaxCreditScore])


  useEffect(() => {

    if (optEquifax) {
      setequifaxCreditScore(false)
      setplastkSentinel(false)
    }

  }, [optEquifax])

  const isFormValid = () => {
    let validationErrors = {}

    if (totp.current.trim() === '') {
      validationErrors.totp = "Please enter Plastk Verification Code that you received in your email"
      setErrors(validationErrors)

    }



    if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
      setErrors(validationErrors)
      return true
    }
    else {
      setErrors(validationErrors)
      return false
    }
  }


  useEffect(() => {
    props.navigation.setOptions({ headerShown: false })


    if (signUpData !== '' && signUpData.hasOwnProperty('annual_salary_before_tax') && signUpData.annual_salary_before_tax !== '') {
      annualSalary.current = signUpData.annual_salary_before_tax

      setUpdateView(!updateView)
    }

  }, [])


  const showMessage = () => {
    if (response) {

      if (response.error === true) {

        return (
          <Modal responseMessage={response.message} modalType={"error"} onPress={() => {
            dispatch(resetFcsSignUpAction());
          }

          }
          />
        )
      }
      else {

        logFireBaseEvent('fcs_application_submitted')
        dispatch(resetFcsSignUpAction());

        setTimeout(() => {
          dispatch(resetFcsSignUpDataAction())
        }, 200);

        setTimeout(() => {
          props.navigation.navigate('FCSDashBoard')
          dispatch(fcsGetStatusAction())
        }, 500);

      }

    }
  }


  const resendOTPPressed = () => {
    dispatch(fcsResendOTPAction())
  }


  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
      <NotchView />
      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>

        <View style={{ flexDirection: 'column', marginTop: normalizeY(10), marginHorizontal: normalizeX(10) }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(13), fontWeight: '700', textAlign: 'center' }}>Fill this form to get your Free Credit Score</Text>


            <AntDesign
              name="logout"
              color="#fe5c31"
              size={25}
              style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: normalizeX(10) }}
              onPress={() => dispatch(logoutAppAction())}
            />
          </View>

        </View>

        <View style={{ ...styles.personalInfoContainer, marginTop: normalizeY(20) }}>
          <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Financial Information</Text>
        </View>


        <View style={{ ...styles.body, flex: 0 }}>


          <Picker icon='location-city' theme={myTheme} values={titles} title={annualSalary.current} placeholder='Annual Salary Before Taxes' onChange={(val) => annualSalary.current = val} />
          <View style={{ ...styles.personalInfoContainer, marginTop: normalizeY(25) }}>
            <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Email Verification</Text>
          </View>
        </View>





        <View style={styles.body}>


          <View style={{ marginTop: normalizeY(10) }}>
            <TextInput theme={myTheme} icon='lock' keyboardType="phone-pad" placeholder='Please Enter Your Plastk Verification Code*' defaultValue={totp.current} onChangeText={text => totp.current = text} maxLength={6} />
            {errors.totp ? <Text style={styles.errorStyle}>{errors.totp} </Text> : null}


            <View>
              <Text style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(5) }}>Note: The Plastk Verification Code has already been sent to your email. If you have not received that email, kindly press Resend Plastk Verification Code button below to receive new Plastk Verification Code</Text>
            </View>
          </View>


          <Button style={{ width: '100%', marginTop: hp('5%') }} title="Resend Plastk Verification Code" onPress={() => resendOTPPressed()} />


          <View style={styles.toogleSwitchContainer}>
            <Text style={{ ...styles.agreeText, color: myTheme.colors.DARK_TEXT_COLOR }}>I agree to</Text>

            <View style={styles.switchTextStyle}>
              <ToggleSwitch
                onColor={"#FECF31"}
                offColor="#dcdcdc"
                isOn={plastkSentinel}

                onToggle={() => setplastkSentinel(!plastkSentinel)}
              />
              <View style={{ flexDirection: "row" }}>

                <TouchableOpacity onPress={() => props.navigation.navigate("CmsContent", { slugName: "my-credit-score" })}>
                  <View style={{ maxWidth: wp('96%'), }}>
                    <Text style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%'), }}>Terms & Conditions</Text>
                    <View style={{ marginLeft: normalizeX(8), borderBottomColor: ligh_green, borderBottomWidth: 1, width: "92%" }} />
                  </View>
                </TouchableOpacity>

                <Text numberOfLines={2} style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}> -  My Credit </Text>
              </View>
            </View>


            <View style={{ alignItems: 'flex-start', marginTop: normalizeY(13), flex: 1, flexDirection: 'row' }}>
              <ToggleSwitch
                onColor={"#FECF31"}
                offColor="#dcdcdc"
                isOn={equifaxCreditScore}

                onToggle={() => setequifaxCreditScore(!equifaxCreditScore)}
              />
              <View style={styles.termsTextStyls}>
                <View style={{ maxWidth: wp('96%'), flexDirection: "row" }}>
                  <View style={{ flexDirection: "row" }}>


                    <Text style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>Equifax Credit Score
                    <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                        <Text style={{ fontFamily: mulish_bold, fontSize: hp('1.3%'), color: myTheme.colors.DARK_TEXT_COLOR, }}> 1 2</Text>
                      </TouchableOpacity></Text>
                  </View>



                </View>
                <Text style={{ ...styles.toggleText, fontFamily: mulish_medium, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>By clicking here you're giving Plastk Financial & Rewards Inc authorization to access your Equifax Credit Report
                <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                    <Text style={{ ...styles.toggleText, fontFamily: mulish_bold, fontSize: hp('1.3%'), color: myTheme.colors.DARK_TEXT_COLOR, marginLeft: wp("0%"), }}> 1 2</Text>
                  </TouchableOpacity>
                </Text>

              </View>

            </View>

            <View style={{ alignItems: 'flex-start', marginTop: normalizeY(13), flex: 1, flexDirection: 'row' }}>
              <ToggleSwitch
                onColor={"#FECF31"}
                offColor="#dcdcdc"
                isOn={optEquifax}

                onToggle={() => setOptEquifax(!optEquifax)}
              />
              <View style={styles.termsTextStyls}>
                <View style={{ maxWidth: wp('96%'), flexDirection: "row" }}>
                  <Text style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>Opt out of Free Equifax Credit Score
                  <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                      <Text style={{ fontFamily: mulish_bold, fontSize: hp('1.4%'), color: myTheme.colors.DARK_TEXT_COLOR, }}> 1 2</Text>
                    </TouchableOpacity>

                  </Text>

                </View>



                <View style={{ flexDirection: "row" }}>
                  <Text style={{ ...styles.toggleText, fontFamily: mulish_medium, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>By clicking here you are opting out to Plastk Financial & Rewards Inc accessing your Equifax Credit Report. You will not receive your free monthly Equifax Credit Score
                   {<TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                      <Text style={{ ...styles.toggleText, fontFamily: mulish_bold, fontSize: hp('1.3%'), color: myTheme.colors.DARK_TEXT_COLOR, marginLeft: wp("0%"), }}> 1 2</Text>
                    </TouchableOpacity>}
                  </Text>


                </View>

              </View>
            </View>
          </View>


        </View>

        <View style={{ flex: 0.8 }} />

        <Button disabled={disable} style={{ marginVertical: normalizeY(20), backgroundColor: disable ? '#cccac6' : ligh_green, }} title="Submit" onPress={() => submitButtonPressed()} />
        {isLoading &&
          <View style={[styles.loading]}>

            <ActivityIndicator size="large" color="#00ff00" />

          </View>
        }
        {showMessage()}
        {handleDisclaimerModal()}
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeX(15),
  },
  body: {

    marginTop: normalizeY(25),
    justifyContent: "space-between"
  },
  personalInfoContainer: {
    alignItems: "center",
    marginTop: normalizeY(10)
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
    justifyContent: 'center',

  },
  personalInfo: {
    fontFamily: mulish_bold,
  },
  toogleSwitchContainer: {
    marginTop: hp("3%"),
  },
  agreeText: {
    fontFamily: mulish_bold,
    fontSize: hp("2.2%")
  },
  toggleText: {
    fontFamily: mulish_bold,
    fontSize: hp('1.7%'),
    marginLeft: wp("2%"),
  },
  switchTextStyle: {
    alignItems: 'flex-start',
    marginTop: normalizeY(13),
    flex: 1,
    flexDirection: 'row'
  },
  termsTextStyls: {
    maxWidth: wp('96%')
  },

})