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
    Alert,
    Picker
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
    const [selectedValue, setSelectedValue] = useState("java");
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
        twertjewrtw
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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={[signUpScreenStyles.container, {}]}>
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={[signUpScreenStyles.footer, { paddingHorizontal: normalizeX(10), paddingBottom: 5 }]}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  >
                        <View style={{ paddingLeft: 20, paddingTop: 15, marginTop: 10 }}>
                            <Text style={{ fontFamily: mulish_bold, paddingLeft: 10, fontSize: 16, color: theme.LABEL_COLOR }}>Personal Information</Text>
                        </View>
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Title' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Gender' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='First Name' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Last Name' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Intitle' optional="Optional" onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Date of Birth' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Occupation' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Social Insurance Number' optional="Optional" onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Requested credit limit' onChangeText={(val) => textInputChange(val)} />
                        <View style={[signUpScreenStyles.button, { marginTop: 15, paddingTop: 20 }]}>
                            <Button style={{ marginTop: 10, marginBottom: 30 }} title="Next" />

                        </View>
                    </LinearGradient>
                </KeyboardAwareScrollView>
            </View>
        </LinearGradient>
    );
};

