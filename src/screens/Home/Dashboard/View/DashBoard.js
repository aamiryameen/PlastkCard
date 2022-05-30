import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import Text from '../../../../component/common/Text';
import Button from '../../../../component/common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromUserDefaults, normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { brightyellow, colorWhiteffffff, DASHBOARD_MY_CARD_DAILY, DASHBOARD_MY_CARD_MONTHLY, DASHBOARD_MY_CARD_WEEKLY, getEmail, getPassword, isIOS, IS_FINGER_PRINT_LOGIN_REGISTERED, IS_PIN_CODE_LOGIN_REGISTERED, KEYCHAIN_EMAIL_KEY, ligh_green, mulish_bold, mulish_regular, SCREEN_WIDTH, setManufacturer, SMART_LOOK_KEY } from '../../../../utils/Constants';
import MyCardView from '../../MyCard/View/MyCardView';
import MyBudgetView from '../../MyBudget/View/MyBudgetView';
import MyPointsView from '../../MyPoints/View/MyPointsView';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { Avatar } from 'react-native-paper';
import CustomBottomTabBar from '../../../../component/BottomTab/CustomBottomTabBar';
import NextPaymentInfo from '../../NextPaymentInfo/View/NextPaymentInfo';
import MyCardDailyChart from '../../MyCard/View/MyCardDailyChart';
import MyCardWeeklyChart from '../../MyCard/View/MyCardWeeklyChart';
import MyCardMonthlyChart from '../../MyCard/View/MyCardMonthlyChart';
import MyPointsDailyChart from '../../MyPoints/View/MyPointsDailyChart';
import MyPointsMonthlyChart from '../../MyPoints/View/MyPointsMonthlyChart';
import MyPointsWeeklyChart from '../../MyPoints/View/MyPointsWeeklyChart';
import NotchView from '../../../../component/common/NotchView';
import { EventRegister } from 'react-native-event-listeners'
import { getAccountStatusAction } from '../../../Status/action/StatusAction';
import { fetchMyCardInfoAction, fetchPointsInfoAction } from '../../MyCard/Actions/MyCardActions';
import { fetchSpendingInsights } from '../../MyBudget/Actions/MyBudgetActions';
import { fetchChartDataAction } from '../../../../component/BezierLineChart/Actions/LineChartActions';


import { getManufacturer } from 'react-native-device-info';

import * as Keychain from 'react-native-keychain';


export default DashBoard = (props) => {

    const chartData = [
        'monthly', 'weekly', 'daily'
    ]

    const myTheme = useTheme();

    const userResponse = useSelector(state => state.accountStatusReducer.response)

    const dispatch = useDispatch()

    const [selectedButton, setSelectedButton] = useState('card')

    const [refreshing, setRefreshing] = useState(false);

    const menuButtonPressed = () => {
        props.navigation.toggleDrawer();
    }

    const updatePasswordIfRequired = () => {

        (async () => {
            try {

                let isFingerPrintLoginRegistered = await getDataFromUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED)
                let isPinCodeLoginRegistered = await getDataFromUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED)

                const emailPassword = await Keychain.getInternetCredentials(KEYCHAIN_EMAIL_KEY);

                if (getEmail() === emailPassword.username && getPassword() !== emailPassword.password && (isFingerPrintLoginRegistered === 'true' || isPinCodeLoginRegistered === 'true')) {

                    await Keychain.setInternetCredentials(KEYCHAIN_EMAIL_KEY, getEmail(), getPassword())
                }
            }

            catch (error) {
                console.error(error)
            }

        })()
    }

    useEffect(() => {

        let listener = EventRegister.addEventListener('footerButtonPressed', data => {

            setSelectedButton(data)

        }, []);

        getManufacturer().then((manufacturer) => {
            setManufacturer(manufacturer)
        });

        updatePasswordIfRequired()

        return () => {
            EventRegister.removeEventListener(listener)
        };
    }, [])

    const renderItem = ((item, index) => {
        if (item.item === 'daily') {
            if (selectedButton === 'card')
                return (<View style={styles.chartContainerView}><MyCardDailyChart navigation={props.navigation} /></View>)
            else if (selectedButton === 'points')
                return (<View style={styles.chartContainerView}><MyPointsDailyChart /></View>)
        }
        else if (item.item === 'weekly') {
            if (selectedButton === 'card')
                return (<View style={styles.chartContainerView}><MyCardWeeklyChart navigation={props.navigation} /></View>)
            else if (selectedButton === 'points')
                return (<View style={styles.chartContainerView}><MyPointsWeeklyChart /></View>)
        }
        else if (item.item === 'monthly') {
            if (selectedButton === 'card')
                return (<View style={styles.chartContainerView}><MyCardMonthlyChart navigation={props.navigation} /></View>)
            else if (selectedButton === 'points')
                return (<View style={styles.chartContainerView}><MyPointsMonthlyChart /></View>)
        }

    })

    const showSelectedView = () => {

        if (selectedButton === 'points') {
            return (
                <View style={{ flex: 1 }}>
                    <MyPointsView />
                    <View style={{ marginHorizontal: normalizeX(15) }}>
                        <Carousel
                            data={isIOS ? chartData.reverse() : chartData}
                            renderItem={(item, index) => renderItem(item, index)}
                            layout={'stack'}
                            firstItem={isIOS ? 0 : 2}
                            loop={false}
                            sliderWidth={SCREEN_WIDTH}
                            itemWidth={SCREEN_WIDTH - 40}
                            containerCustomStyle={{ marginHorizontal: -normalizeX(25) }}
                            contentContainerCustomStyle={{ paddingVertical: 10 }}
                            layoutCardOffset={11}
                        />
                    </View>
                    <NextPaymentInfo />
                </View>
            )
        }

        else if (selectedButton === 'card') {

            return (
                <View style={{ flex: 1 }}>
                    <MyCardView />
                    <View style={{ marginHorizontal: normalizeX(15) }}>
                        <Carousel
                            data={isIOS ? chartData.reverse() : chartData}
                            renderItem={(item, index) => renderItem(item, index)}
                            layout={'stack'}
                            loop={false}
                            firstItem={isIOS ? 0 : 2}
                            sliderWidth={SCREEN_WIDTH}
                            itemWidth={SCREEN_WIDTH - 40}
                            containerCustomStyle={{ marginHorizontal: -normalizeX(25) }}
                            contentContainerCustomStyle={{ paddingVertical: 10 }}
                            layoutCardOffset={11}
                        />
                    </View>
                    <NextPaymentInfo />
                </View>
            )
        }

        else if (selectedButton === 'budget') {
            return (
                <View style={{ flex: 1 }}>
                    <MyBudgetView />
                </View>
            )
        }
    }

    const getPictureOrAvatar = () => {

        if (userResponse && userResponse.user && userResponse.user.hasOwnProperty('picture_url')) {
            return (
                <Avatar.Image size={50} source={{ uri: userResponse.user.picture_url }} />
            )
        } else {

            if (userResponse && userResponse.user && userResponse.user.gender === "M")
                return (<Avatar.Image size={50} source={require('../../../../assets/images/male.png')} backgroundColor="black" />)
            else
                return (<Avatar.Image size={50} source={require('../../../../assets/images/female.png')} />)

        }
    }

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

    return (
        <LinearGradient colors={[myTheme.colors.DASHBOARD_START_GRADIENT, myTheme.colors.DASHBOARD_END_GRADIENT]} style={styles.parentContainer}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DASHBOARD_START_GRADIENT} />

            <NotchView />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: normalizeY(20), paddingHorizontal: normalizeX(15) }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } >
                <View style={styles.nameContainer}>
                    <View style={{ flexDirection: 'column' }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Proflie')}>
                            {
                                getPictureOrAvatar()
                            }
                        </TouchableOpacity>

                        <Text style={[styles.nameTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{`Hello ` + userResponse.user.first_name + `!`} </Text>
                        <Text style={[styles.welcomeTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{`Welcome back to Plastk!`} </Text>

                    </View>

                    <TouchableOpacity style={{ marginTop: normalizeY(5) }} onPress={() => menuButtonPressed()}>
                        <MaterialIcons name={'menu'} color={ligh_green} size={normalizeFont(30, true)} />
                    </TouchableOpacity>

                </View>

                <View style={styles.buttonsContainer}>
                    <Button onPress={() => setSelectedButton('card')} style={[styles.buttonStyle, { height: normalizeY(35), backgroundColor: (selectedButton === 'card') ? brightyellow : myTheme.colors.BUTTON_UNSELECTED_COLOR, borderWidth: myTheme.colors.BUTTON_BORDER_RADIUS, borderColor: myTheme.colors.SEGMENTED_BORDER_COLOR }]} titleStyle={[styles.buttonTitleStyle, { color: (selectedButton === 'card') ? colorWhiteffffff : myTheme.colors.BUTTON_UNSELECTED_TEXT_COLOR, fontWeight: (selectedButton === 'card') ? '700' : '600' }]} title='My Card' />
                    <Button onPress={() => setSelectedButton('points')} style={[styles.buttonStyle, { height: normalizeY(35), backgroundColor: (selectedButton === 'points') ? brightyellow : myTheme.colors.BUTTON_UNSELECTED_COLOR, borderWidth: myTheme.colors.BUTTON_BORDER_RADIUS, borderColor: myTheme.colors.SEGMENTED_BORDER_COLOR }]} titleStyle={[styles.buttonTitleStyle, { color: (selectedButton === 'points') ? colorWhiteffffff : myTheme.colors.BUTTON_UNSELECTED_TEXT_COLOR, fontWeight: (selectedButton === 'points') ? '700' : '600' }]} title='My Points' />
                    <Button onPress={() => setSelectedButton('budget')} style={[styles.buttonStyle, { height: normalizeY(35), backgroundColor: (selectedButton === 'budget') ? brightyellow : myTheme.colors.BUTTON_UNSELECTED_COLOR, borderWidth: myTheme.colors.BUTTON_BORDER_RADIUS, borderColor: myTheme.colors.SEGMENTED_BORDER_COLOR }]} titleStyle={[styles.buttonTitleStyle, { color: (selectedButton === 'budget') ? colorWhiteffffff : myTheme.colors.BUTTON_UNSELECTED_TEXT_COLOR, fontWeight: (selectedButton === 'budget') ? '700' : '600' }]} title='My Budget' />
                </View>

                {showSelectedView()}

            </ScrollView>

            <CustomBottomTabBar navigation={props.navigation} selectedScreen={'dashBoard'} />

        </LinearGradient>

    )

}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: normalizeY(10),
    },
    nameTextStyle: {
        fontSize: normalizeFont(20),
        fontFamily: mulish_bold,
        marginTop: normalizeY(5),
        fontWeight: '700'
    },
    welcomeTextStyle: {
        fontSize: normalizeFont(15),
        fontFamily: mulish_regular,
        marginTop: normalizeY(5),
        fontWeight: '600'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: normalizeY(12),
        justifyContent: 'space-between',
        paddingHorizontal: normalizeX(2),
    },
    buttonStyle: {
        width: '31%',
    },
    buttonTitleStyle: {
        color: colorWhiteffffff
    },
    chartContainerView: {
        elevation: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 20,
    }
})