import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import TextInput from '../../../../component/common/TextInput';
import Text from '../../../../component/common/Text';
import { normalizeX, normalizeY } from "../../../../utils/Utils";
import Button from '../../../../component/common/Button'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Picker from "../../../../component/common/Picker";
import { colorRedDC143C } from "../../../../utils/Constants";

import JD from '../../../../utils/Helpers/job_description'


import { useSelector, useDispatch } from 'react-redux'
import { updateSignUpDataAction } from '../SignUpActions/SignUpActions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const statusList = [
  { label: "Employed", value: "Employed" },
  { label: "Self-Employed", value: "Self-Employed" },
  { label: "Retired", value: "Retired" },
  { label: "Student", value: "Student" },
  { label: "Unemployed", value: "Unemployed" },
];

const industryList = [
  { label: "Administrative or Clerical", value: "administrative" },
  { label: "Business or Strategic Management", value: "business" },
  { label: "Construction or Skilled Trades", value: "construction" },
  { label: "Creative or Design", value: "creative" },
  { label: "Customer Support or client Care", value: "customer" },
  { label: "Editorial or Writing", value: "editorial" },
  { label: "Engineering  or Architecture", value: "engineering" },
  { label: "Finance or Insurance", value: "finance" },
  { label: "Food Services or Hospitality", value: "food" },
  { label: "Installation or Maintenance or Repair", value: "installation" },
  { label: "IT", value: "it" },
  { label: "Legal", value: "legal" },
  { label: "Logistics or Transportation", value: "logistics" },
  { label: "Manufacture or Production or Operations", value: "manufacture" },
  { label: "Marketing", value: "marketing" },
  { label: "Medical or Health", value: "medical" },
  { label: "Project or Program Management", value: "projectOrProgramManagement" },
  { label: "Quality Assurance or Safety", value: "qualityAssurance" },
  { label: "Retail Sales or Business Development", value: "retail" },
  { label: "Security or Protective Services", value: "security" },
  { label: "Science or Research and Design", value: "science" },
];

const yearList = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
];
const monthList = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
];

export default EmploymentInfo = (props) => {

  const myTheme = useTheme();

  const dispatch = useDispatch()

  const [updateView, setUpdateView] = useState(false)

  const signUpData = useSelector(state => state.signUpReducer.signUpDataObject)



  const [errors, setErrors] = useState({})
  const [jobStatus, setJobStatus] = useState('')
  const [industry, setIndustry] = useState('')
  const currentEmployer = useRef('')
  const year = useRef('')
  const month = useRef('')
  const jobDescription = useRef('')

  const nextButtonPressed = () => {

    if (isFormValid()) {
      let signUpDataObject = signUpData
      signUpDataObject.employment_status = jobStatus
      signUpDataObject.industry = industry
      signUpDataObject.employment_year = year.current
      signUpDataObject.current_employer = currentEmployer.current.trim()
      signUpDataObject.employment_month = month.current
      signUpDataObject.job_description = (jobDescription.current !== undefined && jobDescription.current !== null) ? jobDescription.current : ''

      dispatch(updateSignUpDataAction(signUpDataObject))

      props.navigation.navigate("FinancialInfoStepOne", { signUpData: signUpDataObject })
    }
  }

  const isFormValid = () => {
    let validationErrors = {}

    if (jobStatus === undefined || jobStatus === '' || jobStatus === null || jobStatus.trim() === '') {
      validationErrors.jobStatus = "Please select employment status"
    }
    if (jobStatus === 'Employed' || jobStatus === 'Self-Employed') {
      if (industry === undefined || industry === '' || industry === null || industry.trim() === '') {
        validationErrors.industry = "Industry is Required"
      }
      if (currentEmployer.current === undefined || currentEmployer.current === '' || currentEmployer.current.trim() === '') {
        validationErrors.currentEmployer = "Current Employer is Required"
      }

      if (jobDescription.current === undefined || jobDescription.current === '' || jobDescription.current === null || jobDescription.current.trim() === '') {
        validationErrors.jobDescription= "Please select job description"
      }
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

    if (signUpData !== '' && signUpData.hasOwnProperty('employment_status') && signUpData.employment_status !== '') {
      setJobStatus(signUpData.employment_status)
      setIndustry(signUpData.industry)
      year.current = signUpData.employment_year
      currentEmployer.current = signUpData.current_employer
      month.current = signUpData.employment_month
      jobDescription.current = signUpData.job_description

      setUpdateView(!updateView)
    }

  }, [])


  const shouldShowIndusrtyOption = () => {

    if (jobStatus !== undefined || jobStatus !== '') {
      if (jobStatus === 'Employed' || jobStatus === 'Self-Employed')
        return true
      else {
        if (industry !== '')
          setIndustry('')
        return false
      }

    }
    return false
  }
  const shouldShowRemainingFields = () => {

    if (industry === '' || industry === undefined || industry === null) {
      return false
    }
    return true
  }

  const getJobDescriptionList = () => {

    if (industry === null || industry === undefined)
      return []

    let response = JD[industry]

    let returnArray = response.map(item => {

      let returnedObject = {}

      returnedObject.value = item
      returnedObject.label = item

      return returnedObject

    })

    return returnArray

  }


  const getIndustryLabel = () => {

    for (const item of industryList) {

      if (item.value === industry)
        return item.label

    }
  }

  return (
    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.personalInfoContainer}>
          <Text color={myTheme.colors.LABEL_COLOR}>Employment Information</Text>
        </View>
        <View style={styles.body}>
          <View>
            <Picker icon="edit" theme={myTheme} values={statusList} title={jobStatus} placeholder='Select Status*' onChange={(val) => setJobStatus(val)} />
            {errors.jobStatus ? <Text style={styles.errorStyle}>{errors.jobStatus} </Text> : null}
          </View>
          {shouldShowIndusrtyOption() ?
            <>
              <View>
                <Picker fontawesome="industry" theme={myTheme} containerStyle={styles.picker} title={getIndustryLabel()} values={industryList} placeholder='Select Industry*' onChange={(val) => setIndustry(val)} />
                {errors.industry ? <Text style={styles.errorStyle}>{errors.industry} </Text> : null}
              </View>
              {shouldShowRemainingFields() ?
                <>
                  <View>
                    <Picker theme={myTheme} icon="description" containerStyle={styles.picker} title={jobDescription.current} values={getJobDescriptionList()} placeholder='Select Job Description*' onChange={(val) => jobDescription.current = val} />
                    {errors.jobDescription ? <Text style={styles.errorStyle}>{errors.jobDescription} </Text> : null}
                  </View>
                  <View>
                    <TextInput icon="person" theme={myTheme} containerStyle={styles.picker} defaultValue={currentEmployer.current} placeholder='Current Employer*' onChangeText={text => currentEmployer.current = text} />
                    {errors.currentEmployer ? <Text style={styles.errorStyle}>{errors.currentEmployer} </Text> : null}
                  </View>
                  <View>
                    <Picker icon="date-range" theme={myTheme} containerStyle={styles.picker} title={year.current} values={yearList} placeholder='Select Year' onChange={(val) => year.current = val} />
                  </View>
                  <View>
                    <Picker icon="date-range" theme={myTheme} containerStyle={styles.picker} title={month.current} values={monthList} placeholder='Select Month' onChange={(val) => month.current = val} />
                  </View>
                </>
                : null
              }
            </>
            : null
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
  body: {
    marginTop: normalizeY(45),
    justifyContent: 'space-between'
  },
  personalInfoContainer: {
    alignItems: "center",
    marginTop: normalizeY(4)
  },
  picker: {
    marginTop: normalizeY(20)
  },
  errorStyle: {
    color: colorRedDC143C,
    fontSize: 11,
    marginTop: 2
  }
})