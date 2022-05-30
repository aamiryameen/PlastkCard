

import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions,
    BackHandler,
    Alert,
    StyleSheet,

} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const { width } = Dimensions.get("window");
import signUpScreenStyles from "../SignUp/SignUpStyle";
import headerComponentStyles from '../../component/styles/headerComponentStyles'
import theme from '../../utils/theme'
import LinearGradient from 'react-native-linear-gradient';
import CodePin from 'react-native-pin-code';
import Button from '../../component/common/Button'
import { normalizeX, normalizeY } from "../../utils/Utils";
import { mulish_bold, mulish_regular } from "../../utils/Constants";
const { height } = Dimensions.get('window');
export default class VerifyCode extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        displayCodePin: true,
        success: '',
        error: "",
        active: 0,
    };
    onSuccess = () => {

        Alert.alert("Sucess!", "Pin code successfully set?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Ok", onPress: () => console.log("set") }
        ]);

    };
    onConfirmed = () => {

        Alert.alert("Confirmed!", "Pin code successfully set?", [

            { text: "Ok", onPress: () => console.log("set") }
        ]);

    };
    onError = () => {
        Alert.alert("Pin Code!", "Pin code successfully set?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => console.log("set") }
        ]);
    };
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    backAction = (props) => {
        Alert.alert("Hold on!", "Are you sure you want to go Main Screen?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.props.navigation.navigate("Demo") }
        ]);
        return true;
    };
    render() {
        return (
            <LinearGradient colors={[theme.DARK_GRADIENT_FIRST_COLOR, theme.DARK_GRADIENT_SECOND_COLOR]}
                style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ flex: 0.1 }}></View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                    <View style={{ flex: 1, marginHorizontal: normalizeX(3) }}>
                        {/* <Text style={{ fontFamily: constants.fontFamily.mulish_regular, 
                                paddingLeft:10, fontSize: 15,color:theme.SEGMENTED_TEXT_COLOR }} >Set a 4 digit number as a your pin</Text> */}
                        <View style={{ marginTop: normalizeY(20), paddingLeft: normalizeX(20), flex: 1, }}>
                            <CodePin
                                ref={ref => (this.ref = ref)}
                                pinStyle={styles.pinStyle}
                                containerStyle={{ backgroundColor: theme.DARK_GRADIENT_SECOND_COLOR, padding: 0, margin: 0 }}
                                autoFocusFirst
                                text={`   Check your SMS inbox, we have sent
you the code at +0 000 000 0000.`}
                                textStyle={styles.pin_text}
                                code="fake_code"
                                number={5}

                                keyboardType="numeric"
                                checkPinCode={(code, callback) => callback(code == 12345)}
                            />
                        </View>
                        <View style={{ flexDirection: "row", flex: 1, marginTop: normalizeY(10), paddingTop: normalizeY(10) }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: theme.LABEL_COLOR, fontFamily: mulish_regular, paddingLeft: normalizeX(20), marginLeft: normalizeX(5) }}>{`Didn’t not received the code?`}</Text>
                            </View>

                            <View style={{ justifyContent: "flex-end", flex: 0.2, marginTop: normalizeY(5) }}>
                                <Text style={{ color: theme.LABEL_COLOR, fontFamily: mulish_regular }}>(00:52)</Text>
                            </View>
                        </View>
                        <View style={{ paddingLeft: normalizeX(10), marginLeft: normalizeX(10), marginTop: normalizeY(10) }}>
                            <Text style={{ color: theme.RESEND_CODE, fontFamily: mulish_bold, marginTop: normalizeY(10) }}> Resend Code</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: theme.RESEND_CODE, width: '26%', marginLeft: 3 }}></View>
                        </View>
                        <View style={[signUpScreenStyles.button, { marginTop: 30, paddingTop: 40 }]}>
                            <Button style={{ marginTop: 10, width: "90%" }} title="Next" />

                        </View>
                    </View>


                </ScrollView>

            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    blur: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: width,
        height: height
    },
    avoidingView: {
        borderRadius: 10,
        height: 150,
        width: width - 30
    },
    containerCodePin: {
        borderRadius: 10
    },
    pinStyle: {
        backgroundColor: theme.BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor: theme.PIN_CODE_BORDER_COLOR,
        width: "50%",
        height: 50,
        color: "#A1C452",
        marginLeft: normalizeX(3),
        marginRight: normalizeX(3),
        fontFamily: mulish_regular,
    },
    success: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center'
    },
    pin_text: {
        fontFamily: mulish_regular,
        fontSize: 14,
        paddingRight: normalizeX(40),
        marginRight: normalizeX(40),
        color: theme.LABEL_COLOR,
        alignItems: "flex-start"
    }
})