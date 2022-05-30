//import liraries
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ligh_green, mulish_bold, mulish_medium, mulish_regular, getIsDarkModeEnabled, SCREEN_WIDTH } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../component/common/Text'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// create a component
export default PlastkSentinel = (props) => {

    const myTheme = useTheme();



    return (

        <View style={{ flex: 1 }}>

            <View style={styles.body}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.dateTextButton}>

                        <View style={styles.dateContainer}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR }}>Last update Today </Text>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR }}> 8 july, 2020 </Text>
                        </View>

                        <View style={styles.activeButton}>
                            <AntDesign
                                name="calendar"
                                color="#fff"
                                size={18}
                            />
                            <Text style={styles.activeText}>Active</Text>
                        </View>

                    </View>

                    <View style={styles.creditContainer}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('CreditView') }} >
                            <Image source={getIsDarkModeEnabled() ? require("../../../../assets/images/credit_view.png") : require("../../../../assets/images/credit_view_white.png")} style={{ width: SCREEN_WIDTH / 2.2, height: normalizeY(140), }} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('CreditWatch') }} >
                            <Image source={getIsDarkModeEnabled() ? require("../../../../assets/images/credit_watch.png") : require("../../../../assets/images/credit_watch_white.png")} style={{ width: SCREEN_WIDTH / 2.2, height: normalizeY(140), }} resizeMode="contain" />

                        </TouchableOpacity>
                    </View>

                    <View style={styles.creditContainer}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('CreditEducation') }} >
                            <Image source={getIsDarkModeEnabled() ? require("../../../../assets/images/credit_education.png") : require("../../../../assets/images/credit_education_white.png")} style={{ width: SCREEN_WIDTH / 2.2, height: normalizeY(140) }} resizeMode="contain" />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Benchmarks') }} >
                            <Image source={getIsDarkModeEnabled() ? require("../../../../assets/images/benchmarks.png") : require("../../../../assets/images/becnhmarks_white.png")} style={{ width: SCREEN_WIDTH / 2.2, height: normalizeY(140) }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={{ flex: 1, marginHorizontal: normalizeX(15), marginBottom: normalizeY(20), borderRadius: 16, elevation: 5, marginTop: normalizeY(20) }}>

                        <View style={styles.growingStarContainer}>
                            <View style={styles.growingStarImage}>
                                <Image source={require('../../../../assets/images/Character.png')} style={{ height: wp('42%'), width: hp('20%')}} resizeMode='contain' />
                            </View>

                            <View style={{  marginTop: normalizeY(20), flex: 0.5, justifyContent: "center" , alignContent: 'center'}}>

                                <Text style={{ color: myTheme.colors.SEGMENTED_TEXT_COLOR, fontSize: normalizeFont(13), fontFamily: mulish_medium, }}>You are a</Text>
                                <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16), fontFamily: mulish_bold, }}>Growing Star</Text>
                                <Text style={{ color: myTheme.colors.SEGMENTED_TEXT_COLOR, fontSize: normalizeFont(13), fontFamily: mulish_medium, }}>{`Your current credit score is 708 in a GOOD range Review cards each week.`}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: wp('1.5%'), marginBottom: hp('1%') }}>
                                    <Image source={require('../../../../assets/images/equifax.png')} style={{ height: hp('10%'), width: wp('20%') }} resizeMode="contain" />
                                </View>

                            </View>

                        </View>

                    </LinearGradient>

                </ScrollView>

            </View>

        </View>
    );
};


const styles = StyleSheet.create({

    body: {
        marginHorizontal: normalizeX(0),
        marginTop: normalizeY(10),
        flex: 1,

    },
    dateTextButton: {
        flexDirection: "row",
        marginTop: normalizeY(10),
        marginHorizontal: normalizeX(10)

    },
    dateContainer: {
        justifyContent: "flex-start",
        flexDirection: "row",
        flex: 1,
    },
    dateText: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12)
    },
    activeButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ligh_green,
        height: 30,
        width: "30%",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: normalizeY(-4)
    },
    activeText: {
        color: "#fff",
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        marginLeft: normalizeX(5),

    },
    creditContainer: {
        flexDirection: "row",
        marginTop: normalizeY(20),
        justifyContent: "space-between",

    },
    growingStarContainer: {
        flexDirection: "row",
        marginHorizontal: normalizeX(5),
        flex: 0.95,
        justifyContent: 'space-between'

    },
    growingStarImage: {
        flex: 0.4,
        justifyContent: 'center',
    }

});

