import React, { useState, useEffect, useRef } from 'react'

import { View, StyleSheet, ScrollView } from 'react-native'
import Text from '../../../../component/common/Text'
import TextInput from '../../../../component/common/TextInput'
import Picker from '../../../../component/common/Picker'
import Button from '../../../../component/common/Button'

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux'
import { logFireBaseEvent, normalizeX, normalizeY } from '../../../../utils/Utils'

import JD from '../../../../utils/Helpers/job_description'
import { colorRedDC143C, setAuthenticationToken } from '../../../../utils/Constants'
import { fcsApplyforPlastkPressedAction, fcsResetApplyPlastkAction } from '../Actions/FCSGetCardActions'
import Modal from '../../../../component/common/Modal'
import { signInSuccess } from '../../../Splash/Action/SplashAction'
import CustomLoader from '../../../../component/common/CustomLoader'
import NotchView from '../../../../component/common/NotchView'




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

const titles = [{
    label: "Yes",
    value: 'Yes'
}, {
    label: 'No',
    value: 'No'
}];

const cardTitles = [
    { label: "to Rebuild your Credit", value: "Rebuild your Credit" },
    { label: "New to Canada", value: "New to Canada" },
    { label: "Want a rewards Credit Card", value: "Want a rewards Credit Card" },
];


export default FCSGetCardScreen = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const statusResponse = useSelector(state => state.fcsDashBoardReducer.response)

    const response = useSelector(state => state.fcsGetCardReducer.response)
    const isLoading = useSelector(state => state.fcsGetCardReducer.isLoading)

    const emboss = useRef('')
    const [embossOptionsList, setEmbossOptionsList] = useState([])

    const card = useRef('')

    const [jobStatus, setJobStatus] = useState('')
    const [industry, setIndustry] = useState('')
    const currentEmployer = useRef('')
    const year = useRef('')
    const month = useRef('')
    const jobDescription = useRef('')

    const creditLimit = useRef('')
    const annualSalary = useRef('')
    const otherIncome = useRef('')
    const selectMortgage = useRef('')
    const monthlyRentMortgage = useRef('')


    useEffect(() => {

        embossSelection()

    }, [])


    const submitButtonPressed = () => {

        if (isFormValid()) {

            let signUpDataObject = {}

            signUpDataObject.emboss = emboss.current.trim()
            signUpDataObject.why_do_you_want_the_card = card.current
            signUpDataObject.employment_status = jobStatus
            signUpDataObject.industry = industry
            signUpDataObject.employment_year = year.current
            signUpDataObject.current_employer = currentEmployer.current.trim()
            signUpDataObject.employment_month = month.current
            signUpDataObject.job_description = (jobDescription.current !== undefined && jobDescription.current !== null) ? jobDescription.current : ''


            signUpDataObject.credit_limit = creditLimit.current.trim()
            signUpDataObject.annual_salary_before_tax = annualSalary.current.trim()
            signUpDataObject.other_house_income = otherIncome.current.trim()
            signUpDataObject.mortgage = selectMortgage.current
            signUpDataObject.rent_on_mortgage = monthlyRentMortgage.current

            dispatch(fcsApplyforPlastkPressedAction(signUpDataObject))


        }
    }

    const isFormValid = () => {

        let validationErrors = {}

        if (emboss.current === '' || emboss.current === null || emboss.current === undefined || emboss.current.trim() === '')
            validationErrors.emboss = "Name that should be on the card should be selected"


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
        }

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


        if (card.current === undefined || card.current === '' || card.current === null || card.current.trim() === '')
            validationErrors.card = "Please select an option!"



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
        let first_name = (statusResponse.user.first_name != "") ? firstCapitalize(statusResponse.user.first_name).trim() : "";
        let middle_name = (statusResponse.user.middle_name != "") ? firstCapitalize(statusResponse.user.middle_name).trim() : "";
        let last_name = (statusResponse.user.last_name != "") ? firstCapitalize(statusResponse.user.last_name).trim() : "";

        let options = [];


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


    const handleResponse = () => {

        if (response) {
            if (response.success) {

                setAuthenticationToken(response.token)

                logFireBaseEvent('fcs_plastk_card_applied')

                dispatch(signInSuccess('cardHolder'))


            } else {

                <Modal responseMessage={response.message} modalType="error" onPress={() => fcsResetApplyPlastkAction()} />
            }
        }
    }




    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
            <NotchView />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.personalInfoContainer}>
                    <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Personal Information</Text>
                </View>

                <View>
                    <Picker fontawesome='vcard-o' theme={myTheme} values={embossOptionsList} placeholder='Select how your name should appear on your card:*' onChange={(val) => emboss.current = val} />
                    {errors.emboss ? <Text style={styles.errorStyle}>{errors.emboss} </Text> : null}
                </View>

                <View style={{ marginVertical: normalizeY(10) }}>
                    <Picker theme={myTheme} fontawesome='vcard-o' values={cardTitles} placeholder='Why Do You Want The Card?*' onChange={(val) => card.current = val} />
                    {errors.cardType ? <Text style={styles.errorStyle}>{errors.cardType} </Text> : null}
                </View>


                <View style={styles.personalInfoContainer}>
                    <Text color={myTheme.colors.LABEL_COLOR} style={styles.personalInfo}>Employment Information</Text>
                </View>

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
                                    <Picker theme={myTheme} icon="description" containerStyle={styles.picker} title={jobDescription.current} values={getJobDescriptionList()} placeholder='Select Job Description' onChange={(val) => jobDescription.current = val} />
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
                </View>
                <Button style={{ marginVertical: normalizeY(20) }} title="Submit" onPress={() => submitButtonPressed()} />

                {isLoading &&
                    <CustomLoader />}

                {handleResponse()}


            </ScrollView>
        </LinearGradient>
    )
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
    errorStyle: {
        color: colorRedDC143C,
        fontSize: 11,
        marginTop: 2
    },
})
