import React, { useState } from 'react'
import { Image, ScrollView, View, StyleSheet, ImageBackground, RefreshControl, TouchableOpacity } from 'react-native'
import CustomBottomTabBar from '../../../../component/BottomTab/CustomBottomTabBar'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import Text from '../../../../component/common/Text'
import { useSelector, useDispatch } from 'react-redux'
import { DASHBOARD_MY_CARD_DAILY, DASHBOARD_MY_CARD_MONTHLY, DASHBOARD_MY_CARD_WEEKLY, getIsDarkModeEnabled, mulish_regular, SCREEN_WIDTH } from '../../../../utils/Constants';
import SegmentedControlTab from "react-native-segmented-control-tab";
import WeeklyChart from '../../TransactionsChartView/View/WeeklyChart';
import MonthlyChart from '../../TransactionsChartView/View/MonthlyChart';
import YearlyChart from '../../TransactionsChartView/View/YearlyChart';
import NotchView from '../../../../component/common/NotchView';
import DailyChart from '../../TransactionsChartView/View/DailyChart';
var currencyFormatter = require('currency-formatter')
import Moment from 'moment'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { getAccountStatusAction } from '../../../Status/action/StatusAction';
import { fetchMyCardInfoAction, fetchPointsInfoAction } from '../../../Home/MyCard/Actions/MyCardActions';
import { fetchSpendingInsights } from '../../../Home/MyBudget/Actions/MyBudgetActions';
import { fetchChartDataAction } from '../../../../component/BezierLineChart/Actions/LineChartActions';



export default PlastkCardMain = (props) => {

    const myTheme = useTheme();

    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch()

    const userResponse = useSelector(state => state.accountStatusReducer.response)
    const creditLimit = useSelector(state => state.myCardReducer.creditLimit)
    const balance = useSelector(state => state.myCardReducer.balance)

    const paymentAmount = useSelector(state => state.myCardReducer.amountDue)
    const paymentDate = useSelector(state => state.myCardReducer.lastPaymentDate)
    const minPayment = useSelector(state => state.myCardReducer.minPayment)

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)

    const onRefresh = () => {
        setRefreshing(true)


        dispatch(getAccountStatusAction())
        dispatch(fetchMyCardInfoAction())
        dispatch(fetchPointsInfoAction())
        dispatch(fetchSpendingInsights());
        dispatch(fetchChartDataAction(DASHBOARD_MY_CARD_DAILY, 'daily'))
        dispatch(fetchChartDataAction(DASHBOARD_MY_CARD_WEEKLY, 'weekly'))
        dispatch(fetchChartDataAction(DASHBOARD_MY_CARD_MONTHLY, 'annual'))


        setTimeout(() => {

            setRefreshing(false)

        }, 4000);
    }

    const showSelectedGraph = () => {
        if (tabSelectedIndex === 0) {
            return (

                <GestureRecognizer
                    onSwipeLeft={() => setTabSelectedIndex(1)}
                    config={config}>

                    <DailyChart />
                </GestureRecognizer>
            )
        }
        else if (tabSelectedIndex === 1) {
            return (

                <GestureRecognizer
                    onSwipeLeft={() => setTabSelectedIndex(2)}
                    onSwipeRight={() => setTabSelectedIndex(0)}
                    config={config}>

                    <WeeklyChart />
                </GestureRecognizer>
            )
        }
        else if (tabSelectedIndex === 2) {
            return (

                <GestureRecognizer
                    onSwipeRight={() => setTabSelectedIndex(1)}
                    config={config}>

                    <MonthlyChart />
                </GestureRecognizer>

            )
        }
    }


    return (
        <LinearGradient colors={[myTheme.colors.DASHBOARD_START_GRADIENT, myTheme.colors.DASHBOARD_END_GRADIENT]} style={{ flex: 1 }}>
            <NotchView />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollStyle} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <View style={styles.headerStyle}>
                    <Text style={[styles.headerTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Plastk Card</Text>

                    <TouchableOpacity style={styles.myCreditButtonStyle} onPress={() => props.navigation.navigate('VerifyPaymentScreen')}>
                        <Text style={styles.myCreditTextStyle}> Verify Your Payment</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', marginTop: normalizeY(15) }}>

                    <Text style={[styles.nameTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>Hello {(userResponse && userResponse.user) ? userResponse.user.first_name : ''},</Text>

                    <Text style={[styles.letsGetStartedTextStyle, { color: getIsDarkModeEnabled() ? '#5d6a93' : myTheme.colors.LABEL_COLOR }]}>Let’s get to work on your credit </Text>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: normalizeY(5), marginTop: normalizeY(10) }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.cardBalanceText, { color: getIsDarkModeEnabled() ? '#5d6a93' : myTheme.colors.LABEL_COLOR, }]}>Card Balance</Text>
                        <Text style={[styles.cardBalanceValueStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(creditLimit - balance, { code: 'CAD' })}</Text>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.dueDateTextStyle, { color: getIsDarkModeEnabled() ? '#5d6a93' : myTheme.colors.LABEL_COLOR, }]}>{'Amount Due'}</Text>
                        <Text style={[styles.dueAmountTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(paymentAmount, { code: 'CAD' })}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: normalizeY(5) }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={[styles.cardBalanceText, { color: getIsDarkModeEnabled() ? '#5d6a93' : myTheme.colors.LABEL_COLOR, }]}>Minimum Due</Text>
                        <Text style={[styles.cardBalanceValueStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(minPayment, { code: 'CAD' })}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Text style={[styles.dueDateTextStyle, { color: getIsDarkModeEnabled() ? '#5d6a93' : myTheme.colors.LABEL_COLOR, }]}>{'Due by '}</Text>
                        <Text style={[styles.dueAmountTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{(paymentDate === '' ? '-' : Moment(paymentDate).format("MMM DD"))}</Text>
                    </View>
                </View>


                <SegmentedControlTab
                    values={["Daily", "Weekly", "Monthly"]}
                    selectedIndex={tabSelectedIndex}
                    onTabPress={index => setTabSelectedIndex(index)}
                    tabStyle={{ backgroundColor: 'transparent', borderColor: getIsDarkModeEnabled() ? '#6574A0' : '#dfe1e9', borderWidth: 1 }}
                    activeTabStyle={{ backgroundColor: "#FECF31" }}
                    activeTabTextStyle={{ color: '#fafafb', fontWeight: '600', fontFamily: mulish_regular }}
                    tabTextStyle={{ color: '#5d6a93', fontFamily: mulish_regular, fontWeight: '400', fontSize: normalizeFont(14), marginVertical: normalizeY(2) }}
                    tabsContainerStyle={{ color: '#6574A0' }}
                    firstTabStyle={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0, borderRadius: 10 }}
                    lastTabStyle={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0, borderRadius: 10 }}
                    borderRadius={10}

                />

                {showSelectedGraph()}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: normalizeX(10) }}>

                    {/*   <TouchableOpacity onPress={() => props.navigation.navigate('MoveMoney')}>
                        <ImageBackground style={{ width: normalizeX(145), height: normalizeY(130) }} resizeMode='contain' source={getIsDarkModeEnabled() ? require('.././../../../assets/images/move_money_dark.png') : require('.././../../../assets/images/move_money_light.png')} />
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => props.navigation.navigate('CardStatementScreen')}>
                        <ImageBackground style={{ width: SCREEN_WIDTH / 2.3, height: normalizeY(140) }} resizeMode='contain' source={getIsDarkModeEnabled() ? require('.././../../../assets/images/card_statement_dark_new.png') : require('.././../../../assets/images/card_statement_light_new.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('TransactionList')}>
                        <ImageBackground style={{ width: SCREEN_WIDTH / 2.3, height: normalizeY(140) }} resizeMode='contain' source={getIsDarkModeEnabled() ? require('.././../../../assets/images/current_transaction_dark.png') : require('.././../../../assets/images/current_transaction_light.png')} />
                    </TouchableOpacity>
                </View>

                {/* <View style={{ paddingHorizontal: normalizeX(5) }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('CardStatementScreen')} activeOpacity={1}>

                        <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.cardStatementButtonStyle}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../../assets/images/statement_icon.png')} resizeMode='contain' style={styles.statementIconStyle} />

                                    <Text style={[styles.buttonTextStyle, { color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(16) }]}>Card Statement</Text>
                                </View>
                                <View style={{ alignContent: 'flex-end' }}>
                                    <Image source={getIsDarkModeEnabled() ? require('../../../../assets/images/next_arrow_light.png') : require('../../../../assets/images/next_arrow_dark.png')} resizeMode='contain' style={{ width: normalizeX(30), height: normalizeY(30), marginRight: normalizeX(20) }} />
                                </View>
                            </View>

                        </LinearGradient>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginVertical: normalizeY(5), marginBottom: normalizeY(15) }} activeOpacity={1}>

                        <View style={styles.payWithPlastkButtonStyle}>

                            <Image source={require('../../../../assets/images/credit_card.png')} resizeMode='contain' style={{ width: normalizeX(20), height: normalizeY(20), marginRight: normalizeX(10) }} />
                            <Text style={[styles.buttonTextStyle, { fontWeight: '700' }]}> Pay With Plastk Card</Text>

                        </View>

                    </TouchableOpacity>

                </View> */}

            </ScrollView>

            <CustomBottomTabBar navigation={props.navigation} selectedScreen='plastkCard' />
        </LinearGradient>
    )

}



const styles = StyleSheet.create({

    scrollStyle: {
        marginHorizontal: normalizeX(18),
        paddingVertical: normalizeX(20)
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitleStyle: {
        fontWeight: '700',
        fontSize: normalizeFont(16),
        textAlign: 'center'
    },
    myCreditButtonStyle: {
        backgroundColor: '#f8cb50',
        borderRadius: 12,
        width: normalizeX(170),
        height: normalizeY(40),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: normalizeX(10)
    },
    myCreditTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: normalizeFont(13),
        fontWeight: '700'
    },
    nameTextStyle: {
        fontSize: normalizeFont(20, true),
        fontWeight: '700'
    },
    letsGetStartedTextStyle: {
        fontSize: normalizeFont(12),
        fontWeight: '600',
        marginTop: normalizeY(7),
    },
    cardBalanceText: {
        fontWeight: '700',
        fontSize: normalizeFont(14),
        textAlign: 'left'
    },
    cardBalanceValueStyle: {
        fontWeight: '700',
        fontSize: normalizeFont(22, true),
        textAlign: 'left'
    },
    dueDateTextStyle: {
        fontWeight: '700',
        fontSize: normalizeFont(14),
        textAlign: 'right'
    },
    dueAmountTextStyle: {
        fontWeight: '700',
        fontSize: normalizeFont(22, true),
        textAlign: 'right'
    },
    buttonTextStyle: {
        fontWeight: '600',
        fontFamily: mulish_regular,
        fontSize: normalizeFont(16),
        color: '#ffffff',
        textAlign: 'center'
    },
    cardStatementButtonStyle: {
        borderRadius: 16,
        elevation: 5,
        marginVertical: normalizeY(10),
        marginHorizontal: normalizeX(10)
    },
    payWithPlastkButtonStyle: {
        backgroundColor: '#ef9749',
        borderRadius: 16,
        elevation: 5,
        marginVertical: normalizeY(10),
        marginHorizontal: normalizeX(10),
        height: normalizeY(65),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    statementIconStyle: {
        width: normalizeX(50),
        height: normalizeY(50),
        marginVertical: normalizeY(10),
        marginLeft: normalizeX(10)
    }

})