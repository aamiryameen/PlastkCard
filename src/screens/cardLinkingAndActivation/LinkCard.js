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
    BackHandler,
    Alert,

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
import { normalizeX, normalizeY } from "../../utils/Utils";
import SignUpScreenStyle from '../SignUp/SignUpStyle'
import signUpScreenStyles from "../SignUp/SignUpStyle";
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import ForgotPasswordStyles from '../ForgotPassword/ForgotPasswordStyles'
import theme from '../../utils/theme'
import Button from '../../component/common/Button'
import headerComponentStyles from '../../component/styles/headerComponentStyles'
export default ForgotPassword = (props) => {
    // sates using hooks 
    const [data, setData] = React.useState({
        username: '',
        check_textInputChange: false,
    });
    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
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
        <LinearGradient colors={[theme.DARK_GRADIENT_FIRST_COLOR, theme.DARK_GRADIENT_SECOND_COLOR]} 
            style={ForgotPasswordStyles.container}>
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
    
<View style={{flex:0.1}}/>
            {/* footer style */}
            <View style={{ flex: 0.235, marginTop: normalizeY(20), paddingTop: normalizeY(40) }}>
                <Text style={{ fontSize: 18, fontFamily: "Mulish-Bold", paddingRight: normalizeX(20), paddingLeft: normalizeX(-20), color: theme.LABEL_COLOR }}>   Let’s Link your cards</Text>
                <Text style={{ fontSize: 13.5, marginLeft: normalizeX(15), fontFamily: "Mulish-Regular", paddingTop: normalizeY(10), color: theme.LABEL_COLOR }}>{`Please select one of the options below to link your Plastk card to the app and access all our features`}</Text>
            </View>
            <View style={styles.resend_bt_container}>
            <Button style={[styles.resend_btn,{backgroundColor:theme.DARK_GRADIENT_FIRST_COLOR,height:60}]}
            title="Activate your plastk card" titleStyle={{color:"#000"}}/>
        </View>
        </LinearGradient>
    )
}
