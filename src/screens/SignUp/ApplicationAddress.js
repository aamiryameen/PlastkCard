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
    BackHandler, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import headerComponentStyles from '../../component/styles/headerComponentStyles'
import signUpScreenStyles from "../SignUp/SignUpStyle";
import { normalizeX, normalizeY } from "../../utils/Utils";
import TextInput from '../../component/common/TextInput';
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
    // swtich state
    const [isEnabledOne, setIsEnabledOne] = useState(false);
    const [isEnabledTwo, setIsEnabledTwo] = useState(false);
    const [isEnabledThird, setIsEnabledThird] = useState(false);
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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={[signUpScreenStyles.container, {}]}>
            <StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={[signUpScreenStyles.footer, { paddingHorizontal: normalizeX(10) }]}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  >
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontFamily: mulish_bold, paddingLeft: 20, marginLeft: 12, fontSize: 16, color: theme.LABEL_COLOR }}>Address</Text>
                        </View>
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Adress 1 (house & street)' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Adress 2 (unit#, & Optional)' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Province' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='City' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Postal code' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Primary phone' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Alernative Number' onChangeText={(val) => textInputChange(val)} />
                        <TextInput containerStyle={signUpScreenStyles.textinput_style}
                            placeholder='Email' onChangeText={(val) => textInputChange(val)} />
                        <View style={[signUpScreenStyles.button, { marginTop: 15, paddingTop: 20 }]}>
                            <Button titleStyle={[signUpScreenStyles.textSign, { color: "#fff" }]}
                                style={[signUpScreenStyles.signIn, { backgroundColor: "#A1C452", elevation: 3, marginBottom: 30 }]} title="Next" />

                        </View>
                    </LinearGradient>

                </KeyboardAwareScrollView>

            </View>
        </LinearGradient>
    );
};

