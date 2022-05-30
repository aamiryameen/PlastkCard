import React, { useEffect, useState } from 'react'

import { View, StyleSheet, StatusBar, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { normalizeY, normalizeX } from '../../../utils/Utils';
import { EQUIFAX_DISCLAIMER_MESSAGE, ligh_green, mulish_bold, mulish_medium } from '../../../utils/Constants';
import ToggleSwitch from 'toggle-switch-react-native'
import Button from '../../../component/common/Button';
import DialogModal from '../../../component/common/DialogModal';
import { fcsAcceptTnCAction } from './Actions/FCSDashBoardActions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { logoutAppAction } from '../../Splash/Action/SplashAction';




export default FCSTnC = (props) => {
    const dispatch = useDispatch()
    const myTheme = useTheme()

    const isLoading = useSelector(state => state.fcsDashBoardReducer.isLoading)
    const tncResponse = useSelector(state => state.fcsDashBoardReducer.tncResponse)


    const [plastkSentinel, setplastkSentinel] = useState(false)
    const [equifaxCreditScore, setequifaxCreditScore] = useState(false)
    const [optEquifax, setOptEquifax] = useState(false)
    const [showDisclaimerModal, shouldSHowDisclaimerModal] = useState(false)
    const [disable, setDisabled] = useState(true)


    const handleDisclaimerModal = () => {
        if (showDisclaimerModal) {
            return (<DialogModal message={EQUIFAX_DISCLAIMER_MESSAGE} modalType='info' buttons={['OK']}
                positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
        }

    }

    const positiveButtonPressed = () => {
        shouldSHowDisclaimerModal(false)
    }


    const submitButtonPressed = () => {

        let obj = {}
        obj.tnc_plastk = new Date()

        dispatch(fcsAcceptTnCAction(obj))

    }

    useEffect(() => {

        if (equifaxCreditScore || plastkSentinel) {
            setOptEquifax(false)
        }

        if (plastkSentinel & equifaxCreditScore) {

            setDisabled(false)

        }
        else {
            setDisabled(true)
        }

    }, [plastkSentinel, equifaxCreditScore])


    useEffect(() => {

        if (optEquifax) {
            setequifaxCreditScore(false)
            setplastkSentinel(false)
        }

    }, [optEquifax])

    const handleResponse = () => {

        if (tncResponse) {
            if (tncResponse.success) {

            }
        }
    }

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container} >
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <View style={{marginTop: normalizeY(30), justifyContent: 'flex-end'}}>

                <AntDesign
                    name="logout"
                    color="#fe5c31"
                    size={25}
                    style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: normalizeX(10) }}
                    onPress={() => dispatch(logoutAppAction())}
                />

            </View>

            <View style={styles.toogleSwitchContainer}>
                <Text style={{ ...styles.agreeText, color: myTheme.colors.DARK_TEXT_COLOR }}>I agree to</Text>

                <View style={styles.switchTextStyle}>
                    <ToggleSwitch
                        onColor={"#FECF31"}
                        offColor="#dcdcdc"
                        isOn={plastkSentinel}

                        onToggle={() => setplastkSentinel(!plastkSentinel)}
                    />
                    <View style={{ flexDirection: "row" }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate("CmsContent", { slugName: "my-credit-score" })}>
                            <View style={{ maxWidth: wp('96%'), }}>
                                <Text style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%'), }}>Terms & Conditions</Text>
                                <View style={{ marginLeft: normalizeX(8), borderBottomColor: ligh_green, borderBottomWidth: 1, width: "92%" }} />
                            </View>
                        </TouchableOpacity>

                        <Text numberOfLines={2} style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}> -  My Credit </Text>
                    </View>
                </View>


                <View style={{ alignItems: 'flex-start', marginTop: normalizeY(13), flexDirection: 'row' }}>
                    <ToggleSwitch
                        onColor={"#FECF31"}
                        offColor="#dcdcdc"
                        isOn={equifaxCreditScore}

                        onToggle={() => setequifaxCreditScore(!equifaxCreditScore)}
                    />
                    <View style={styles.termsTextStyls}>
                        <View style={{ maxWidth: wp('96%'), flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>


                                <Text style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>Equifax Credit Score
                    <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                                        <Text style={{ fontFamily: mulish_bold, fontSize: hp('1.3%'), color: myTheme.colors.DARK_TEXT_COLOR, }}> 1 2</Text>
                                    </TouchableOpacity></Text>
                            </View>



                        </View>
                        <Text style={{ ...styles.toggleText, fontFamily: mulish_medium, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>By clicking here you're giving Plastk Financial & Rewards Inc authorization to access your Equifax Credit Report
                <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                                <Text style={{ ...styles.toggleText, fontFamily: mulish_bold, fontSize: hp('1.3%'), color: myTheme.colors.DARK_TEXT_COLOR, marginLeft: wp("0%"), }}> 1 2</Text>
                            </TouchableOpacity>
                        </Text>

                    </View>

                </View>

                <View style={{ alignItems: 'flex-start', marginTop: normalizeY(13), flexDirection: 'row' }}>
                    <ToggleSwitch
                        onColor={"#FECF31"}
                        offColor="#dcdcdc"
                        isOn={optEquifax}

                        onToggle={() => setOptEquifax(!optEquifax)}
                    />
                    <View style={styles.termsTextStyls}>
                        <View style={{ maxWidth: wp('96%'), flexDirection: "row" }}>
                            <Text style={{ ...styles.toggleText, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>Opt out of Free Equifax Credit Score
                  <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                                    <Text style={{ fontFamily: mulish_bold, fontSize: hp('1.4%'), color: myTheme.colors.DARK_TEXT_COLOR, }}> 1 2</Text>
                                </TouchableOpacity>

                            </Text>

                        </View>



                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.toggleText, fontFamily: mulish_medium, color: myTheme.colors.DARK_TEXT_COLOR, maxWidth: wp('73.8%') }}>By clicking here you are opting out to Plastk Financial & Rewards Inc accessing your Equifax Credit Report. You will not receive your free monthly Equifax Credit Score
                   {<TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                                    <Text style={{ ...styles.toggleText, fontFamily: mulish_bold, fontSize: hp('1.3%'), color: myTheme.colors.DARK_TEXT_COLOR, marginLeft: wp("0%"), }}> 1 2</Text>
                                </TouchableOpacity>}
                            </Text>


                        </View>

                    </View>
                </View>
            </View>

            <Button disabled={disable} style={{ marginVertical: normalizeY(20), backgroundColor: disable ? '#cccac6' : ligh_green, }} title="Submit" onPress={() => submitButtonPressed()} />


            {handleDisclaimerModal()}
            {handleResponse()}


            {isLoading &&
                <CustomLoader />
            }

        </LinearGradient>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: normalizeX(15),
        
    },
    toogleSwitchContainer: {
        marginTop: hp("15%"),
    },
    agreeText: {
        fontFamily: mulish_bold,
        fontSize: hp("2.2%")
    },
    toggleText: {
        fontFamily: mulish_bold,
        fontSize: hp('1.7%'),
        marginLeft: wp("2%"),
    },
    switchTextStyle: {
        alignItems: 'flex-start',
        marginTop: normalizeY(13),
        flexDirection: 'row'
    },
    termsTextStyls: {
        maxWidth: wp('96%')
    },
}
)