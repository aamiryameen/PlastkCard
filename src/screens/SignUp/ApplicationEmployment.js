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
    BackHandler,
    Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RadioButtonRN from 'radio-buttons-react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import { normalizeX, normalizeY } from "../../utils/Utils";
import TextInput from '../../component/common/TextInput';
import headerComponentStyles from '../../component/styles/headerComponentStyles'
import signUpScreenStyles from "./SignUpStyle";
import Button from '../../component/common/Button'
import theme from '../../utils/theme'
import { mulish_bold } from "../../utils/Constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    const [radioValue, setRadioValue] = React.useState(0)
    const [selectedValue, setSelectedValue] = useState("part");
    var radio_props = [
        { label: "Yes", value: 0 },
        { label: 'No', value: 1 }
    ];
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
            <StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={[signUpScreenStyles.footer, { paddingHorizontal: normalizeX(10), paddingBottom: 5 }]}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  >
                        <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                            <Text style={{ fontFamily: mulish_bold, paddingLeft: 10, fontSize: 16, color: theme.LABEL_COLOR }}>Employment</Text>
                        </View>
                        {/* main container */}
                        <View style={{ paddingHorizontal: 0, paddingTop: normalizeY(10) }}>
                            {/* label */}
                            <Text style={[signUpScreenStyles.name_style, { paddingTop: normalizeY(20), color: theme.TEXTINPUT_LABEL_COLOR }]}>Employment Type</Text>
                            {/* text input container */}
                            <View style={{ flexDirection: "row", marginHorizontal: normalizeX(6), flex: 1 }}>
                                <View style={{ flex: 1, alignItems: "flex-end", marginTop: normalizeY(10) }}>
                                    <AntDesign
                                        style={{ marginTop: normalizeY(10), fontFamily: mulish_bold }}
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
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Industry' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Job Title' optional="Optional" onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Company Name' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Length of time with current employer' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Other household income before taxes' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Mortgage or Rent Amount' onChangeText={(val) => textInputChange(val)} />
                        <View style={{ paddingLeft: normalizeX(20), marginLeft: normalizeX(10), marginTop: normalizeY(10), paddingTop: normalizeY(20) }}>
                            <Text style={{ color: theme.TEXTINPUT_LABEL_COLOR, fontSize: 14, fontFamily: "Mulish-Regular", }}>
                                own a manager
                                </Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingTop: normalizeY(20), paddingLeft: normalizeX(20), marginLeft: normalizeX(10), marginTop: normalizeY(10) }}>
                            <RadioForm
                                radio_props={radio_props}
                                animation={true}
                                buttonColor={'#A1C452'}
                                selectedButtonColor={'#A1C452'}
                                initial={0}
                                labelColor={theme.RADIO_TEXT}
                                selectedLabelColor={theme.RADIO_TEXT}
                                style={{ color: '#fff' }}
                                selectedButton={{ paddingRight: 10 }}
                                buttonSize={10}
                                formHorizontal={true}
                                onPress={(value) => { setRadioValue({ value: value }) }}>
                            </RadioForm>
                        </View>
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Mortgage or Rent Amount' onChangeText={(val) => textInputChange(val)} />

                        <View style={[signUpScreenStyles.button, { marginTop: 15, paddingTop: 20 }]}>
                            <Button titleStyle={[signUpScreenStyles.textSign, { color: "#fff" }]}
                                style={[signUpScreenStyles.signIn, { backgroundColor: "#A1C452", elevation: 3, marginBottom: 30 }]}
                                title="Apply for Plastk Card" />
                        </View>
                    </LinearGradient>
                </KeyboardAwareScrollView>
            </View>
        </LinearGradient>
    );
};

