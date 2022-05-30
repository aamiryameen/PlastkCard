

import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet} from "react-native";
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const { width } = Dimensions.get("window");
import { normalizeFont, normalizeX, normalizeY } from "../../utils/Utils";
import LinearGradient from 'react-native-linear-gradient';
import PinCodeSignUpScreen from "./PinScreen/PinCodeSignUpScreen";
import FingerPrintSignUpScreen from "./FingerPrintScreen/FingerPrintSignUpScreen";
import { signInSuccess } from "../Splash/Action/SplashAction";
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { performEmailPasswordSignIn, resetEmailPasswordSignIn } from "../SignIn/EmailPasswordSignIn/action/EmailPasswordSignInAction";
import { getEmail, getFCMDeviceID, getPassword, SKIP_REGISTER_SECURE_LOGIN_SCREEN } from "../../utils/Constants";
import CustomLoader from "../../component/common/CustomLoader";


class RegisterSecureLogin extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {


        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => {
                this.setState({ isFingerPrintSupported: true })
            })
            .catch(error => {
                if (error.name === 'FingerprintScannerNotSupported' || error.name === 'FingerprintScannerNotAvailable') {
                    this.setState({ isFingerPrintSupported: false })
                }
            });

    }

    componentWillUnmount() {
        FingerprintScanner.release()
    }

    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000,
        isFingerPrintSupported: true
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
            duration: 100,
            useNativeDriver: true
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        }
    };

    skipButtonPressed = () => {

        let loginDataObject = {}

        loginDataObject.email = getEmail()
        loginDataObject.password = getPassword()
        loginDataObject.fcm_device_id = getFCMDeviceID() 
        this.props.performLogin(loginDataObject, SKIP_REGISTER_SECURE_LOGIN_SCREEN)
    }

    handleResponse = () => {

        if (this.props.response) {
            if (this.props.isError) {
                return (
                    <Modal responseMessage={this.props.response.message} modalType='error' onPress={() => this.props.resetReducer(SKIP_REGISTER_SECURE_LOGIN_SCREEN)} />
                )
            }
            else {
                this.props.resetReducer(SKIP_REGISTER_SECURE_LOGIN_SCREEN)

                if(this.props.response.is_free === false) {
                    setTimeout(() => {
                        this.props.loginSuccess('cardHolder')
                    }, 500);
                } else {
                    setTimeout(() => {
                        this.props.loginSuccess('freeUser')
                    }, 500);
                }
               
            }
        }


    }


    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY,
            isFingerPrintSupported
        } = this.state;
        return (
            <LinearGradient colors={[this.props.route.params.theme.colors.DARK_GRADIENT_FIRST_COLOR, this.props.route.params.theme.colors.DARK_GRADIENT_SECOND_COLOR]}   style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: normalizeY(20),
                            marginBottom: normalizeY(20),
                            height: normalizeY(50),
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'grey',
                            
                        }}>
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: isFingerPrintSupported ? '45%' : '96%',
                                top: 5,
                                left: 7,
                                right: 5,
                                bottom: 5,
                                backgroundColor: "#FECF31",
                                borderRadius: 10,
                                transform: [{ translateX }]
                            }}
                        />
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                            onLayout={event => this.setState({ xTabOne: event.nativeEvent.layout.x })}
                            onPress={() => this.setState({ active: 0 }, () => this.handleSlide(xTabOne))}
                        >
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <EvilIcons
                                    name="lock"
                                    color={active === 0 ? "#fff" : this.props.route.params.theme.colors.LABEL_COLOR}
                                    size={27}
                                    style={{ paddingRight: normalizeX(5) }}
                                />
                                <Text
                                    style={{
                                        color: active === 0 ? "#fff" : this.props.route.params.theme.colors.LABEL_COLOR
                                    }}
                                >
                                    Code
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {isFingerPrintSupported ? <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
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
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Ionicons
                                    name="finger-print"
                                    color={active === 1 ? "#fff" : this.props.route.params.theme.colors.LABEL_COLOR}
                                    size={20}
                                    style={{ paddingRight: normalizeX(5) }}
                                />
                                <Text
                                    style={{
                                        color: active === 1 ? "#fff" : this.props.route.params.theme.colors.LABEL_COLOR
                                    }}
                                >
                                    Fingerprint
                                </Text>
                            </View>
                        </TouchableOpacity> : null}
                    </View>

                    <Animated.View
                        style={{ transform: [{ translateX: translateXTabOne }] }}
                        onLayout={event =>
                            this.setState({
                                translateY: event.nativeEvent.layout.height
                            })
                        }
                    >
                        <PinCodeSignUpScreen />
                        <View style={{ alignSelf: 'center', marginTop: normalizeY(20) }}>
                            <TouchableOpacity onPress={() => this.skipButtonPressed()}>

                                <Text style={{ color: "#a1c452", fontSize: normalizeFont(24) }}>Skip</Text>
                            </TouchableOpacity>
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
                        <FingerPrintSignUpScreen />
                        <View style={{ alignSelf: 'center', marginTop: normalizeY(20) }}>
                            <TouchableOpacity onPress={() => this.skipButtonPressed()}>
                                <Text style={{ color: "#a1c452", fontSize: normalizeFont(24) }}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>

                {this.props.isLoading &&
                    <CustomLoader/>
                }
                {this.handleResponse()}
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalizeX(12),
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

const mapDispatchToProps = dispatch => {
    return {
        loginSuccess: (stack) => dispatch(signInSuccess(stack)),
        performLogin: (loginData, viewType) => dispatch(performEmailPasswordSignIn(loginData, viewType)),
        resetReducer: (viewType) => dispatch(resetEmailPasswordSignIn(viewType))
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.skipSecureRegisterReducer.isLoading,
        response: state.skipSecureRegisterReducer.response,
        isError: state.skipSecureRegisterReducer.isError,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterSecureLogin)
