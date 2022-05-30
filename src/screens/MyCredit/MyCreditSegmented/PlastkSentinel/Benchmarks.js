
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ligh_green, mulish_bold, mulish_medium, mulish_regular, EQUIFAX_DISCLAIMER_MESSAGE } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import ProgressBar from '../../../../component/common/ProgressBar'

import DialogModal from '../../../../component/common/DialogModal';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default Benchmarks = () => {

    const [canadaCity, setCanadaCity] = useState("20%");
    const [calgaryCity, setCalgaryCity] = useState("40%");
    const [ageGroup, setAgeGroup] = useState("90%");
    const [postalCode, setPostalCode] = useState("50%");
    const myTheme = useTheme();

    const [showDisclaimerModal, shouldSHowDisclaimerModal] = useState(false)

    const handleDisclaimerModal = () => {
        if (showDisclaimerModal) {
            return (<DialogModal message={EQUIFAX_DISCLAIMER_MESSAGE} modalType='info' buttons={['OK']}
                positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
        }

    }

    const positiveButtonPressed = () => {

        shouldSHowDisclaimerModal(false)
    }


    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}  >

                <View style={styles.body}>

                    <View style={{ flexDirection: 'row', marginLeft: normalizeY(13) }}>

                        <View style={{ flex: 0.97, flexDirection: "row", marginTop: normalizeY(20) }}>
                            <Text style={{ ...styles.asOfText, color: myTheme.colors.LABEL_COLOR, }}>As of </Text>
                            <Text style={{ ...styles.asOfText, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(5) }}>July 1st,2020 </Text>
                        </View>

                        <Image source={require('../../../../assets/images/equifax.png')} style={{ height: hp('10%'), width: wp('20%'), marginLeft: normalizeX(30), alignItems: "flex-end", }} resizeMode='contain' />
                    </View>
                    <Text style={{ ...styles.compareText, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeY(13) }}>This is how you compare to:</Text>

                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={{ ...styles.boxStyle }}>
                        <ProgressBar completed={canadaCity} title="Canada" bgColor="#FFF5CC" foreground_color="#FFB200" />
                        <ProgressBar completed={calgaryCity} title="Calgary" bgColor="#DAD7FE" foreground_color="#4339F2" />
                        <ProgressBar completed={ageGroup} title="Age Group" bgColor="#CCF8FE" foreground_color="#02A0FC" />
                        <ProgressBar completed={postalCode} title="Postal Code" bgColor="#FFE5D3" foreground_color="#FF3A29" />
                    </LinearGradient>

                    <Text style={{ ...styles.compareText, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeY(13), fontFamily: mulish_bold, fontSize: normalizeFont(12) }}>Explanation of Your Benchmarks</Text>
                    <Text style={{ ...styles.compareText, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeY(13), fontFamily: mulish_bold, fontSize: normalizeFont(12) }}>{`These average percentages represent how you compare to other residents in your area and the country at large`}</Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: normalizeY(10) }}>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeY(13), fontFamily: mulish_regular, fontSize: normalizeFont(11) }}>For any concerns regarding your Equifax Credit Report</Text>
                        <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(8) }}> 1 2 </Text>
                        </TouchableOpacity>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(11) }}>,</Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(11) }}>please call Equifax</Text>
                        <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(8) }}> 1 </Text>
                        </TouchableOpacity>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(11) }}> at 1-800-865-3908 </Text>

                    </View>


                </View>

            </ScrollView>

            {handleDisclaimerModal()}


        </LinearGradient>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(8),
        marginTop: normalizeY(10),
        marginBottom: normalizeY(10)
    },
    asOfText: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(14)
    },
    compareText: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12),
        marginTop: normalizeY(15)
    },
    boxStyle: {
        height: 340,
        width: "95%",
        marginTop: normalizeY(20),
        marginLeft: normalizeX(8),
        borderRadius: 16,
        elevation: 5,
        marginBottom: normalizeY(10)
    },
});

