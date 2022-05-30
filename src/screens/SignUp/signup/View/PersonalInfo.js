import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import TextInput from '../../../../component/common/TextInput';
import Text from '../../../../component/common/Text';
import { logFireBaseEvent, normalizeX, normalizeY, ValidateEmail } from "../../../../utils/Utils";
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import DatePicker from "../../../../component/common/DatePicker";
import LinearGradient from 'react-native-linear-gradient';
import Picker from "../../../../component/common/Picker";
import MaskedTextInput from '../../../../component/common/MaskedTextInput';
import { colorRedDC143C } from "../../../../utils/Constants";
import { useSelector, useDispatch } from 'react-redux'
import { resetSignUpDataObjectAction, updateSignUpDataAction } from '../SignUpActions/SignUpActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';


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

const cardTitles = [
  { label: "to Rebuild your Credit", value: "Rebuild your Credit" },
  { label: "New to Canada", value: "New to Canada" },
  { label: "Want a rewards Credit Card", value: "Want a rewards Credit Card" },
];
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


const cardTypeList = [
  { label: "Original Plastk Card", value: "1" },
  /* { label: "Canucks Plastk Card", value: "2" }, */
];


export default PersonalInfo = (props) => {

  const myTheme = useTheme();

  const dispatch = useDispatch()

  const signUpData = useSelector(state => state.signUpReducer.signUpDataObject)


  const [errors, setErrors] = useState({})
  const title = useRef('')
  const firstName = useRef('')
  const middleName = useRef('')
  const lastName = useRef('')
  const phoneNumber = useRef('')
  const socialInsuranceNumber = useRef('')
  const email = useRef('')
  const dob = useRef('')
  const card = useRef('')
  const emboss = useRef('')
  const cardType = useRef('')
  const [aboutUs, setAboutUs] = useState('')
  const embossPickerRef = useRef()
  const otherSources = useRef('');

  const [embossOptionsList, setEmbossOptionsList] = useState([])

  const shouldShowRemainingOption = () => {

    if (aboutUs !== undefined || aboutUs !== '') {
      if (aboutUs === 'Other')
        return true
      else {

        return false
      }

    }

  }

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
      signUpDataObject.other_source = otherSources.current.trim()
      signUpDataObject.email = email.current.trim().toLowerCase()
      signUpDataObject.dob = dob.current.toString()
      signUpDataObject.sin = socialInsuranceNumber.current.trim()
      signUpDataObject.how_did_you_hear_about_us = aboutUs
      signUpDataObject.why_do_you_want_the_card = card.current
      signUpDataObject.emboss = emboss.current.trim()
      signUpDataObject.card_type = cardType.current.trim()

      dispatch(updateSignUpDataAction(signUpDataObject))

      Snackbar.dismiss()

      logFireBaseEvent('application_started')
      props.navigation.navigate("AddressStepOne", { signUpData: signUpDataObject })
    }
  }

  useEffect(() => {

    return () => {
      dispatch(resetSignUpDataObjectAction())
      Snackbar.dismiss()
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

    if (card.current === undefined || card.current === '' || card.current === null || card.current.trim() === '')
      validationErrors.card = "Please select an option!"



    if (socialInsuranceNumber.current.trim().length > 0 && socialInsuranceNumber.current.trim().length < 11)
      validationErrors.socialInsuranceNumber = "Social Insurance Number must be 9 characters long!"

    if (lastName.current === undefined || lastName.current === '' || lastName.current.trim() === '' || !lastName.current.trim().match(/^[a-zA-Z\s]*$/))
      validationErrors.lastName = "Please enter Valid Last Name"
    else if (lastName.current.trim().length < 2)
      validationErrors.lastName = "Last name should be at least 2 characters"

    if ((middleName.current !== '' || middleName.current.trim() !== '') && !middleName.current.trim().match(/^[a-zA-Z\s]*$/))
      validationErrors.middleName = "Please enter Valid Middle Name"
    else if (middleName.current.trim().length > 0 && middleName.current.trim().length < 2)
      validationErrors.middleName = "Middle Name must be minimum 2 characters."


    if (emboss.current === '' || emboss.current === null || emboss.current === undefined || emboss.current.trim() === '')
      validationErrors.emboss = "Name that should be on the card should be selected"

    if (dob.current === undefined || dob.current === '' || dob.current === null || dob.current.trim() === '')
      validationErrors.dob = "Please select Date of Birth"
    else {
      const checkAge = getAge(dob.current);
      if (checkAge < 18)
        validationErrors.dob = "You must be 18 years to Apply"
    }
    if (phoneNumber.current === undefined || phoneNumber.current === '' || phoneNumber.current.trim() === '')
      validationErrors.phoneNumber = 'Please Enter your Phone number'
    else if (!phoneNumber.current.trim().match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
      validationErrors.phoneNumber = 'Please Enter Valid Phone Number'

    if (email.current === undefined || email.current === '' || email.current.trim() === '')
      validationErrors.email = "Please enter Email"
    else if (!ValidateEmail(email.current.trim()))
      validationErrors.email = "Please enter valid Email"


    if (cardType.current === '' || cardType.current === null || cardType.current === undefined || cardType.current.trim() === '')
      validationErrors.cardType = "Please select the type of card you want"


    if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
      setErrors(validationErrors)
      return true
    }
    else {
      setErrors(validationErrors)
      return false
    }
  }

  const firstCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  const embossSelection = () => {
    let first_name = (firstName.current != "") ? firstCapitalize(firstName.current).trim() : "";
    let middle_name = (middleName.current != "") ? firstCapitalize(middleName.current).trim() : "";
    let last_name = (lastName.current != "") ? firstCapitalize(lastName.current).trim() : "";

    let options = [];

    try {
      embossPickerRef.current.handleValueChange('', 0)
    }
    catch (error) {
    }


    if (first_name !== "" && last_name !== "") {


      // first _ middle ( initial ) _ last
      if (first_name !== "" && last_name !== "" && middle_name !== "" && (first_name + ' ' + middle_name.split('')[0].toUpperCase() + ' ' + last_name).length < 21) {

        let obj = { label: first_name + ' ' + middle_name.split('')[0].toUpperCase() + ' ' + last_name, value: first_name + ' ' + middle_name.split('')[0].toUpperCase() + ' ' + last_name }
        options.push(obj)
      }


      // first _ middle _ last
      if (first_name !== "" && last_name !== "" && middle_name !== "" && middle_name.length > 1 && (first_name + ' ' + middle_name + ' ' + last_name).length < 21) {
        let obj = { label: first_name + ' ' + middle_name + ' ' + last_name, value: first_name + ' ' + middle_name + ' ' + last_name }
        options.push(obj)

      }

      // first _ last
      if (first_name !== "" && last_name !== "" && (first_name + ' ' + last_name).length < 21) {

        let obj = { label: first_name + ' ' + last_name, value: first_name + ' ' + last_name }

        options.push(obj)
      }

      // middle _ last
      if (last_name !== "" && middle_name !== "" && (middle_name + ' ' + last_name).length < 21) {

        let obj = { label: middle_name + ' ' + last_name, value: middle_name + ' ' + last_name }

        options.push(obj)
      }

      // first (initial) _ middle (initial) _ last
      if (first_name !== "" && last_name !== "" && middle_name !== "" && (first_name.split('')[0].toUpperCase() + ' ' + middle_name.split('')[0].toUpperCase() + ' ' + last_name).length < 21) {

        let obj = { label: first_name.split('')[0].toUpperCase() + ' ' + middle_name.split('')[0].toUpperCase() + ' ' + last_name, value: first_name.split('')[0].toUpperCase() + ' ' + middle_name.split('')[0].toUpperCase() + ' ' + last_name }
        options.push(obj)
      }

      // first (initial) _ last
      if (first_name !== "" && last_name !== "" && (first_name.split('')[0].toUpperCase() + ' ' + last_name).length < 21) {

        let obj = { label: first_name.split('')[0].toUpperCase() + ' ' + last_name, value: first_name.split('')[0].toUpperCase() + ' ' + last_name }

        options.push(obj);
      }

      setEmbossOptionsList(options)
    }
  }


  const cardTypeSelected = (type) => {

    cardType.current = type

    if (type === '2') {
      Snackbar.show({
        text: 'Contest available for BC residents only. Non-BC residents are open to apply for the Original Plastk Card to enter a similar contest.',
        duration: Snackbar.LENGTH_INDEFINITE,
        textColor: 'white',
        numberOfLines: 4,
        backgroundColor: '#ffad0e',
        action: {
          text: 'X',
          textColor: 'white',
          onPress: () => { Snackbar.dismiss() },
        },
      });
    }
  }

  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
      < KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} >
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
              <TextInput icon='person' theme={myTheme} containerStyle={[styles.textInput, {}]} autoCapitalize={'words'} placeholder='First Name*' onChangeText={text => { firstName.current = text; embossSelection() }} maxLength={40} />
              {errors.firstName ? <Text style={styles.errorStyle}>{errors.firstName} </Text> : null}
            </View>
          </View>
          <View style={styles.textInputRow}>
            <View style={{ flex: 0.5 }}>
              <TextInput icon='person' theme={myTheme} containerStyle={styles.textInput} autoCapitalize={'words'} placeholder='Middle Name' onChangeText={text => { middleName.current = text; embossSelection() }} maxLength={40} />
              {errors.middleName ? <Text style={styles.errorStyle}>{errors.middleName} </Text> : null}
            </View>
            <View style={{ flex: 0.5 }}>
              <TextInput icon='person' theme={myTheme} containerStyle={styles.textInput} autoCapitalize={'words'} placeholder='Last Name*' onChangeText={text => { lastName.current = text; embossSelection() }} maxLength={40} />
              {errors.lastName ? <Text style={styles.errorStyle}>{errors.lastName} </Text> : null}
            </View>
          </View>

          <View style={{ marginTop: normalizeY(5) }}>
            <Picker fontawesome='vcard-o' theme={myTheme} ref={embossPickerRef} values={embossOptionsList} placeholder='Select how your name should appear on your card:*' onChange={(val) => emboss.current = val} />
            {errors.emboss ? <Text style={styles.errorStyle}>{errors.emboss} </Text> : null}
          </View>

          <View style={{ marginTop: normalizeY(5) }}>
            <Picker fontawesome='vcard-o' theme={myTheme} values={cardTypeList} placeholder='Please select the Card Type*' onChange={(val) => cardTypeSelected(val)} />
            {errors.cardType ? <Text style={styles.errorStyle}>{errors.cardType} </Text> : null}
          </View>

          <View style={styles.textInputRow}>
            <View style={{ flex: 0.5, }}>
              <TextInput keyboardType='email-address' theme={myTheme} icon='email' containerStyle={styles.textInput} placeholder='Email*' onChangeText={text => email.current = text} maxLength={40} />
              {errors.email ? <Text style={styles.errorStyle}>{errors.email} </Text> : null}
            </View>
            <View style={{ flex: 0.5 }}>
              <MaskedTextInput keyboardType="phone-pad" theme={myTheme} icon='phone' containerStyle={styles.textInput} placeholder='Phone*' mask={"([000]) [000]-[0000]"} onChangeText={(formatted, extracted) => { phoneNumber.current = formatted }} />
              {errors.phoneNumber ? <Text style={styles.errorStyle}>{errors.phoneNumber} </Text> : null}
            </View>
          </View>
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
          <View style={{ marginTop: normalizeY(5) }}>
            <Picker theme={myTheme} fontawesome='vcard-o' values={cardTitles} placeholder='Why Do You Want The Card?*' onChange={(val) => card.current = val} />
            {errors.card ? <Text style={styles.errorStyle}>{errors.card} </Text> : null}
          </View>
          <View style={{ marginTop: normalizeY(5) }}>
            <Picker theme={myTheme} fontawesome='info-circle' values={items} title={aboutUs} placeholder='How Did You Hear About Us?' onChange={(val) => setAboutUs(val)} />
          </View>
          {
            shouldShowRemainingOption() ?

              <View style={{ marginTop: 5 }}>

                <TextInput icon='person' theme={myTheme} containerStyle={[styles.textInput, {}]} autoCapitalize={'words'} placeholder='Other Source' onChangeText={text => { otherSources.current = text; }} maxLength={40} />

              </View> : null
          }
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
    marginTop: normalizeY(4),
    marginBottom: normalizeY(20),
  },
  body: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textInputRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: normalizeY(5)
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