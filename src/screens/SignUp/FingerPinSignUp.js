

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
import { normalizeX, normalizeY } from "../../utils/Utils";
import { mulish_bold, mulish_regular } from "../../utils/Constants";
const { height } = Dimensions.get('window');
export default class FingerPinSignUp extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        displayCodePin: true,
        success: '',
        error: "",
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
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


    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);
    //     return () =>
    //         BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, []);


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

    handleSlide = type => {
        let {

            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };
    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
        return (
            <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  
                style={{ flex: 1, backgroundColor: "#fff" }}>
           
                <View
                    style={{
                        width: "92%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 20,
                        borderTopRightRadius: 20,
                        borderColor: "#404968",
                        flex: 1
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: normalizeY(40),
                            marginBottom: normalizeY(20),
                            height: 60,
                            position: "relative",
                            borderRadius: 10,
                            backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR,
                        }}
                    >
                        <Animated.View
                            style={{
                                flex: 1,
                                position: "absolute",
                                width: "45%",
                                height: "80%",
                                top: 5,
                                left: 5,
                                right: 15,
                                bottom: 5,
                                backgroundColor: "#FECF31",
                                borderRadius: 10,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: theme.SEGMENTED_BORDER_COLOR,
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <View style={{ flexDirection: "row" }}>
                                <EvilIcons
                                    name="lock"
                                    color={active === 0 ? "#fff" : theme.LABEL_COLOR}
                                    size={27}
                                    style={{ paddingRight: normalizeX(5) }}
                                />
                                <Text
                                    style={{
                                        color: active === 0 ? "#fff" : theme.LABEL_COLOR
                                    }}
                                >
                                    Pin Code
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: theme.SEGMENTED_BORDER_COLOR,
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderStyle: "solid",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons
                                    name="finger-print"
                                    color={active === 1 ? "#fff" : theme.LABEL_COLOR}
                                    size={20}
                                    style={{ paddingRight: normalizeX(5) }}
                                />
                                <Text
                                    style={{
                                        color: active === 1 ? "#fff" : theme.LABEL_COLOR
                                    }}
                                >
                                    Fingerprint
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Animated.View
                            style={{

                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        >
                            <View style={{ flex: 1 }}>
                                {/* <Text style={{ fontFamily: constants.fontFamily.mulish_regular, 
                                paddingLeft:10, fontSize: 15,color:theme.SEGMENTED_TEXT_COLOR }} >Set a 4 digit number as a your pin</Text> */}
                                <View style={{ marginTop: normalizeY(20) }}>
                                    <CodePin
                                        ref={ref => (this.ref = ref)}
                                        pinStyle={styles.pinStyle}
                                        containerStyle={{ backgroundColor: theme.DARK_GRADIENT_FIRST_COLOR }}
                                        autoFocusFirst
                                        text="Set a 4 digit number as a your pin"
                                        textStyle={styles.pin_text}
                                        code="fake_code"
                                        number={5}
                                        keyboardType="numeric"
                                        checkPinCode={(code, callback) => callback(code == 12345)}
                                    />
                                </View>
                                <View style={{ marginTop: normalizeY(20), width: "100%" }}>

                                    <CodePin
                                        ref={ref => (this.ref = ref)}
                                        pinStyle={styles.pinStyle}
                                        autoFocusFirst
                                        text="Confirm your pin"
                                        textStyle={[styles.pin_text, { marginRight: normalizeX(90), paddingRight: normalizeX(100) }]}
                                        containerStyle={{ backgroundColor: theme.DARK_GRADIENT_FIRST_COLOR }}
                                        code="fake_code"
                                        number={5}
                                        keyboardType="numeric"
                                        checkPinCode={(code, callback) => callback(code == 12345)}
                                        success={this.onSuccess}
                                        error='pin code not match'
                                    />

                                    <Text style={{ color: "red" }}>{this.state.success}</Text>
                                </View>
                                <Text style={{ color: theme.PIN_SHARE, fontFamily: mulish_regular, paddingLeft: normalizeX(10) }}>Don't share your pin with any one</Text>
                                <View style={[signUpScreenStyles.button, { marginTop: normalizeY(10), paddingTop: normalizeY(20) }]}>
                                    <TouchableOpacity
                                        style={[signUpScreenStyles.signIn, { backgroundColor: "#A1C452", elevation: 3, width: "97%", marginTop: normalizeY(10) }]}
                                        onPress={() => { }}>
                                        <Text style={[signUpScreenStyles.textSign, {
                                            color: "#fff"
                                        }]}>Confirmed</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={{

                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}>
                            <View style={{ marginTop: normalizeY(40), paddingTop: normalizeY(40), flex: 1 }}>

                                <View style={{ marginTop: normalizeY(40), alignItems: "center", flex: 1 }}>
                                    <Image
                                        source={require("../../assets/images/fingerprint.png")}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                    />
                                    <View style={{ flex: 0.5, marginTop: normalizeY(20), paddingTop: normalizeY(20) }}>
                                        <Text style={{ fontFamily: mulish_bold, fontSize: 20, color: theme.LABEL_COLOR }}> Fingerprint</Text>
                                    </View>
                                    <View style={{ flex: 0.5, marginTop: normalizeY(20) }}>
                                        <Text style={{ fontFamily: mulish_regular, fontSize: 15, color: theme.SEGMENTED_TEXT_COLOR }}>{`put your finger on the sencer and lift after
                you feel a vibration`}</Text>
                                    </View>
                                </View>
                                <View style={[signUpScreenStyles.button, {}]}>
                                    <TouchableOpacity
                                        style={[signUpScreenStyles.signIn, { marginTop: normalizeY(50), width: "100%" }]}
                                    >

                                        <Text style={[signUpScreenStyles.textSign, {
                                            color: '#fff'
                                        }]}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </View>
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
        width: "50%", height: 50, color: "#A1C452",
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
        fontSize: 17,
        color: theme.LABEL_COLOR,
        paddingRight: normalizeX(50),

    }
})