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
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native'
import SignUpScreenStyle from '../SignUp/SignUpStyle'
import signUpScreenStyles from "../SignUp/SignUpStyle";
import { normalizeX, normalizeY } from "../../utils/Utils";
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import theme from '../../utils/theme'
import Button from '../../component/common/Button'
import SvgUri from 'react-native-svg-uri';
import { fundsSent } from '../../assets';

export default ForgotPasswordSent = (props) => {

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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>
            <StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={{ flex: 1.4, margin: 20, alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: normalizeY(30), backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR, elevation: 0.6 }}>
                <Image source={fundsSent} resizeMode='cover' style={{ height: 170, width: 170, }} />
            </View>
            <View style={{ flex: 0.3 }}></View>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 20 }}>Secured Funds Sent</Text>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 13, marginTop: normalizeY(20) }}>Your money request was just  sent!</Text>
            </View>

            <View style={[styles.resend_bt_container, { flex: 0.5, elevation: 30 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" />

            </View>
        </LinearGradient>
    )
}

