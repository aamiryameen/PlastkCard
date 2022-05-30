import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Linking,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import TextInput from '../../../../component/common/TextInput';
import Text from '../../../../component/common/Text';
import { downloadFile, logFireBaseEvent, normalizeFont, normalizeX, normalizeY, openLink } from "../../../../utils/Utils";
import Button from '../../../../component/common/Button'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Picker from "../../../../component/common/Picker";
import { performSignUpAction, resetSignUpDataObjectAction, resetSignUpScreenAction, vaildateSetPasswordTokenAction } from '../SignUpActions/SignUpActions'
import { colorRedDC143C, getUserIP, ligh_green, mulish_bold, mulish_regular } from "../../../../utils/Constants";
import Modal from '../../../../component/common/Modal'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const titles = [{
  label: "Yes",
  value: 'Yes'
}, {
  label: 'No',
  value: 'No'
}];

export default FinancialInfo = (props) => {

  const myTheme = useTheme();

  const [updateView, setUpdateView] = useState(false)

  const signUpData = useSelector(state => state.signUpReducer.signUpDataObject)

  const [errors, setErrors] = useState({})
  const creditLimit = useRef('')
  const annualSalary = useRef('')
  const otherIncome = useRef('')
  const selectMortgage = useRef('')
  const monthlyRentMortgage = useRef('')
  const token = useRef('')

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.signUpReducer.isLoading)
  const response = useSelector(state => state.signUpReducer.response)
  const isError = useSelector(state => state.signUpReducer.isError)

  const tokenValidationResponse = useSelector(state => state.signUpReducer.tokenValidationResponse)

  const submitButtonPressed = () => {

    if (isFormValid()) {

      let signUpDataObject = signUpData

      signUpDataObject.credit_limit = creditLimit.current.trim()
      signUpDataObject.annual_salary_before_tax = annualSalary.current.trim()
      signUpDataObject.other_house_income = otherIncome.current.trim()
      signUpDataObject.mortgage = selectMortgage.current
      signUpDataObject.rent_on_mortgage = monthlyRentMortgage.current
      signUpDataObject.ip = getUserIP()

      dispatch(performSignUpAction(signUpDataObject))
    }

  }
  const isFormValid = () => {
    let validationErrors = {}

    if (creditLimit.current === undefined || creditLimit.current === '' || creditLimit.current.trim() === '') {
      validationErrors.creditLimit = "Please Enter Requested Credit Limit between $300 & $10,000"
    }
    else {
      if (!creditLimit.current.trim().match(/^[0-9]+$/)) {
        validationErrors.creditLimit = "Please input Valid Number"
      }
      else {
        let limit = parseInt(creditLimit.current)

        if (limit < 300)
          validationErrors.creditLimit = "Credit Minimum Limit is $300"
        else if (limit > 10000)
          validationErrors.creditLimit = "Credit Maximum Limit is $10,000"
      }
    }

    if (annualSalary.current === undefined || annualSalary.current === '' || annualSalary.current.trim() === '') {
      validationErrors.annualSalary = "Please enter Annual Salary before Taxes"
    } else if (!annualSalary.current.trim().match(/^[0-9]+$/)) {
      validationErrors.annualSalary = "Please enter Valid Number"
    }

    if (otherIncome.current !== '' || otherIncome.current.trim() !== '') {
      if (!otherIncome.current.trim().match(/^[0-9]+$/))
        validationErrors.otherIncome = "Please enter Valid Number"
    }
    if (monthlyRentMortgage.current !== '' || monthlyRentMortgage.current.trim() !== '') {
      if (!monthlyRentMortgage.current.trim().match(/^[0-9]+$/))
        validationErrors.monthlyRentMortgage = "Please enter Valid Number"
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

    if (signUpData !== '' && signUpData.hasOwnProperty('credit_limit') && signUpData.credit_limit !== '') {
      creditLimit.current = signUpData.credit_limit
      annualSalary.current = signUpData.annual_salary_before_tax
      otherIncome.current = signUpData.other_house_income
      selectMortgage.current = signUpData.mortgage
      monthlyRentMortgage.current = signUpData.rent_on_mortgage

      setUpdateView(!updateView)
    }

  }, [])


  const showMessage = () => {
    if (response) {

      if (isError) {

        return (
          <Modal responseMessage={response.message} modalType={isError ? "error" : "success"} onPress={() => {
            dispatch(resetSignUpScreenAction());
          }

          }
          />
        )
      }
      else {

        logFireBaseEvent('application_submitted')
        dispatch(resetSignUpScreenAction());

        setTimeout(() => {
          dispatch(resetSignUpDataObjectAction())
        }, 200);

        setTimeout(() => {
          props.navigation.navigate('SetPassword', { token: response.totp, user: response.user })
        }, 500);

      }

    }
  }

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

  const navigate = (url) => {

    try {
      if (url === null)
        return

      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[1];

      let splitted = routeName.split('?')

      if (splitted[0] === 'set-password') {
        token.current = splitted[1].split('=')[1];
        if (token.current !== undefined && token.current !== '')
          dispatch(vaildateSetPasswordTokenAction(token.current))
      }
    } catch (error) {

    }


  }
  const handleOpenURL = (event) => {
    navigate(event.url);
  }
  const tokenValidation = () => {

    if (tokenValidationResponse !== '') {
      dispatch(resetSignUpScreenAction())
      if (tokenValidationResponse === 'success')
        props.navigation.navigate("SetPassword", { token: token.current })
      else
        props.navigation.navigate("ForgotPassword")
    }

  }

  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.personalInfoContainer}>
          <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Financial Information</Text>
        </View>
        <View style={styles.body}>
          <View>
            <TextInput icon='credit-card' theme={myTheme} placeholder='Requested Credit Limit*' defaultValue={creditLimit.current} keyboardType="phone-pad" onChangeText={text => creditLimit.current = text} maxLength={5} />
            {errors.creditLimit ? <Text style={styles.errorStyle}>{errors.creditLimit} </Text> : null}
          </View>
          <View>
            <TextInput materialCommunityIcons='seat-individual-suite' theme={myTheme} keyboardType="phone-pad" defaultValue={annualSalary.current} placeholder='Annual Salary Before Taxes*' onChangeText={text => annualSalary.current = text} maxLength={10} />
            {errors.annualSalary ? <Text style={styles.errorStyle}>{errors.annualSalary} </Text> : null}
          </View>
          <View>
            <TextInput icon='location-city' theme={myTheme} placeholder='Other House Income Before Taxes' defaultValue={otherIncome.current} keyboardType="phone-pad" onChangeText={text => otherIncome.current = text} maxLength={10} />
            {errors.otherIncome ? <Text style={styles.errorStyle}>{errors.otherIncome} </Text> : null}
          </View>
          <Picker icon='location-city' theme={myTheme} values={titles} title={selectMortgage.current} placeholder='Select Mortgage' onChange={(val) => selectMortgage.current = val} />
          <View>
            <TextInput icon='location-city' theme={myTheme} theme={myTheme} placeholder='Monthly Rent/mortgage' defaultValue={monthlyRentMortgage.current} keyboardType="phone-pad" onChangeText={text => monthlyRentMortgage.current = text} maxLength={10} />
            {errors.monthlyRentMortgage ? <Text style={styles.errorStyle}>{errors.monthlyRentMortgage} </Text> : null}
          </View>

          <View style={{ marginTop: hp('3%'), marginHorizontal: wp('1%') }}>

            <Text style={{ ...styles.textStyle, color: myTheme.colors.LABEL_COLOR }}>By clicking submit: </Text>

            <View style={{ marginLeft: wp('2%') }}>
              {/*  <Text style={{ ...styles.textStyle, color: myTheme.colors.LABEL_COLOR }}><Text style={{ color: myTheme.colors.LABEL_COLOR }}>{'\u2B24'}</Text> I agree to the  <TouchableOpacity onPress={() => openLink(signUpData.card_type === '1' ? 'https://www.plastk.ca/Spring-Contest.pdf' : 'https://www.plastk.ca/Contest-Rules-BC.pdf')}>
                <Text style={styles.privacyPolicyText}>Contest Rules</Text>
              </TouchableOpacity>
              </Text>
 */}

              <View style={{ flexDirection: 'row' }}>

                <Text style={{ color: myTheme.colors.LABEL_COLOR }}>{'\u2B24'}</Text>
                <View style={{ marginBottom: hp('3%') }}>
                  <Text style={{ ...styles.textStyle, color: myTheme.colors.LABEL_COLOR }}>
                    {` I agree to allow Plastk Financial & Rewards Inc. to contact me by email regarding products, services, marketing, promotions, and events. I understand I may withdraw my consent at any time.`}
                  </Text>

                  <Text style={{ ...styles.textStyle, marginTop: hp('1%'), color: myTheme.colors.LABEL_COLOR }}>Your personal information is strictly protected. For more information, <Text style={{ ...styles.textStyle, color: myTheme.colors.LABEL_COLOR }}>please refer to our </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate("CmsContent", { slugName: "privacypolicy" })}>
                      <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
                    </TouchableOpacity></Text>

                  <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>




                  </View>

                  <Text style={{ ...styles.textStyle, marginTop: hp('1%'), color: myTheme.colors.LABEL_COLOR }}>
                    {`Plastk Financial & Rewards Inc., 620 12th Ave SW, Calgary, Alberta T2R 0H5`}
                  </Text>

                </View>

              </View>

            </View>


          </View>


        </View>

        <Button style={{ marginVertical: normalizeY(20) }} title="Submit" onPress={() => submitButtonPressed()} />



        {isLoading &&
          <View style={[styles.loading, { backgroundColor: myTheme.colors.DARK_GRADIENT_FIRST_COLOR }]}>

            <Text numberOfLines={2} style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(13), fontWeight: '700', marginTop: normalizeY(10), textAlign: 'center' }}>Thank you for your application! Kindly wait while we create an account for you.</Text>
            <ActivityIndicator size="large" color="#00ff00" />

          </View>
        }
        {showMessage()}
        {tokenValidation()}
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeX(15),
  },
  body: {
    flex: 1,
    marginTop: normalizeY(25),
    justifyContent: "space-between"
  },
  personalInfoContainer: {
    alignItems: "center",
    marginTop: normalizeY(4)
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

  textStyle: {
    fontFamily: mulish_regular
  },
  privacyPolicyText: {
    fontFamily: mulish_regular,
    fontStyle: 'italic', fontWeight: 'bold', textDecorationLine: 'underline', color: ligh_green, textAlign: 'center'
  }
})