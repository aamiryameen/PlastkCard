import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import TextInput from '../../../../component/common/TextInput';
import Text from '../../../../component/common/Text';
import { normalizeX, normalizeY } from "../../../../utils/Utils";
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Picker from "../../../../component/common/Picker";
import { colorRedDC143C, GOOGLE_PLACES_API_KEY } from "../../../../utils/Constants";

import { useSelector, useDispatch } from 'react-redux'
import { updateSignUpDataAction } from '../SignUpActions/SignUpActions'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const titles = [
  { label: 'Alberta', value: 'AB' },
  { label: 'British Columbia', value: 'BC' },
  { label: 'Manitoba', value: 'MB' },
  { label: 'New Brunswick', value: 'NB' },
  { label: 'Newfoundland and Labrador', value: 'NL' },
  { label: 'Nova Scotia', value: 'NS' },
  { label: 'Northwest Territories', value: 'NT' },
  { label: 'Nunavut', value: 'NU' },
  { label: 'Ontario', value: 'ON' },
  { label: 'Prince Edward Island', value: 'PE' },
  { label: 'Saskatchewan', value: 'SK' },
  { label: 'Yukon', value: 'YT' },
];

export default Address = (props) => {

  const myTheme = useTheme();

  const dispatch = useDispatch()

  const [updateView, setUpdateView] = useState(false)

  const signUpData = useSelector(state => state.signUpReducer.signUpDataObject)

  const [errors, setErrors] = useState({})
  const streetAddress = useRef('')
  const suite = useRef('')
  const city = useRef('')
  const province = useRef('')
  const postalCode = useRef('')

  const nextButtonPressed = () => {

    if (isFormValid()) {
      let signUpDataObject = signUpData

      signUpDataObject.street_address = streetAddress.current.trim()
      signUpDataObject.suite_number = suite.current.trim()
      signUpDataObject.city = city.current.trim()
      signUpDataObject.province = province.current
      signUpDataObject.postal_code = postalCode.current.trim()

      dispatch(updateSignUpDataAction(signUpDataObject))

      props.navigation.navigate("EmploymentInfoStepOne", { signUpData: signUpDataObject })
    }
  }


  useEffect(() => {

    if (signUpData !== '' && signUpData.hasOwnProperty('street_address') && signUpData.street_address !== '') {
      streetAddress.current = signUpData.street_address
      suite.current = signUpData.suite_number
      city.current = signUpData.city
      province.current = signUpData.province
      postalCode.current = signUpData.postal_code

      setUpdateView(!updateView)
    }

  }, [])

  const isFormValid = () => {

    let validationErrors = {}
    if (streetAddress.current === undefined || streetAddress.current === '' || streetAddress.current.trim() === '') {
      validationErrors.streetAddress = "Street Address is required"
    }
    if (city.current === undefined || city.current === '' || city.current.trim() === '') {
      validationErrors.city = "City is required"
    }
    if (province.current === undefined || province.current === '' || province.current === null || province.current.trim() === '') {
      validationErrors.province = "Province is required"
    }
    if (postalCode.current === undefined || postalCode.current.trim() === '') {
      validationErrors.postalCode = "Postal Code is required"
    }
    else if (!postalCode.current.trim().match(/([A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9])+$/)) {
      validationErrors.postalCode = "Valid Postal Code is required"
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

  const parseAddress = (data, details) => {
    try {

      postalCode.current = ''
      streetAddress.current = ''
      city.current = ''
      province.current = ''

      let address = data.description

      let splitted = address.split(',')

      if (splitted[2].trim() === 'QC' || splitted[2].toLowerCase() === 'Quebec') {

        let validationErrors = {}
        validationErrors.googleAddress = "Plastk Secured Credit Card service is not available in Quebec at this time."
        setErrors(validationErrors)

      } else {

        let validationErrors = {}
        setErrors(validationErrors)

        streetAddress.current = splitted[0].trim()

        city.current = splitted[1].trim()
        province.current = splitted[2].trim()

        try {
          details.address_components.map((element, index) => {

            element.types.map((item, index) => {

              if (item === 'postal_code') {

                postalCode.current = element.long_name.split(' ').join('')

                try {

                  if (postalCode.current.length < 6) {
                    postalCode.current = ''
                  }
                }
                catch (error) {
                  postalCode.current = ''
                }

              }

            })

          })
        } catch (err) {

          console.log(err)

        }
      }
    }
    catch (error) {

      postalCode.current = ''
      streetAddress.current = ''
      city.current = ''
      province.current = ''

      console.log(error)

    }


    setUpdateView(!updateView)
  }

  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.personalInfoContainer}>
          <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Address</Text>
        </View>
        <View style={styles.body}>

          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'grey', }}>

            <GooglePlacesAutocomplete
              placeholder='Enter Address'
              nearbyPlacesAPI='GoogleReverseGeocoding'
              type='geocode'
              fetchDetails={true}
              onPress={(data, details = null) => {

                parseAddress(data, details)
              }}
              textInputProps={{
                placeholderTextColor: myTheme.colors.TEXTINPUT_LABEL_COLOR,
              }}
              styles={{
                textInputContainer: {

                },
                textInput: {
                  height: 38,
                  color: myTheme.colors.LABEL_COLOR,
                  fontSize: 16,
                  backgroundColor: 'transparent',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
                components: 'country:ca',
                types: 'geocode',
              }}
            />

            {errors.googleAddress ? <Text style={styles.errorStyle}>{errors.googleAddress} </Text> : null}
          </View>

          <View style={{ marginTop: normalizeY(30) }}>
            <TextInput icon='location-on' theme={myTheme} placeholder='Street Address*' defaultValue={streetAddress.current} onChangeText={text => streetAddress.current = text} maxLength={46} />
            {errors.streetAddress ? <Text style={styles.errorStyle}>{errors.streetAddress} </Text> : null}
          </View>
          <View style={{ marginTop: normalizeY(10) }}>
            <TextInput theme={myTheme} materialCommunityIcons='seat-individual-suite' defaultValue={suite.current} placeholder='Suite' onChangeText={text => suite.current = text} maxLength={46} />
          </View>
          <View style={{ marginTop: normalizeY(10) }}>
            <TextInput theme={myTheme} icon='location-city' placeholder='City*' defaultValue={city.current} onChangeText={text => city.current = text} maxLength={50} />
            {errors.city ? <Text style={styles.errorStyle}>{errors.city} </Text> : null}
          </View>
          <View style={{ marginTop: normalizeY(10) }}>
            <Picker icon="location-city" theme={myTheme} values={titles} title={province.current} placeholder='Province*' onChange={(val) => province.current = val} />
            {errors.province ? <Text style={styles.errorStyle}>{errors.province} </Text> : null}
          </View>
          <View style={{ marginTop: normalizeY(10) }}>
            <TextInput theme={myTheme} icon='location-city' placeholder='Postal Code*' defaultValue={postalCode.current} onChangeText={text => postalCode.current = text} maxLength={6} />
            {errors.postalCode ? <Text style={styles.errorStyle}>{errors.postalCode} </Text> : null}
          </View>
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
  body: {
    flex: 1,
    marginTop: normalizeY(25),
    justifyContent: "space-between",

  },
  personalInfoContainer: {
    alignItems: "center",
    marginTop: normalizeY(4)
  },
  errorStyle: {
    color: colorRedDC143C,
    fontSize: 11,
    marginTop: 2
  }
})