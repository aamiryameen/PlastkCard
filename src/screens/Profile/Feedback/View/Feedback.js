import React, { useRef, useState } from "react";
import {
    View,
    TextInput,
    StatusBar,
    StyleSheet,
    ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import signUpScreenStyles from "../../../SignUp/SignUpStyle";
import { useTheme } from '@react-navigation/native'
import { logFireBaseEvent, normalizeX, normalizeY } from '../../../../utils/Utils'
import Button from '../../../../component/common/Button'
import { fetchFeedback, resetFeedback } from '../../../Profile/Feedback/Actions/FeedbackActions'
import Picker from "../../../../component/common/Picker";
import Text from '../../../../component/common/Text'
import Modal from '../../../../component/common/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { colorRedDC143C, mulish_bold } from "../../../../utils/Constants";
import CustomLoader from "../../../../component/common/CustomLoader";



const items = [
    { label: "App", value: "App" },
    { label: "Service", value: "Service" },
    { label: "Features", value: "Feature" },
]

export default Feedback = (props) => {

    const [feedback, setFeedback] = useState('')
    const feedbackItems = useRef('');
    const myTheme = useTheme();

    const [validationErrors, setValidationErrors] = useState([])

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.FeedbackReducer.isLoading)
    const response = useSelector(state => state.FeedbackReducer.response)
    const isError = useSelector(state => state.FeedbackReducer.isError)

    const nextButtonPressed = () => {

        if (isFormValid()) {
            let feedbackDataObject = {}

            feedbackDataObject.feedback_type = feedbackItems.current
            feedbackDataObject.feedback_text = feedback

            dispatch(fetchFeedback(feedbackDataObject))
        }

    }

    const isFormValid = () => {

        let errors = {}
        if (feedbackItems.current === null || feedbackItems.current === undefined || feedbackItems.current === '') {
            errors.feedbackType = 'Please select feedback type'
        }

        if (feedback === null || feedback === '' || feedback === undefined) {
            errors.feedback = 'Please enter feedback'
        }

        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            setValidationErrors(errors)
            return true
        }
        else {
            setValidationErrors(errors)
            return false
        }
    }

    const showMessage = () => {

        if (response) {

            if (isError) {

                return (
                    <Modal responseMessage={response.message} modalType="error" onPress={() => dispatch(resetFeedback())} />
                )
            }
            else {

                logFireBaseEvent('feedback_submitted')
                return (
                    <Modal responseMessage={response.message} modalType="success" onPress={() => resetState()} />
                )
            }
        }
    }

    const resetState = () => {
        props.navigation.goBack();
        dispatch(resetFeedback())
    }

    return (

        <LinearGradient colors={[myTheme.colors.GRADIENT_FIRST_COLOR, myTheme.colors.GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>
                <View style={{ flex: 1, marginHorizontal: normalizeX(20) }} >

                    <Text style={[styles.typeText, { color: myTheme.colors.LABEL_COLOR, }]}>Type</Text>

                    <Picker containerStyle={{ width: "100%", borderBottomWidth: 0 }} title='Select Feedback Type'

                        style={{ borderBottomWidth: 0 }}
                        theme={myTheme} downIcon="down" values={items} onChange={(val) => feedbackItems.current = val} />

                    {validationErrors.feedbackType ? <Text style={styles.errorStyle}>{validationErrors.feedbackType} </Text> : null}

                    <View style={styles.textinputContainer}>
                        <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR }}>Message</Text>
                        <TextInput
                            placeholder="Type your message here......."
                            placeholderTextColor={myTheme.colors.LABEL_COLOR}
                            style={{ width: "100%", fontSize: 15, color: myTheme.colors.LABEL_COLOR }}
                            autoCapitalize="none"
                            maxLength={500}
                            multiline={true}
                            onChangeText={(val) => setFeedback(val)}
                        />

                        <View style={[signUpScreenStyles.border_text_style, { marginRight: normalizeX(10), borderColor: myTheme.colors.TEXTINPUT_LABEL_COLOR }]} ></View>

                        {validationErrors.feedback ? <Text style={styles.errorStyle}>{validationErrors.feedback} </Text> : null}

                    </View>

                    <View style={[signUpScreenStyles.button, { marginTop: 15, paddingTop: 20 }]} >
                        <Button style={styles.buttonStyle} title="Confirm" onPress={() => nextButtonPressed()} title="Confirm" />
                    </View>

                </View>
            </ScrollView>

            { isLoading ?
                <CustomLoader/> : null
            }

            {showMessage()}

        </LinearGradient>
    )
}


const styles = StyleSheet.create({

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    typeText: {
        fontFamily: mulish_bold,
        fontSize: 18,
        marginLeft: 3,
        marginTop: normalizeY(30)
    },
    pickerContainer: {
        flexDirection: "row", justifyContent: "center",
        marginVertical: normalizeY(5), height: 50, alignItems: "center",
        elevation: 3,
        borderRadius: 10
    },
    textinputContainer: {
        flex: 1,
        marginTop: normalizeY(10),
        paddingTop: normalizeY(30)
    },

    buttonStyle: {
        marginTop: 10,
        width: "100%",
        marginBottom: 30
    },
    errorStyle: {
        color: colorRedDC143C,
        fontSize: 11,
        marginTop: 3
    },
})