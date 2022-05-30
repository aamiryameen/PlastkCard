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
import { normalizeX, normalizeY , normalizeFont} from "../../utils/Utils";
import SignUpScreenStyle from '../SignUp/SignUpStyle'
import signUpScreenStyles from "../SignUp/SignUpStyle";
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import theme from '../../utils/theme'
import Button from '../../component/common/Button'
import { mulish_bold, mulish_regular } from "../../utils/Constants";
export default UpdatedPassword = (props) => {



    return (
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={{
                flex: 2, margin: 20, alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: normalizeY(30), backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR,
                elevation: 0.6
            }}>
                <Image source={require("../../assets/images/card_activated.png")} resizeMode='cover' style={{ height: 200, width: "98%", }} />
            </View>
            <View style={{ flex: 0.3 }}></View>
            <View style={{ flex: 1, marginHorizontal: normalizeFont(10) }}>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: normalizeFont(20), fontFamily: mulish_bold }}>Congratulations! Your card is now active.</Text>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 12, marginTop: normalizeY(10), fontFamily: mulish_regular }}>{`Please start using your Plastk Secured Credit Card`}</Text>
            </View>
            <View style={[styles.resend_bt_container, { flex: 0.5, elevation: 30 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" />
            </View>
        </LinearGradient>
    )
}

