import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
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
import SignUpScreenStyle from '../SignUp/SignUpStyle'
import signUpScreenStyles from "../SignUp/SignUpStyle";
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import { normalizeX, normalizeY } from "../../utils/Utils";
import TextInput from '../../component/common/TextInput';
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
            <StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}/>
            {/* footer style */}
            <View style={{ flex: 0.235, marginTop: normalizeY(20), paddingTop: normalizeY(40) ,paddingLeft:normalizeX(15),paddingRight:normalizeX(10)}}>
                <Text style={{ fontSize: 18, fontFamily: "Mulish-Bold", paddingRight: normalizeX(20), color: theme.LABEL_COLOR }}>Let’s Activate</Text>
                <Text style={{ fontSize: 13.5, fontFamily: "Mulish-Regular", paddingTop: normalizeY(10), color: theme.LABEL_COLOR, paddingRight: normalizeX(10) }}>{`To activate your card, please insert your CVV number below. This number is located on the back of your Plastk Card`}</Text>
            </View>
               {/* main container */}
               <View style={{marginHorizontal: normalizeX(10),flex:0.5}}>
               <TextInput 
                containerStyle={signUpScreenStyles.textinput_style}
                    placeholder='CVV Number' onChangeText={(val) => textInputChange(val)} />
               </View>
           <View style={styles.resend_bt_container}>
           <Button style={{marginTop: 10}} title="Activate"/>
       </View>
        </LinearGradient>
    )
}
