
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Text from '../../../component/common/Text'
import { ligh_green, mulish_bold, mulish_medium, mulish_regular, getIsDarkModeEnabled, getIsMyCreditAuthDone } from '../../../utils/Constants'
import { normalizeFont, normalizeX, normalizeY } from '../../../utils/Utils'
import LinearGradient from 'react-native-linear-gradient';
import MyScore from '../MyCreditSegmented/MyScore'
import PlastkSentinel from './PlastkSentinel/PlastkSentinel'
import { useTheme } from '@react-navigation/native';
import CustomBottomTabBar from '../../../component/BottomTab/CustomBottomTabBar';
import NotchView from '../../../component/common/NotchView';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyCreditAuthScreen } from '../MyCreditAuthScreen';
import {useSelector} from 'react-redux'
import MyCreditTnc from './MyCreditTnC/View/MyCreditTnc';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default MyCredit = (props) => {

    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)
    const myTheme = useTheme();

    const statusResponse = useSelector(state => state.accountStatusReducer.response)


    const [authDone, setAuthDone] = useState(getIsMyCreditAuthDone())

    const showSelectedScreen = () => {
        if (tabSelectedIndex === 0) {
            return (<MyScore navigation={props.navigation} />)
        }
        else if (tabSelectedIndex === 1) {
            return (<PlastkSentinel navigation={props.navigation} />)
        }
    }


    const callbackFunction = () => {
        setAuthDone(true)
    }


    const getView = () => {

        if (authDone) {

            if(statusResponse && (!statusResponse.user.hasOwnProperty('tnc_plastk') || statusResponse.user.tnc_plastk === '')) {

                return (

                    <View style={{flex : 1}}>
                        <NotchView />
                        <MyCreditTnc navigation={props.navigation} />
                    </View>

                )

            } else {
                return (
                    <View style={styles.body}>
    
                        <Text style={{ ...styles.creditText, color: myTheme.colors.LABEL_COLOR }}>My Credit</Text>
                        <Text style={{ ...styles.workCredit, color: myTheme.colors.PIN_SHARE, marginBottom: 15 }}>Let's get to work on your credit </Text>
    
                        <MyScore navigation={props.navigation} />
    
                        {/* <View style={styles.buttonContainer}>
    
                                <View style={[styles.widgetContainerStyle, {}]}>
    
                                    <TouchableOpacity onPress={() => setTabSelectedIndex(0)}>
    
                                        <View style={[styles.pinWidgetStyle, { backgroundColor: tabSelectedIndex === 0 ? '#fecf31' : 'transparent' }]}>
    
                                            <Text style={{ ...styles.myScore, color: tabSelectedIndex === 0 ? "#fff" : myTheme.colors.LABEL_COLOR, }}>My Score</Text>
    
                                        </View>
                                    </TouchableOpacity>
    
                                    <TouchableOpacity onPress={() => setTabSelectedIndex(1)}>
    
                                        <View style={[styles.fingerPrintWidgetStyle, { backgroundColor: tabSelectedIndex === 1 ? '#fecf31' : 'transparent' }]}>
    
                                            <MaterialCommunityIcons
                                                name={'alpha-p-circle-outline'}
                                                color={getIsDarkModeEnabled() ? myTheme.colors.LABEL_COLOR : tabSelectedIndex === 1 ? '#fff' : myTheme.colors.LABEL_COLOR}
                                                size={normalizeFont(25, true)}
                                            />
    
                                            <Text style={{ ...styles.PlastSentinel, color: tabSelectedIndex === 1 ? "#fff" : myTheme.colors.LABEL_COLOR, }}>Plastk Sentinel</Text>
    
                                        </View>
    
                                    </TouchableOpacity>
                                </View>
                                {showSelectedScreen()}
                            </View> */}
                    </View>
                )
            }

        } else {
            return (
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
                    <MyCreditAuthScreen navigation={props.navigation} callback={callbackFunction} />
                </KeyboardAwareScrollView>
            )
        }

    }
    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />
            <NotchView />

            {getView()}


            <CustomBottomTabBar navigation={props.navigation} selectedScreen='myCredit' />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    body: {
        marginHorizontal: normalizeX(10),
        marginTop: normalizeY(20),
        flex: 1,
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
    bottomButtonsView: {
        marginTop: normalizeY(15),
        flex: 0.3
    },
    gradientContainerStyle: {
        flex: 1,
        paddingHorizontal: normalizeX(10),
        paddingTop: normalizeY(30)
    },
    widgetContainerStyle: {
        borderWidth: 1,
        borderColor: '#dfe1e9',
        borderRadius: 16,
        flexDirection: 'row',
        height: normalizeY(57),
        marginHorizontal: normalizeX(5),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    pinWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        marginLeft: normalizeX(25),
        alignItems: 'center',
        justifyContent: "center",
        width: '76%',
        overflow: 'hidden'
    },
    fingerPrintWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        marginLeft: normalizeX(20),
        overflow: 'hidden'
    },
    linearGradientContainerStyle: {
        marginTop: normalizeY(30)
    },
    buttonContainer: {
        flex: 1,
        marginTop: normalizeY(10)
    },
    myScore: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(14),
        marginLeft: normalizeX(5)
    }

});



