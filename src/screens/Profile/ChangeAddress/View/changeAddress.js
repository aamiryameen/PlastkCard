import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { logFireBaseEvent, normalizeX, normalizeY } from "../../../../utils/Utils";
import { useSelector, useDispatch } from 'react-redux';
import Text from '../../../../component/common/Text';
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import { colorRedDC143C, getIsFreeUser } from "../../../../utils/Constants";
import TextInput from '../../../../component/common/TextInput'
import DatePicker from '../../../../component/common/DatePicker'
import MaskedTextInput from '../../../../component/common/MaskedTextInput'
import Picker from "../../../../component/common/Picker";
import { perfromChangeAddress, resetChangeAddress } from '../../ChangeAddress/Actions/changeAddressActions'
import Modal from '../../../../component/common/Modal'
import CustomLoader from '../../../../component/common/CustomLoader'
import { getAccountStatusAction } from "../../../Status/action/StatusAction";
import Toast from 'react-native-simple-toast';
import DialogModal from '../../../../component/common/DialogModal'
import { fcsGetStatusAction } from "../../../FreeCreditScore/FCSDashBoard/Actions/FCSDashBoardActions";

const titles = [
  { label: 'AB', value: 'AB' },
  { label: 'BC', value: 'BC' },
  { label: 'MB', value: 'MB' },
  { label: 'NB', value: 'NB' },
  { label: 'NL', value: 'NL' },
  { label: 'NS', value: 'NS' },
  { label: 'NT', value: 'NT' },
  { label: 'NU', value: 'NU' },
  { label: 'ON', value: 'ON' },
  { label: 'PE', value: 'PE' },
  { label: 'SK', value: 'SK' },
  { label: 'YT', value: 'YT' },
];


export default changeAddress = (props) => {


  const isLoading = useSelector(state => state.changeAddressReducer.isLoading)
  const changeAddressResponse = useSelector(state => state.changeAddressReducer.response)
  const isError = useSelector(state => state.changeAddressReducer.isError)

  const dispatch = useDispatch()

  const [errors, setErrors] = useState({})
  const [editEnable, setEditEnable] = useState(false)

  const response = getIsFreeUser() ? useSelector(state => state.fcsDashBoardReducer.response) : useSelector(state => state.accountStatusReducer.response)
  const myTheme = useTheme();
  const dob = useRef('')
  const phoneNumber = useRef('')
  const streetAddress = useRef('')
  const suite = useRef('')
  const city = useRef('')
  const province = useRef('')
  const postalCode = useRef('')
  const socialInsuranceNumber = useRef('')

  const isBackOverRiddenRef = useRef(false)

  const [showDialogModal, setShouldShowDialogModal] = useState(false)



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

  useEffect(() => {

    dob.current = response.user.dob
    phoneNumber.current = response.user.phone_number
    streetAddress.current = response.user.street_address
    city.current = response.user.city
    province.current = response.user.province
    postalCode.current = response.user.postal_code
    socialInsuranceNumber.current = response.user.sin


    props.navigation.addListener('beforeRemove', (e) => {

      if (isBackOverRiddenRef.current === false) {

        isBackOverRiddenRef.current = true
        e.preventDefault();

        props.navigation.navigate( getIsFreeUser() ? 'FCSDashBoard' : 'MyCredit')
      }

    })



  }, [])

  const updatedButtonPressed = () => {

    if (isFormValid()) {

      let signUpDataObject = {}
     
      signUpDataObject.dob = dob.current.toString()
      

      dispatch(perfromChangeAddress(signUpDataObject, response.user.email))

    }
  }

  const showMessage = () => {

    if (changeAddressResponse) {
      if (isError) {
        return (
          <Modal responseMessage={changeAddressResponse.message} modalType="error" onPress={() => dispatch(resetChangeAddress())} />
        )
      }
      else {

        logFireBaseEvent('address_updated')

        Toast.showWithGravity('Your details have been updated.', Toast.LONG, Toast.TOP);

        setEditEnable(false)

        dispatch(resetChangeAddress())

        if(getIsFreeUser())
          dispatch(fcsGetStatusAction())
        else
          dispatch(getAccountStatusAction())

        
      }
    }


  }

  const isFormValid = () => {

    let validationErrors = {}

    if (dob.current === undefined || dob.current === '' || dob.current === null || dob.current.trim() === '')
      validationErrors.dob = "Please select Date of Birth"
    else {
      const checkAge = getAge(dob.current);
      if (checkAge < 18)
        validationErrors.dob = "You must be 18 years to Apply"
    }
    if (phoneNumber.current === undefined || phoneNumber.current === '' || phoneNumber.current.trim() === '' || !phoneNumber.current.trim().match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
      validationErrors.phoneNumber = "Please enter Valid Phone Number"
    if (streetAddress.current === undefined || streetAddress.current === '' || streetAddress.current.trim() === '') {
      validationErrors.streetAddress = "Street Address is required"
    }
    if (city.current === undefined || city.current === '' || city.current.trim() === '') {
      validationErrors.city = "City is required"
    }
    if (province.current === undefined || province.current === '' || province.current === null || province.current.trim() === '') {
      validationErrors.province = "Province is required"
    }
    if (postalCode.current === undefined || province.current === '' || province.current === null || postalCode.current.trim() === '') {
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


  const approveButtonPressed = () => {

    setTimeout(() => {
      props.navigation.navigate('EquifaxVerification', { equifax_status: props.route.params.equifax_status })
    }, 100);

  }

  const positiveButtonPressed = () => {

    setShouldShowDialogModal(false)

    approveButtonPressed()

    
}

const negativeButtonPressed = () => {

   setShouldShowDialogModal(false)

}

  const handleModal = () => {
    if(showDialogModal){

      return (<DialogModal message={'You are confirming that all of the information is correct. Please note that once you have confirmed, this cannot be undone.'} modalType='interactive' buttons={['Confirm', 'Cancel']}
                positiveButtonPressed={positiveButtonPressed} negativeButtonPressed={negativeButtonPressed} hideOnClick={true} />)

    }
  }


  return (

    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
      style={{ flex: 1 }}>

      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>

        <View style={styles.body}>

          <View style={styles.inputContainer}>
            <TextInput icon='person' placeholder='First Name' isEditable={false} theme={myTheme} defaultValue={response.user.first_name} />

          </View>

          <View style={styles.inputContainer}>
            <TextInput icon='person' placeholder='Last Name' isEditable={false} theme={myTheme} defaultValue={response.user.last_name} />

          </View>
          <View style={styles.inputContainer}>
            <MaskedTextInput icon='phone' placeholder='Phone Number' keyboardType="phone-pad" mask={"([000]) [000]-[0000]"} isEditable={false} theme={myTheme} defaultValue={response.user.phone_number} onChangeText={(formatted, extracted) => { phoneNumber.current = formatted }} />
            {errors.phoneNumber ? <Text style={styles.errorStyle}>{errors.phoneNumber} </Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <DatePicker theme={myTheme} placeholder='Date of Birth' onChange={(val) => dob.current = val} dateVisible={editEnable} defaultValue={response.user.dob} />
            {errors.dob ? <Text style={styles.errorStyle}>{errors.dob} </Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <MaskedTextInput theme={myTheme} keyboardType="phone-pad" fontawesome='id-card' isEditable={false} defaultValue={response.user.sin} placeholder='Social Insurance Number' mask={"[000]-[000]-[000]"} onChangeText={(formatted, extracted) => { socialInsuranceNumber.current = formatted }} />
            {errors.socialInsuranceNumber ? <Text style={styles.errorStyle}>{errors.socialInsuranceNumber} </Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput icon='location-on' placeholder='Address' isEditable={false} theme={myTheme} defaultValue={response.user.street_address} onChangeText={text => streetAddress.current = text} maxLength={46} />
            {errors.streetAddress ? <Text style={styles.errorStyle}>{errors.streetAddress} </Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput materialCommunityIcons='seat-individual-suite' placeholder='Suite Number' isEditable={false} theme={myTheme} defaultValue={response.user.suite_number} onChangeText={text => suite.current = text} maxLength={46} />

          </View>
          <View style={styles.inputContainer}>
            <TextInput icon='location-city' placeholder='City' isEditable={false} theme={myTheme} defaultValue={response.user.city} onChangeText={text => city.current = text} maxLength={50} />
            {errors.city ? <Text style={styles.errorStyle}>{errors.city} </Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <Picker icon="location-city" theme={myTheme} disablePicker={true} values={titles} title={response.user.province} placeholder='Province' onChange={(val) => province.current = val} />
            {errors.province ? <Text style={styles.errorStyle}>{errors.province} </Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput icon="location-city" placeholder='Postal Code' isEditable={false} theme={myTheme} defaultValue={response.user.postal_code} onChangeText={text => postalCode.current = text} maxLength={6} />
            {errors.postalCode ? <Text style={styles.errorStyle}>{errors.postalCode} </Text> : null}
          </View>

          {editEnable ? <Button style={{ width: "100%", marginTop: normalizeY(30) }} title="Update" onPress={() => updatedButtonPressed()} />
            : <Button style={{ width: "100%", marginTop: normalizeY(30) }} onPress={() => {setEditEnable(true); Toast.showWithGravity('You can only update Date Of Birth', Toast.LONG, Toast.TOP);}} title="Edit" />
          }

          {!editEnable ? (props.route.params && props.route.params.hasOwnProperty('equifax_status')) &&
            <Button style={{ width: "100%", marginTop: normalizeY(30) }} title="Confirm" onPress={() => setShouldShowDialogModal(true)} />
            : null
          }

        </View>

      </ScrollView>

      { isLoading ?
        <CustomLoader /> : null
      }

      {showMessage()}
      {handleModal()}

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  body: {
    marginHorizontal: normalizeX(20),
    marginTop: normalizeY(14),
    marginBottom: normalizeY(10),
    flex: 1
  },
  inputContainer: {
    marginTop: normalizeY(20)
  },
  errorStyle: {
    color: colorRedDC143C,
    fontSize: 11,
    marginTop: 2
  }

})

