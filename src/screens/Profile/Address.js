import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    BackHandler,
    Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import signUpScreenStyles from "../SignUp/SignUpStyle";
import theme from '../../utils/theme'
import { mulish_bold } from "../../utils/Constants";
export default SignUpApplicationAddress = (props) => {

    // sates using hooks 
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    // swtich state
    const [isEnabledOne, setIsEnabledOne] = useState(false);
    const [isEnabledTwo, setIsEnabledTwo] = useState(false);
    const [isEnabledThird, setIsEnabledThird] = useState(false);
    const [radioValue, setRadioValue] = React.useState(0)
    const [selectedValue, setSelectedValue] = useState("");
    const toggleSwitchOne = () => setIsEnabledOne(!isEnabledOne);
    const toggleSwitchTwo = () => setIsEnabledTwo(!isEnabledTwo);
    const toggleSwitchThree = () => setIsEnabledThird(!isEnabledThird);

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
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  
            style={[signUpScreenStyles.container, {}]}>
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            {/* header style */}
            <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  
                style={[headerComponentStyles.header, { backgroundColor: theme.BACKGROUND_COLOR }]}>
                <View style={[headerComponentStyles.backArrow, { backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR }]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("SignIn")}>
                        <Ionicons
                            name="chevron-back"
                            color={theme.LABEL_COLOR}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[headerComponentStyles.headerText, { color: theme.LABEL_COLOR }]}>Address</Text>
            </LinearGradient>
            <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}   style={[signUpScreenStyles.footer, { paddingHorizontal: 0 }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{}}>
                        <Text style={{ fontFamily: mulish_bold, paddingLeft: 20, marginLeft: 12, fontSize: 16, color: theme.LABEL_COLOR }}>Address</Text>
                    </View>
                    {/* main container */}
                    <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                        {/* label */}
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: 20, color: theme.TEXTINPUT_LABEL_COLOR }]}>Country</Text>
                        {/* text input container */}
                        <View style={{ flexDirection: "row", marginHorizontal: 6, flex: 1 }}>
                            <View style={{ flex: 1, alignItems: "flex-end", marginTop: 10 }}>
                                <AntDesign
                                    style={{ marginTop: 10, fontFamily: mulish_bold }}
                                    name="down"
                                    color="#a1c452"
                                    size={20}
                                    fontFamily={mulish_bold}
                                />
                            </View>
                        </View>
                        {/* border styles */}
                        <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                    </View>
                    {/* main container */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {/* label */}
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: 20, color: theme.TEXTINPUT_LABEL_COLOR }]}>Street Address</Text>
                        {/* text input container */}
                        <View style={{ flexDirection: "row", marginHorizontal: 6, }}>

                            <TextInput
                                style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                        </View>
                        {/* border styles */}
                        <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                    </View>
                    {/* main container */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {/* label */}
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: 20, color: theme.TEXTINPUT_LABEL_COLOR }]}>Additional information</Text>
                        {/* text input container */}
                        <View style={{ flexDirection: "row", marginHorizontal: 6, }}>

                            <TextInput
                                style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                        </View>
                        {/* border styles */}
                        <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                    </View>
                    {/* main container */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {/* label */}
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: 20, color: theme.TEXTINPUT_LABEL_COLOR }]}>City</Text>
                        {/* text input container */}
                        <View style={{ flexDirection: "row", marginHorizontal: 6, }}>

                            <TextInput
                                style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
                            />
                        </View>
                        {/* border styles */}
                        <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                    </View>
                    {/* main container */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {/* label */}
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: 20, color: theme.TEXTINPUT_LABEL_COLOR }]}>Pravince / </Text>
                        {/* text input container */}
                        <View style={{ flexDirection: "row", marginHorizontal: 6, }}>
                            <TextInput
                                style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                                onChangeText={(val) => textInputChange(val)}
                            />
                        </View>
                        {/* border styles */}
                        <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                    </View>
                    {/* main container */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {/* label */}
                        <Text style={[signUpScreenStyles.name_style, { paddingTop: 20, color: theme.TEXTINPUT_LABEL_COLOR }]}>Pravince / </Text>
                        {/* text input container */}
                        <View style={{ flexDirection: "row", marginHorizontal: 6, }}>

                            <TextInput
                                style={[signUpScreenStyles.textinput_style, { color: theme.LABEL_COLOR }]}
                                autoCapitalize="none"
                                keyboardType="phone-pad"
                                onChangeText={(val) => textInputChange(val)}
                            />
                        </View>
                        {/* border styles */}
                        <View style={[signUpScreenStyles.border_text_style, { borderColor: theme.LABEL_COLOR, }]} ></View>
                    </View>


                    <View style={[signUpScreenStyles.button, { marginTop: 25, paddingTop: 20, flex: 1, marginBottom: 30 }]}>
                        <TouchableOpacity
                            style={[signUpScreenStyles.signIn, { backgroundColor: "#A1C452", elevation: 3, width: "90%", marginTop: 30 }]}
                            onPress={() => { }}>
                            <Text style={[signUpScreenStyles.textSign, {
                                color: "#fff"
                            }]}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>

            </LinearGradient>
        </LinearGradient>
    );
};

