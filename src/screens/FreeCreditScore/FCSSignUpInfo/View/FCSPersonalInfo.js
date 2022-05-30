import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
import TextInput from '../../../../component/common/TextInput';
import Text from '../../../../component/common/Text';
import NotchView from '../../../../component/common/NotchView';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY, ValidateEmail } from "../../../../utils/Utils";
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import DatePicker from "../../../../component/common/DatePicker";
import LinearGradient from 'react-native-linear-gradient';
import Picker from "../../../../component/common/Picker";
import MaskedTextInput from '../../../../component/common/MaskedTextInput';
import { colorRedDC143C, getEmail, mulish_bold, mulish_medium } from "../../../../utils/Constants";

import { useSelector, useDispatch } from 'react-redux'
import { updateFcsSignUpDataAction, resetFcsSignUpDataAction } from "../Actions/FCSSignUpActions";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { logoutAppAction } from "../../../Splash/Action/SplashAction";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const titles = [{
  label: 'Mr.',
  value: 'M'
}, {
  label: 'Ms.',
  value: 'F'
}, {
  label: 'Mrs.',
  value: 'Fe'
}, {
  label: 'Other',
  value: 'O'
}];

const items = [
  { label: "Mail Offer", value: "Mail Offer" },
  { label: "Friends or Family", value: "Friends or Family" },
  { label: "Email Offer Plastk", value: "Email Offer Plastk" },
  { label: "Search Engine", value: "Search Engine" },
  { label: "Online Banner Ad or Video", value: "Online Banner Ad or Video" },
  { label: "Facebook Ad or Video", value: "Facebook Ad or Video" },
  { label: "Credit Card Comparisons", value: "Credit Card Comparisons" },
  { label: "Other", value: "Other" },
];

export default FCSPersonalInfo = (props) => {

  const myTheme = useTheme();

  const dispatch = useDispatch()

  const signUpData = useSelector(state => state.fcsSignUpReducer.signUpDataObject)


  const [errors, setErrors] = useState({})
  const title = useRef('')
  const firstName = useRef('')
  const middleName = useRef('')
  const lastName = useRef('')
  const phoneNumber = useRef('')
  const socialInsuranceNumber = useRef('')
  const email = useRef('')
  const dob = useRef('')
  const aboutUs = useRef('')


  const getAge = (DOB) => {
    var today = new Date();
    var month = today.getMonth()
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = (today.getMonth() + 1) - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const nextButtonPressed = () => {

    if (isFormValid()) {

      let signUpDataObject = signUpData

      if (signUpDataObject === '')
        signUpDataObject = {}

      if (title.current === 'Fe')
        title.current = 'F'
      signUpDataObject.gender = title.current
      signUpDataObject.first_name = firstName.current.trim()
      signUpDataObject.middle_name = middleName.current.trim()
      signUpDataObject.last_name = lastName.current.trim()
      signUpDataObject.phone_number = phoneNumber.current.trim()
      signUpDataObject.dob = dob.current.toString()
      signUpDataObject.sin = socialInsuranceNumber.current.trim()
      signUpDataObject.how_did_you_hear_about_us = aboutUs.current
      signUpDataObject.email = getEmail().toLowerCase()

      dispatch(updateFcsSignUpDataAction(signUpDataObject))

      logFireBaseEvent('fcs_application_started')

      props.navigation.navigate("FCSAddress", { signUpData: signUpDataObject })
    }
  }

  useEffect(() => {

    props.navigation.setOptions({ headerShown: false })

    return () => {
      dispatch(resetFcsSignUpDataAction())
    }
  }, [])

  const isFormValid = () => {

    let validationErrors = {}
    if (firstName.current === undefined || firstName.current === '' || firstName.current.trim() === '' || !firstName.current.trim().match(/^[a-zA-Z\s]*$/))
      validationErrors.firstName = "Please enter Valid First Name"
    else if (firstName.current.trim().length < 2)
      validationErrors.firstName = "First name should be at least 2 characters"

    if (title.current === undefined || title.current === '' || title.current === null || title.current.trim() === '')
      validationErrors.title = "Please select Title"

    if (lastName.current === undefined || lastName.current === '' || lastName.current.trim() === '' || !lastName.current.trim().match(/^[a-zA-Z\s]*$/))
      validationErrors.lastName = "Please enter Valid Last Name"
    else if (lastName.current.trim().length < 2)
      validationErrors.lastName = "Last name should be at least 2 characters"

    if ((middleName.current !== '' || middleName.current.trim() !== '') && !middleName.current.trim().match(/^[a-zA-Z\s]*$/))
      validationErrors.middleName = "Please enter Valid Middle Name"

    if (dob.current === undefined || dob.current === '' || dob.current === null || dob.current.trim() === '')
      validationErrors.dob = "Please select Date of Birth"
    else {
      const checkAge = getAge(dob.current);
      if (checkAge < 18)
        validationErrors.dob = "You must be 18 years to Apply"
    }
    if (phoneNumber.current === undefined || phoneNumber.current === '' || phoneNumber.current.trim() === '' || !phoneNumber.current.trim().match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
      validationErrors.phoneNumber = "Please enter Valid Phone Number"

    if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
      setErrors(validationErrors)
      return true
    }
    else {
      setErrors(validationErrors)
      return false
    }
  }



  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

        <View style={{ flexDirection: 'column', marginTop: normalizeY(10), marginHorizontal: normalizeX(10) }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(13), fontWeight: '700', textAlign: 'center', }}>Fill this form to get your Free Credit Score</Text>

            <AntDesign
              name="logout"
              color="#fe5c31"
              size={25}
              style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: normalizeX(10) }}
              onPress={() => dispatch(logoutAppAction())}
            />
          </View>

        </View>

        <View style={styles.personalInfoContainer}>
          <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Personal Information</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.textInputRow}>
            <View style={{ flex: 0.48, }}>
              <Picker theme={myTheme} placeholder='Title*' icon='person' values={titles} onChange={(val) => title.current = val} />
              {errors.title ? <Text style={styles.errorStyle}>{errors.title}</Text> : null}
            </View>
            <View style={{ flex: 0.5 }}>
              <TextInput icon='person' theme={myTheme} containerStyle={[styles.textInput, {}]} autoCapitalize={'words'} placeholder='First Name*' onChangeText={text => { firstName.current = text; }} maxLength={40} />
              {errors.firstName ? <Text style={styles.errorStyle}>{errors.firstName} </Text> : null}
            </View>
          </View>
          <View style={styles.textInputRow}>
            <View style={{ flex: 0.5 }}>
              <TextInput icon='person' theme={myTheme} containerStyle={styles.textInput} autoCapitalize={'words'} placeholder='Middle Name' onChangeText={text => { middleName.current = text; }} maxLength={40} />
              {errors.middleName ? <Text style={styles.errorStyle}>{errors.middleName} </Text> : null}
            </View>
            <View style={{ flex: 0.5 }}>
              <TextInput icon='person' theme={myTheme} containerStyle={styles.textInput} autoCapitalize={'words'} placeholder='Last Name*' onChangeText={text => { lastName.current = text; }} maxLength={40} />
              {errors.lastName ? <Text style={styles.errorStyle}>{errors.lastName} </Text> : null}
            </View>
          </View>

          <TextInput keyboardType='email-address' theme={myTheme} icon='email' defaultValue={getEmail()} isEditable={false} containerStyle={styles.textInput} placeholder='Email' onChangeText={text => email.current = text} maxLength={40} />
          {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}

          <MaskedTextInput keyboardType="phone-pad" theme={myTheme} icon='phone' containerStyle={styles.textInput} placeholder='Phone*' mask={"([000]) [000]-[0000]"} onChangeText={(formatted, extracted) => { phoneNumber.current = formatted }} />
          {errors.phoneNumber ? <Text style={styles.errorStyle}>{errors.phoneNumber} </Text> : null}


          <View style={styles.textInputRow}>
            <View style={{ flex: 0.5, }}>
              <DatePicker theme={myTheme} dateVisible={true} style={styles.textInput} placeholder='Date of Birth*' onChange={(val) => dob.current = val} />
              {errors.dob ? <Text style={styles.errorStyle}>{errors.dob} </Text> : null}
            </View>
            <View style={{ flex: 0.5 }}>
              <MaskedTextInput theme={myTheme} keyboardType="phone-pad" fontawesome='id-card' containerStyle={styles.textInput} placeholder='Social Insurance Number' mask={"[000]-[000]-[000]"} onChangeText={(formatted, extracted) => { socialInsuranceNumber.current = formatted }} />
              {errors.socialInsuranceNumber ? <Text style={styles.errorStyle}>{errors.socialInsuranceNumber} </Text> : null}
            </View>
          </View>
          <Picker theme={myTheme} fontawesome='info-circle' values={items} placeholder='How Did You Hear About Us?' onChange={(val) => aboutUs.current = val} />
        </View>
        <Button style={{ marginVertical: normalizeY(20) }} onPress={() => nextButtonPressed()} title="Next" />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeX(15),

  },
  personalInfoContainer: {
    alignItems: "center",
    marginTop: normalizeY(10),
    marginBottom: normalizeY(20),
    fontFamily: mulish_bold,

  },
  personalInfo: {
    fontFamily: mulish_bold,

  },
  body: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textInputRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  textInput: {
    width: '96%',
  },
  errorStyle: {
    color: colorRedDC143C,
    fontSize: 11,
    marginTop: 2
  }
})