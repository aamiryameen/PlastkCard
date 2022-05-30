import React, { useEffect, useState, useRef } from 'react'

import { View, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import CustomLoader from '../../../../component/common/CustomLoader'
import { fetchEIDQuestionsAction, resetEIDVerificationAction, startEIDVerificationAction, submitAnswersAction } from '../Actions/EquifaxActions';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { colorRedDC143C, getIsFreeUser, isIOS, ligh_green, SCREEN_WIDTH } from '../../../../utils/Constants';

import Text from '../../../../component/common/Text'
import Button from '../../../../component/common/Button'

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getAccountStatusAction } from '../../../Status/action/StatusAction';
import { fcsGetStatusAction } from '../../../FreeCreditScore/FCSDashBoard/Actions/FCSDashBoardActions';

export default equifaxVerification = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.equifaxReducer.isLoading)
    const answersResponse = useSelector(state => state.equifaxReducer.answersResponse)
    const questionsResponse = useSelector(state => state.equifaxReducer.questionsResponse)
    const questionsList = useSelector(state => state.equifaxReducer.questionsList)


    const answersObjectRef = useRef('')
    const percentCalculatorRef = useRef(0)

    const [updateView, setUpdateView] = useState(false)

    const isAccountStatusUpdatedRef = useRef(false)


    useEffect(() => {
        if (props.route.params.equifax_status === 'Not Verified') {

            if (getIsFreeUser())
                logFireBaseEvent('fcs_eid_verification_started')
            else
                logFireBaseEvent('eid_verification_started')

            dispatch(startEIDVerificationAction())
        } else if (props.route.params.equifax_status === 'Processing') {

            if (getIsFreeUser())
                logFireBaseEvent('fcs_eid_verification_in_progress')
            else
                logFireBaseEvent('eid_verification_in_progress')

            dispatch(fetchEIDQuestionsAction())
        }

        return function cleanUp() {
            dispatch(resetEIDVerificationAction())
        }
    }, [])

    const percentCalculator = () => {

        return (
            <Text style={{ color: myTheme.colors.LABEL_COLOR }}>{percentCalculatorRef.current + ` %`}</Text>
        )
    }

    const answerPressed = (answer, question) => {

        let obj = {}

        if (Object.keys(answersObjectRef.current).length === 0) {
            obj = { "values": {} }
        }
        else {
            obj = answersObjectRef.current
        }

        obj.values[question.item.question_id] = answer.attributes.answerId

        answersObjectRef.current = obj

        percentCalculatorRef.current = (Object.keys(answersObjectRef.current.values).length / questionsList.length) * 100

        setUpdateView(!updateView)

    }


    const renderItem = (item) => {

        return (

            <View style={styles.carouselItemContainer}>
                <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.linearGradientContainerStyle}>

                    <View style={{ marginTop: normalizeY(20), marginHorizontal: normalizeX(20) }}>

                        <Text style={{ color: myTheme.colors.LABEL_COLOR, fontWeight: '700', fontSize: normalizeFont(16), marginBottom: normalizeY(10) }}>{`Q` + item.item.question_id + `.`} {item.item.question_text}</Text>

                        {renderAnswers(item)}

                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: normalizeY(10) }}>

                            <AnimatedCircularProgress
                                size={80}
                                width={15}
                                fill={percentCalculatorRef.current}
                                tintColor={ligh_green}
                                backgroundColor="#3d5875"
                                children={percentCalculator} />

                        </View>

                    </View>

                </LinearGradient>
            </View>
        )
    }

    const renderAnswers = (item) => {

        return item.item.options.map((answer, index) => {

            let selectedAnswer = ''

            if (answersObjectRef.current !== {} && answersObjectRef.current.hasOwnProperty('values')) {
                selectedAnswer = answersObjectRef.current.values[item.item.question_id]
            }

            const checked = selectedAnswer === undefined ? false : (selectedAnswer === answer.attributes.answerId) ? true : false;

            return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginVertical: normalizeY(5) }} onPress={() => answerPressed(answer, item)}>
                    <View style={styles.checkbox}>
                        {checked && <View style={styles.checkboxSelectionCircle} />}
                    </View>
                    <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }}> {answer.value}</Text>
                </TouchableOpacity>
            )
        })
    }


    const handleResponse = () => {

        if (answersResponse) {

            if (answersResponse.message === 'Equifax Verification Failed' || answersResponse.success === false) {
                if (getIsFreeUser())
                    logFireBaseEvent('fcs_eid_verification_failure')
                else
                    logFireBaseEvent('eid_verification_failure')

                props.navigation.navigate('eidVerificationFailure')
            }

            else if (answersResponse.message === 'Equifax Verification Completed' || answersResponse.success)
                props.navigation.navigate('eidVerificationSuccess')


        }
        if (questionsResponse) {

            if (questionsResponse.success === false) {
                props.navigation.navigate('eidVerificationFailure')
            } else {
                if (questionsResponse.questions !== null && questionsResponse.questions !== undefined) {

                    if (isAccountStatusUpdatedRef.current === false && props.route.params.equifax_status === 'Not Verified') {

                        if (getIsFreeUser())
                            dispatch(fcsGetStatusAction())
                        else
                            dispatch(getAccountStatusAction())
                        isAccountStatusUpdatedRef.current = true
                    }

                    return (
                        <View>
                            <Carousel
                                data={questionsList}
                                renderItem={(item) => renderItem(item)}
                                layout={'stack'}
                                firstItem={isIOS ? 0 : questionsList.length - 1}
                                loop={false}
                                sliderWidth={SCREEN_WIDTH}
                                itemWidth={SCREEN_WIDTH - 40}
                                contentContainerCustomStyle={{ paddingVertical: 10 }}
                                layoutCardOffset={11}
                            />
                        </View>
                    )
                } else {
                    props.navigation.navigate('eidVerificationFailure')
                }
            }
        }
    }


    const submitButtonPressed = () => {

        dispatch(submitAnswersAction(answersObjectRef.current))

    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}  >

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            {isLoading &&
                <CustomLoader />
            }

            <ScrollView showsVerticalScrollIndicator={false}>

                {handleResponse()}

            </ScrollView>

            {(answersObjectRef.current.values !== undefined && Object.keys(answersObjectRef.current.values).length === questionsList.length) &&
                <View style={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                    <Button title="Submit" style={styles.button} onPress={() => submitButtonPressed()} />
                </View>
            }

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradientContainerStyle: {
        borderRadius: 20,
        height: normalizeY(420),
        elevation: 3,
    },
    button: {
        width: '88%',
        marginVertical: normalizeY(15),
    },
    errorStyle: {
        color: colorRedDC143C,
        fontSize: 14,
        marginTop: 2
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    checkboxSelectionCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: ligh_green
    },
    carouselItemContainer: {
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 }
    }
})