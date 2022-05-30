import React, { useEffect, useRef } from 'react'

import { View, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FcsBlogs from '../../FCSBlogs/View/FSCBlogs'
import Text from '../../../../component/common/Text'
import { normalizeFont, normalizeX, normalizeY, openLink } from '../../../../utils/Utils';
import { ligh_green, mulish_bold, mulish_medium } from '../../../../utils/Constants';
import Button from '../../../../component/common/Button'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UpgradeSentinel from '../../../MyCredit/MyCreditSegmented/UpgradeSentinel';
import CreditReport from '../../../MyCredit/MyCreditSegmented/CreditReport';
import CircleGraph from '../../../MyCredit/CircleChart/CircleGraph';
import { useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default FCSCreditScreen = (props) => {


    const statusResponse = useSelector(state => state.fcsDashBoardReducer.response)

    const myTheme = useTheme();
    useEffect(() => {

        props.navigation.setOptions({ headerShown: false })

        if (statusResponse.user.equifax_status === 'Not Verified' || statusResponse.user.equifax_status === 'Processing')
            props.navigation.navigate('eidDisclaimer', { equifax_status: statusResponse.user.equifax_status })

    }, [])

    const menuButtonPressed = () => {
        props.navigation.toggleDrawer();
    }

    const scrollRef = useRef()

    const handleClick = () => {

        scrollRef.current.scrollTo({
            x: 0,
            y: normalizeY(450),
            animated: true,
        })
    }


    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>

                <View style={styles.body}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalizeY(10) }}>

                        <View style={{ flexDirection: 'column' }}>

                            <Text style={{ ...styles.creditText, color: myTheme.colors.LABEL_COLOR }}>My Credit</Text>
                            <Text style={{ ...styles.workCredit, color: myTheme.colors.PIN_SHARE }}>Let's get to work on your credit </Text>

                        </View>



                        <TouchableOpacity style={{ marginTop: normalizeY(5) }} onPress={() => menuButtonPressed()}>
                            <MaterialIcons name={'menu'} color={ligh_green} size={normalizeFont(30, true)} />
                        </TouchableOpacity>

                    </View>

                    <CircleGraph navigation={props.navigation} autoScroll={handleClick} />


                    <View style={styles.mainContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../../assets/images/cell_phone.png')} style={styles.imageStyle} resizeMode="contain" />
                        </View>
                        <View style={styles.containerBox}>
                            <View style={{ width: wp('30%'), flexDirection: 'row', flexWrap: 'wrap' }}>
                                <View style={{ marginTop: normalizeY(20), marginLeft: normalizeX(10) }}>
                                    <Text numberOfLines={2} style={styles.creditReportText}>Want to see your full Credit Report?</Text>
                                    <Text style={styles.upgradePlastkText}>Upgrade to Plastk Sentinel </Text>

                                    <TouchableOpacity onPress={() => openLink('https://plastk.ca/plastk-sentinel')} style={styles.buttonStyle}>
                                        <Text style={styles.learnMoreText}>Learn More</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>


                        </View>

                    </View>



                    <CreditReport />
                    <FcsBlogs navigation={props.navigation} />

                    <Button title='Get Plastk Card' onPress={() => props.navigation.navigate('FCSGetCardScreen')} />


                </View>

            </ScrollView>

        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    body: {
        marginHorizontal: normalizeX(10),
        marginTop: normalizeY(20),
        flex: 1,
        marginBottom: normalizeY(20)
    },
    creditText: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(18),
        marginLeft: normalizeX(10)
    },
    workCredit: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(14),
        marginLeft: normalizeX(10),
        marginTop: normalizeY(15)
    },
    containerBox: {
        backgroundColor: "#242B3E",
        height: hp('19%'),
        width: wp('79%'),
        marginTop: hp(15),
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: hp(-23),
        borderRadius: 16,
        paddingLeft: 7
    },
    mainContainer: {
        marginVertical: normalizeY(1),
        marginHorizontal: normalizeX(3),
        marginTop: hp(-19),
    },
    imageContainer: {
        position: 'relative',
        top: hp('13.4%'),
        zIndex: 1,
        left: wp('49%'),
    },
    imageStyle: {
        height: hp('49%'),
        width: wp('42%'),
    },
    upgradePlastkText: {
        color: "#FECF31",
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        marginTop: normalizeY(5)
    },
    creditReportText: {
        width: wp('60%'),
        fontFamily: mulish_bold,
        color: "#fff",
        fontSize: normalizeX(9)
    },
    learnMoreText: {
        color: "#fff",
        fontFamily: mulish_medium
    },
    buttonStyle: {
        backgroundColor: "#FECF31",
        height: hp('5%'),
        width: wp('40%'),
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginTop: normalizeY(15)
    }
})