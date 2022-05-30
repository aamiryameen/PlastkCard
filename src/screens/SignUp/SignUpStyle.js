import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Switch
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native'
import headerComponentStyles from '../../component/styles/headerComponentStyles'
import theme from '../../utils/theme'
import { normalizeY, normalizeX } from "../../utils/Utils";
import { colorWhiteffffff, gray, mulish_regular } from "../../utils/Constants";

const signUpScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_inputcontainer_style: {
        flexDirection: "row",
        marginTop: normalizeY(10),
        marginHorizontal: normalizeX(20),
    },
    border_text_style: {
        borderWidth: 0.2,
        borderColor: "grey",
        marginHorizontal: normalizeX(1),
        marginTop: normalizeY(-10)
    },
    icons_style:
        // marginTop:15,
        { marginTop: normalizeY(18) },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: normalizeX(20),
        
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#8f92a1',
        fontSize: 12,
        fontFamily: "Mulish-Regular",
        fontWeight: "400",
        marginTop: normalizeY(15),
        paddingTop: normalizeY(15)
    },
    name_style: {
        marginHorizontal: normalizeX(10),
        color: '#8f92a1',
        fontSize: 11,
        fontFamily: "Mulish-Regular",
    },
    email_borderstyle: {
        borderWidth: 0.1, borderColor: "grey", marginHorizontal: normalizeX(1), marginTop: normalizeY(-6)
    },
    password_textinpu: {
        marginHorizontal: normalizeX(10),
        color: '#e53935',
        fontSize: 14,
        fontFamily: "Mulish-Regular",
    },
    password_text_footer: {
        color: '#e53935',
        fontSize: 12,
        fontFamily: "Mulish-Regular",
    },
    password_match: {
        color: '#e53935',
        fontSize: 13,
        fontFamily: mulish_regular,
        marginTop: normalizeY(10),
        paddingTop: normalizeY(5)
    },
    action: {
        flexDirection: 'row',
        marginTop: normalizeY(15),
        borderBottomWidth: 1,
        borderBottomColor: gray,
    },
    textinput_style: {
        marginTop: normalizeY(25),
    },
    button: {
alignItems: "center",
        marginTop: normalizeY(50)
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#a1c452",
        elevation: 2
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: normalizeY(20)
    },
    color_textPrivate: {
        color: '#e53935'
    },
    terms_condition: {
        color: '#000',
        fontSize: 12,
        fontFamily: "Mulish-Bold",
        // fontWeight:"700",
        marginLeft: normalizeX(9),
        marginTop: normalizeY(5)
    },
    terms_condition_second: {
        color: '#000',
        fontSize: 18,
        fontFamily: "Mulish-Bold",
        // fontWeight:"700",
        marginLeft: normalizeX(9),
        marginTop: normalizeY(5)
    },
    note: {
        color: '#000',
        fontSize: 12,
        fontFamily: "Mulish-Bold",
        // fontWeight:"700",
        marginLeft: normalizeX(24),
        marginTop: normalizeY(5),
        paddingLeft: normalizeX(10)
    },
});

export default signUpScreenStyles;