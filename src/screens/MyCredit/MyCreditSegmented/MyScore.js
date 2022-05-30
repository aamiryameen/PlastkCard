//import liraries
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { EQUIFAX_DISCLAIMER_MESSAGE, mulish_medium, mulish_regular, mulish_bold, PLASTK_CARD_MONTHLY, SCREEN_WIDTH } from '../../../utils/Constants'
import { normalizeFont, normalizeX, normalizeY, openLink } from '../../../utils/Utils'
import LineChartView from '../../../component/BezierLineChart/View/LineChartView';
import { useSelector } from 'react-redux'
import Text from '../../../component/common/Text'
import CreditInsights from '../CreditInsights'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import CircleGraph from '../CircleChart/CircleGraph'
// import UpgradeSentinel from '../MyCreditSegmented/UpgradeSentinel'
import CreditReport from './CreditReport'
import DialogModal from '../../../component/common/DialogModal';
import Blogs from '../../FreeCreditScore/FCSBlogs/View/FSCBlogs'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAccountStatusAction } from '../../Status/action/StatusAction';
import { useDispatch } from 'react-redux'

// create a component
const MyScore = (props) => {



    const myTheme = useTheme();
    const response = useSelector(state => state.myCardMonthlyReducer.response)

    const scrollRef = useRef()

    const dispatch = useDispatch()

    const [refreshing, setRefreshing] = useState(false);

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

    const handleClick = () => {

        scrollRef.current.scrollTo({
            x: 0,
            y: normalizeY(370),
            animated: true,
        })
    }


    const onRefresh = () => {
        setRefreshing(true)

        dispatch(getAccountStatusAction())

        setTimeout(() => {

            setRefreshing(false)

        }, 2000);
    }


    return (

        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} ref={scrollRef} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <View style={styles.body}>

                    <CircleGraph navigation={props.navigation} autoScroll={handleClick} />

                    <View style={styles.mainContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/images/cell_phone.png')} style={styles.imageStyle} resizeMode="contain" />
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
                    <Blogs navigation={props.navigation} />


                    {/* <View style={{ flexDirection: 'row', marginTop: normalizeY(10) }}>

                        <Text style={{ fontSize: normalizeFont(18), color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(10) }}>12 months Equifax Credit Score</Text>
                        <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(10) }}> 1 2</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linearGradientContainerStyle}>
                        {response !== '' && response.label && response.label.length > 0 ?
                            <LineChartView response={response} view={PLASTK_CARD_MONTHLY} />
                            : null
                        }

                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            <Image source={require('../../../assets/images/equifax.png')} style={{ height: 30, width: "50%" }} resizeMode="contain" />
                        </View>

                    </View>


                    <CreditInsights />

 */}
                    {/* <TouchableOpacity style={styles.upgradeBtnContainer} onPress={() => openLink('https://plastk.ca/plastk-sentinel')}>

                        <Text style={{ color: '#fff', fontSize: normalizeFont(15) }}>Join the Waitlist for Plastk Sentinel</Text>

                    </TouchableOpacity> */}

                </View>

            </ScrollView>

            {handleDisclaimerModal()}


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        marginHorizontal: normalizeX(4),
        flex: 1,
        marginBottom: normalizeY(10),
    },
    linearGradientContainerStyle: {
        marginTop: normalizeY(30)
    },
    upgradeBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        width: SCREEN_WIDTH,
        backgroundColor: '#EF9749',
        marginTop: normalizeY(40),
        borderRadius: 16,
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
        // marginTop: hp(-15),
    },
    imageContainer: {
        position: 'relative',
        top: hp('2.2%'),
        zIndex: 1,
        left: wp('49%'),
    },
    imageStyle: {
        height: hp('26%'),
        width: wp('42%')
    },
    upgradePlastkText: {
        color: "#FECF31",
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
        marginTop: normalizeY(5),

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
});

//make this component available to the app
export default MyScore;
