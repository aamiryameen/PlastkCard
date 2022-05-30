import React, { useEffect, useState, useRef } from 'react';

// import all the components we are going to use
import {

    StyleSheet,
    View,
    Image,
    Animated, Easing, TouchableOpacity, Touchable
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { brightyellow, GENERIC_ERROR, getIsFreeUser, isIOS, ligh_green, mulish_bold, mulish_medium, mulish_regular } from '../../../utils/Constants';
import { normalizeFont, normalizeY, normalizeX, logFireBaseEvent } from '../../../utils/Utils';
import Text from '../../../component/common/Text';
import { useTheme } from '@react-navigation/native';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

import { fetchCreditFileAction } from '../EIDVerification/Actions/EquifaxActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default App = (props) => {


    const [circleAnim, setCircleAnim] = useState(new Animated.Value(0));
    const myTheme = useTheme();

    const dispatch = useDispatch()

    const statusResponse = getIsFreeUser() ? useSelector(state => state.fcsDashBoardReducer.response) : useSelector(state => state.accountStatusReducer.response)

    const creditFileResponse = useSelector(state => state.equifaxReducer.creditFileResponse)

    const endAnimationRef = useRef(0)

    const rotate = circleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '230deg']
    })
    useEffect(() => {

        Animated.timing(circleAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start()

    }, [])

    useEffect(() => {


        if (statusResponse && statusResponse.user && statusResponse.user.equifax_status === 'Verified' && creditFileResponse === '')
            dispatch(fetchCreditFileAction(false))
    }, [])

    const creditScoreAnimationPressed = () => {
        if (statusResponse && statusResponse.user && statusResponse.user.equifax_status === 'Not Verified') {
            if (statusResponse.user.hasOwnProperty('equifax_disclaimer') && statusResponse.user.equifax_disclaimer !== '') {
                props.navigation.navigate('ChangeAddress', { equifax_status: statusResponse.user.equifax_status })
            } else {
                props.navigation.navigate('eidDisclaimer', { equifax_status: statusResponse.user.equifax_status })
            }


        } else if (statusResponse && statusResponse.user && statusResponse.user.equifax_status === 'Processing') {
            props.navigation.navigate('EquifaxVerification', { equifax_status: statusResponse.user.equifax_status })
        }
        else if (statusResponse && statusResponse.user && statusResponse.user.equifax_status === 'Rejected') {
            props.navigation.navigate('eidVerificationFailure')
        }
    }

    const equifaxRotation = () => {

        let score = creditFileResponse.score;
        let finddeg = 0;
        if (score >= 300 && score <= 320) {
            finddeg = ((score - 300) / 900) * 200;
        } else if (score > 320 && score <= 350) {
            finddeg = ((score - 200) / 900) * 200;
        } else if (score > 350 && score <= 400) {
            finddeg = ((score - 0) / 900) * 200;
        } else if (score > 400 && score <= 450) {
            finddeg = ((score - 20) / 900) * 200;
        } else if (score > 450 && score <= 500) {
            finddeg = ((score + 70) / 900) * 200;
        } else if (score > 500 && score < 570) {
            finddeg = ((score + 130) / 900) * 200;
        } else if (score > 570 && score <= 600) {
            finddeg = ((score + 200) / 900) * 200;
        } else if (score > 600 && score <= 700) {
            finddeg = ((score + 220) / 900) * 200;
        } else if (score > 700 && score <= 800) {
            finddeg = ((score + 220) / 900) * 200;
        } else if (score > 800 && score <= 900) {
            finddeg = ((score + 280) / 900) * 200;
        } else {
            finddeg = 270;
        }
        endAnimationRef.current = finddeg + 'deg'

    };

    const getMessage = () => {

        if (statusResponse && statusResponse.user && statusResponse.user.equifax_status) {

            if (statusResponse.user.equifax_status === 'Not Verified' || statusResponse.user.equifax_status === 'Processing') {
                return 'Click here to get your FREE Credit Score'
            } else if (statusResponse.user.equifax_status === 'Rejected') {
                return "Unfortunately, we couldn't verify you with Equifax \n Please Contact Equifax: 1-800-465-7166"
            } else if (statusResponse.user.equifax_status === 'Verified' && creditFileResponse !== '' && creditFileResponse.success === false) {
                return creditFileResponse.message
            }
            else {
                return GENERIC_ERROR
            }

        } else {


            return GENERIC_ERROR
        }

    }


    const getCreditScoreText = () => {
        if (creditFileResponse && creditFileResponse.score_message && creditFileResponse.score_message !== '') {
            return creditFileResponse.score_message.split("Your credit score is ")[1].split('.')[0]
        }
        else {
            return ''
        }
    }

    const getUpdateCreditScoreText = () => {

        if (creditFileResponse && creditFileResponse.score_message && creditFileResponse.score_message !== '') {
            return creditFileResponse.score_message.split(".")[1]
        } else {
            return ''
        }
    }

    const getCreditScoreTextColor = () => {

        if (getCreditScoreText() !== '') {
            if (getCreditScoreText().toLowerCase() === 'excellent') {
                return '#AAE15D'
            } else if (getCreditScoreText().toLowerCase() === 'very good') {
                return '#4caf50'
            }
            else if (getCreditScoreText().toLowerCase() === 'good') {
                return '#ffea00'
            }
            else if (getCreditScoreText().toLowerCase() === 'fair') {
                return '#f57c00'
            }
            else if (getCreditScoreText().toLowerCase() === 'poor') {
                return '#d32f2f'
            }
        }
    }

    const getEquifaxAnimation = () => {

        if (statusResponse && statusResponse.user && statusResponse.user.equifax_status === 'Verified' && creditFileResponse !== '' && creditFileResponse.success) {

            equifaxRotation()

            return (
                <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.container}  >

                    <View>

                        <View style={styles.body}>

                            <Image
                                style={{
                                    width: "78%",
                                    height: "67%",
                                }}
                                source={require('../../../assets/images/progress_bar.png')}
                                resizeMode='contain'
                            />
                            <Animated.View style={{
                                ...styles.LargeCircleImage, transform: [{
                                    rotate: circleAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', endAnimationRef.current]
                                    })
                                }]
                            }}>
                                <View style={styles.greenCirle} />
                            </Animated.View>

                            <Animated.View style={{
                                ...styles.orangeInnerCircle, transform: [{
                                    rotate: circleAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', endAnimationRef.current]
                                    })
                                }],
                            }}>
                                <View style={{ ...styles.triangleStyle, transform: [{ rotate: '-46deg' }] }} />
                            </Animated.View>
                            <Text style={{ ...styles.circleCenterText }}>{creditFileResponse.score}</Text>
                            <Text style={styles.text300}>300</Text>
                            <Text style={styles.text400}>400</Text>
                            <Text style={styles.text500}>500</Text>
                            <Text style={styles.text600}>600</Text>
                            <Text style={styles.text900}>900</Text>

                        </View>
                        <Image source={require('../../../assets/images/equifax.png')} style={styles.equifaxImage} resizeMode='contain' />

                    </View>
                    <View style={styles.rightSectionContianer}>
                        <View style={{ maxWidth: '90%', paddingLeft: normalizeX(5) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text numberOfLines={2} style={{ ...styles.helloText, color: myTheme.colors.LABEL_COLOR }}>{'Hello, ' + ((statusResponse && statusResponse.user) ? statusResponse.user.first_name : '') + '!'}</Text>
                            </View>

                            <Text numberOfLines={2} style={{ ...styles.creditScoreText, color: myTheme.colors.LABEL_COLOR, }}>{`Your Credit Score is `} <Text style={styles.score}>{`${creditFileResponse.score}`}</Text></Text>

                            <View style={{ height: 8, width: "20%", backgroundColor: "#AAE15D", borderRadius: 50, marginTop: normalizeY(5) }} />

                            <View style={{ flexDirection: 'row' }}>
                                <Text numberOfLines={1} style={{ marginTop: normalizeY(4), color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold, fontWeight: '700', fontSize: normalizeFont(18) }}>This is </Text>
                                <Text numberOfLines={1} style={{ marginTop: normalizeY(4), color: getCreditScoreTextColor(), fontFamily: mulish_bold, fontWeight: '700', fontSize: normalizeFont(18) }}>{getCreditScoreText()}</Text>
                            </View>

                            {(getUpdateCreditScoreText() !== '' && getUpdateCreditScoreText() !== undefined) &&
                                <Text numberOfLines={3} style={{ marginTop: normalizeY(4), color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular }}>{getUpdateCreditScoreText()} </Text>
                            }

                            <Text numberOfLines={2} style={{ width: "80%", marginTop: normalizeY(4), color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(10) }}>{`As of ${Moment(creditFileResponse.date).format('MMM Do YYYY')}`}</Text>

                            <TouchableOpacity onPress={props.autoScroll} style={{ backgroundColor: "#FFAD0E", borderRadius: 8, width: '98%', height: 35, justifyContent: 'center', alignItems: 'center', marginTop: normalizeX(13) }}>
                                <Text style={{ color: "#fff", fontSize: normalizeFont(13), textAlign: 'center', fontFamily: mulish_medium }}>Improve My Credit</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() => props.navigation.navigate("CmsContent", { slugName: "my-credit-score" })}>
                                <Text style={{ ...styles.dateStyle, fontSize: normalizeFont(11), marginTop: normalizeY(13), marginLeft: 0 }} >Terms and Conditions </Text>
                            </TouchableOpacity> */}


                            {!creditFileResponse.isCurrent &&

                                <TouchableOpacity style={{ marginVertical: normalizeY(10), marginLeft: normalizeX(10), flexDirection: 'row' }} onPress={() => { getIsFreeUser() ? logFireBaseEvent('fcs_credit_score_refreshed') : logFireBaseEvent('credit_score_refreshed'); dispatch(fetchCreditFileAction(true)) }}>
                                    <FontAwesome
                                        name={'refresh'}
                                        color={ligh_green}
                                        size={normalizeFont(20, true)}

                                    />

                                    <Text style={{ textAlign: 'center', color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(10) }}>Refresh</Text>

                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </LinearGradient>
            )

        }
        else {

            return (
                <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.container}  >

                    <View>
                        <View style={styles.body}>

                            <Image
                                style={{
                                    width: "78%",
                                    height: "67%",
                                }}
                                source={require('../../../assets/images/progress_bar.png')}
                                resizeMode='contain'
                            />
                            <Animated.View style={{ ...styles.LargeCircleImage, transform: [{ rotate: rotate }] }}>
                                <View style={styles.greenCirle} />
                            </Animated.View>

                            <Animated.View style={{ ...styles.orangeInnerCircle, transform: [{ rotate: rotate }], }}>
                                <View style={{ ...styles.triangleStyle, transform: [{ rotate: '-46deg' }] }} />
                            </Animated.View>
                            <Text style={{ ...styles.circleCenterText }}>800</Text>
                            <Text style={styles.text300}>300</Text>
                            <Text style={styles.text400}>400</Text>
                            <Text style={styles.text500}>500</Text>
                            <Text style={styles.text600}>600</Text>
                            <Text style={styles.text900}>900</Text>

                        </View>
                        <Text style={styles.dateStyle} >{'Last Update: '}</Text>



                    </View>
                    <View style={styles.rightSectionContianer}>
                        <View style={{ marginHorizontal: normalizeX(10) }}>
                            <Text numberOfLines={2} style={{ ...styles.helloText, color: myTheme.colors.LABEL_COLOR, }}>{'Hello, ' + ((statusResponse && statusResponse.user) ? statusResponse.user.first_name : '') + '!'}</Text>
                            <Text style={{ color: myTheme.colors.PIN_SHARE }}></Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate("CmsContent", { slugName: "my-credit-score" })}>
                                <Text style={{ ...styles.dateStyle, fontSize: normalizeFont(11), marginTop: normalizeY(13), marginLeft: 0 }} >Terms and Conditions </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <TouchableOpacity onPress={() => creditScoreAnimationPressed()} style={styles.overLayStyle}>

                        <Text numberOfLines={5} style={{ textAlign: 'center', fontWeight: '700', fontSize: normalizeFont(15), marginHorizontal: normalizeX(10) }}>{getMessage()}</Text>


                    </TouchableOpacity>
                </LinearGradient>
            )
        }

    }

    return (

        <>
            {getEquifaxAnimation()}
        </>


    );
};

const styles = StyleSheet.create({

    container: {
        height: 240,
        width: '100%',
        marginTop: normalizeY(5),
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 16,
        elevation: 5,
        overflow: 'hidden',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        paddingTop: normalizeY(5),
    },
    overLayStyle: {
        backgroundColor: '#bbbbbb',
        position: 'absolute',
        flex: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0.9,
        borderRadius: 16,
        elevation: 5,
        justifyContent: 'center',
        alignContent: 'center',
        overflow: 'hidden',
    },
    body: {
        marginLeft: normalizeX(-3),
        width: 155,
        height: 155,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
    },
    dateStyle: {
        textDecorationLine: "underline",
        textDecorationColor: ligh_green,
        color: ligh_green,
        fontSize: normalizeFont(11),
        marginLeft: normalizeX(25),
        marginBottom: normalizeY(0),
        marginTop: 0

    },
    circleCenterText: {
        position: 'absolute',
        left: 63,
        bottom: 62,
        fontFamily: mulish_bold,
        fontSize: normalizeFont(16),
        color: "#ffffff",
        fontWeight: '900'
    },
    text300: {
        position: 'absolute',
        right: 125,
        bottom: 20,
        transform: [{ rotate: '-120deg' }],
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        color: "#CF3E26"
    },
    text400: {
        position: 'absolute',
        right: 112,
        top: 20,
        transform: [{ rotate: '-50deg' }],
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        color: "#EBB967"
    },
    text500: {
        position: 'absolute',
        right: 70,
        top: 2,
        transform: [{ rotate: '-0deg' }],
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        color: "#EBEE75"
    },
    text600: {
        position: 'absolute',
        right: 10,
        top: 24,
        transform: [{ rotate: '40deg' }],
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        color: "#95F89D"
    },
    text900: {
        position: 'absolute',
        right: 3,
        top: 118,
        transform: [{ rotate: '-50deg' }],
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        color: "#95F89D"
    },
    LargeCircleImage: {
        borderColor: "transparent",
        borderWidth: 10,
        borderRadius: 100,
        position: 'absolute',
        left: 15,
        top: 24,
        bottom: 10,
        right: 14,
    },
    greenCirle: {
        height: 20,
        width: 20,
        backgroundColor: "#55E19A",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
        position: "absolute",
        bottom: 1, left: 1
    },
    orangeInnerCircle: {
        height: 77,
        backgroundColor: brightyellow,
        width: 77,
        borderRadius: 100,
        position: "absolute",
        top: 45
    },
    triangleStyle: {
        borderTopWidth: 15,
        borderTopColor: "transparent",
        borderBottomWidth: 15,
        borderBottomColor: "transparent",
        borderRightWidth: 15,
        borderRightColor: brightyellow,
        position: "absolute",
        bottom: -3,
        left: 4
    },
    rightSectionContianer: {
        justifyContent: 'center',
        overflow: 'hidden',
    },
    helloText: {
        fontSize: normalizeFont(17),
        fontFamily: mulish_medium,
        maxWidth: normalizeY(140)
    },
    equifaxImage: {
        height: 30,
        width: 80,
        marginLeft: normalizeX(28.5),
        marginTop: normalizeY(-15),
    },
    creditScoreText: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(14)
    },
    score: {
        color: "#FFAD0E",
        fontSize: normalizeFont(15),
        fontWeight: '700',
    }

});

