
import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,

} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { normalizeX, normalizeY, normalizeFont } from '../../utils/Utils'
import ToggleSwitch from 'toggle-switch-react-native'
import { useTheme } from '@react-navigation/native'
import theme from '../../utils/theme'
import { mulish_bold, mulish_regular } from "../../utils/Constants";

export default NotificationSetting = (props) => {

    const [isPush, setIsPush] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isOffer, setIsOffer] = useState(false);
    const [isPoints, setisPoints] = useState(false);

    const togglePushSwitch = () => setIsPush(!isPush);
    const toggleEmailSwitch = () => setIsEmail(!isEmail)
    const toggleOfferSwitch = () => setIsOffer(!isOffer);
    const togglePointsSwitch = () => setisPoints(!isPoints)

    const myTheme = useTheme();

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1, }} >

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

            <View style={styles.body}>

                <View style={[styles.containerView, { marginTop: normalizeY(20) }]}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.push_notification_container}>
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Push Notification</Text>
                        <View style={styles.switchContainer}>
                            <ToggleSwitch
                                onColor="#AAE15D"
                                offColor="#dcdcdc"
                                isOn={isPush}
                                onToggle={togglePushSwitch}
                            />
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.containerView}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={[styles.push_notification_container,]}>
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Email Notification</Text>
                        <View style={styles.switchContainer}>
                            <ToggleSwitch
                                onColor="#AAE15D"
                                offColor="#dcdcdc"
                                isOn={isEmail}
                                onToggle={toggleEmailSwitch}
                            />
                        </View>
                    </LinearGradient>
                </View>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(8), marginTop: normalizeY(30), marginBottom: normalizeY(20), fontFamily: mulish_bold, fontSize: 20 }} >Notification Type</Text>

                <View style={styles.containerView}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.push_notification_container}>
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>New Offers</Text>
                        <View style={styles.switchContainer}>
                            <ToggleSwitch
                                onColor="#AAE15D"
                                offColor="#dcdcdc"
                                isOn={isOffer}
                                onToggle={toggleOfferSwitch}
                            />
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.containerView}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.push_notification_container}>
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Points Received</Text>
                        <View style={styles.switchContainer}>
                            <ToggleSwitch
                                onColor="#AAE15D"
                                offColor="#dcdcdc"
                                isOn={isPoints}
                                onToggle={togglePointsSwitch}
                            />
                        </View>
                    </LinearGradient>
                </View>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        marginHorizontal: normalizeX(30)
    },
    containerView: {
        marginVertical: 8,
        elevation: 5,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 }
    },
    push_notification_container: {
        height: normalizeY(64),
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: normalizeX(10),
    },
    text: {
        color: theme.LABEL_COLOR,
        fontSize: normalizeFont(15),
        fontFamily: mulish_regular,
        marginLeft: normalizeX(10)
    },
    switchContainer: {
        flex: 1,
        alignItems: "flex-end",
        paddingRight: normalizeX(20)
    }
})
