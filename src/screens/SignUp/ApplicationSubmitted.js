import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Switch,
    KeyboardAvoidingView,
    Image,
    BackHandler, Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import signUpScreenStyle from "./SignUpStyle";
import { normalizeX, normalizeY } from "../../utils/Utils";
import theme from '../../utils/theme'
import Button from '../../component/common/Button'
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import { mulish_bold, mulish_regular } from "../../utils/Constants";
import { applicationSubmmited } from '../../assets';

export default ApplicationSubmitted = (props) => {

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go Main Screen?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => props.navigation.navigate("Demo") }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <LinearGradient colors={[theme.DARK_GRADIENT_FIRST_COLOR, theme.DARK_GRADIENT_SECOND_COLOR]} style={[signUpScreenStyle.container, {}]}>
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.DARK_GRADIENT_FIRST_COLOR}
            />
            <View>

            </View>
            <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center", marginTop: normalizeY(40), backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR, margin: 20, borderRadius: 10 }}>
                <Image source={applicationSubmmited} resizeMode='cover' style={{ height: 150, width: 190 }} />
            </View>
            <View style={{ flex: 0.15, alignItems: "center", marginTop: normalizeY(20) }}>
                <Text style={{ fontSize: 22, fontFamily: mulish_bold, paddingRight: normalizeX(20), paddingLeft: normalizeX(-20), color: theme.LABEL_COLOR }}>Application Submitted</Text>
            </View>

            <View style={{ flex: 0.12, paddingLeft: normalizeX(20), paddingTop: normalizeY(10), marginHorizontal: normalizeX(10) }}>
                <Text style={{ fontSize: 15, paddingLeft: normalizeX(20), fontFamily: mulish_regular, color: theme.LABEL_COLOR }}> {`Your application has been submited. 
Once you receive your card you will be 
able to activate it using this app`} </Text>

            </View>

            <View style={{ flex: 0.1, paddingLeft: normalizeX(20), paddingTop: normalizeY(20), marginHorizontal: normalizeX(10) }}>
                <Text style={{ fontSize: 15, fontFamily: mulish_regular, color: theme.LABEL_COLOR }}> {`In the meantime click the button belowd. 
and learn more about Plastk 
 `} </Text>
            </View>
            <View style={[styles.resend_bt_container, { marginTop: 20 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" onPress={() => props.navigation.navigate("SignIn")} />

            </View>
        </LinearGradient>
    )
}

