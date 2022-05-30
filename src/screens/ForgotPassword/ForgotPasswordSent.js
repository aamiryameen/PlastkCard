import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Linking,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import signUpScreenStyles from "../SignUp/SignUpStyle";
import { normalizeX, normalizeY, openLink } from "../../utils/Utils";
import styles from '../ForgotPassword/ForgotPasswordSentStyle';
import theme from '../../utils/theme';
import { useTheme } from '@react-navigation/native';
import Button from '../../component/common/Button';
import { FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN, ligh_green, mulish_bold, mulish_regular } from "../../utils/Constants";
import { useDispatch, useSelector } from 'react-redux';
import { resendForgotPasswordAction, resetResendForgotPasswordScreenAction } from "./Actions/ForgotPasswordActions";
import Modal from '../../component/common/Modal';
import { validateSetPasswordTokenAction } from "../SignIn/EmailPasswordSignIn/action/EmailPasswordSignInAction";
import { emailSent } from '../../assets';
import CustomLoader from "../../component/common/CustomLoader";

export default ForgotPasswordSent = (props) => {

    const myTheme = useTheme();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.forgotPasswordReducer.isLoading);
    const response = useSelector(state => state.forgotPasswordReducer.resendPasswordResponse);
    const isError = useSelector(state => state.forgotPasswordReducer.isError);
    const token = useRef('');
    const tokenValidationResponse = useSelector(state => state.forgotPasswordSuccessLoginReducer.tokenValidationResponse);

    const isForgotPasswordRef = useRef(false)

    useEffect(() => {

        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                navigate(url);
            });

            Linking.addEventListener('url', handleOpenURL);
        } else {
            Linking.addEventListener('url', handleOpenURL);
        }

        return function cleanUp() {
            Linking.removeEventListener('url', handleOpenURL);
        }

    }, [])


    const navigate = (url) => {
        try {
            if (url === null) {
                return
            }

            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];
            const routeName = route.split('/')[1];

            let splitted = routeName.split('?');

            if (splitted[0] === 'set-password') {

                if (splitted[1].split('=')[1].includes('resetPassword')) {
                    isForgotPasswordRef.current = true
                }

                if (isForgotPasswordRef.current)
                    token.current = splitted[1].split('=')[1].split('&')[0];
                else
                    token.current = splitted[1].split('=')[1];

                if (token.current !== undefined && token.current !== '')
                    setTimeout(() => {
                        dispatch(validateSetPasswordTokenAction(token.current, FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN))
                    }, 250);

            }
        }
        catch (error) {

        }


    }

    const handleOpenURL = (event) => {
        navigate(event.url);
    }

    const tokenValidation = () => {
        if (tokenValidationResponse !== '') {
            let resp = tokenValidationResponse

            setTimeout(() => {
                if (resp === 'success')
                    props.navigation.navigate("SetPassword", { token: token.current, isForgotPassword: isForgotPasswordRef.current })
                else
                    props.navigation.navigate("ForgotPassword")
            }, 250);
        }
    }


    const reSendButtonPressed = () => {

        dispatch(resendForgotPasswordAction(props.route.params.email))
    }


    const handleResponse = () => {

        if (response) {

            return (
                <Modal responseMessage={response.message} modalType={isError ? "error" : 'success'} onPress={() => {
                    dispatch(resetResendForgotPasswordScreenAction())
                }} />
            )

        }
    }

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />
            <View style={{ marginHorizontal: normalizeX(20), marginTop: normalizeY(10) }}>
                <View style={{ height: 260, width: "100%", borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: myTheme.colors.BACKGROUND_COLOR, elevation: 5 }}>
                    <Image source={emailSent} resizeMode='contain' style={{ height: normalizeY(350), width: normalizeX(300), }} />
                </View>

                <View style={{ flex: 0.2, alignItems: "center", marginTop: normalizeY(5) }}>
                    <Text style={{ fontSize: 22, fontFamily: mulish_bold, paddingRight: normalizeX(20), paddingLeft: normalizeX(-20), color: myTheme.colors.LABEL_COLOR }}>Email Sent</Text>
                </View>

                <View style={{ marginTop: normalizeY(30), }}>
                    <Text style={{ fontSize: 15, fontFamily: mulish_regular, paddingRight: normalizeX(5), paddingLeft: normalizeX(-20), color: myTheme.colors.LABEL_COLOR }}>Email successfully sent to </Text>
                    <Text style={{ fontSize: 16, fontFamily: mulish_bold, color: ligh_green, marginLeft: normalizeX(20) }}>{props.route.params.email}</Text>
                </View>
                <Text style={{ fontSize: 15, fontFamily: mulish_regular, paddingTop: normalizeY(7), color: myTheme.colors.LABEL_COLOR }}>Please check your email for password reset link </Text>
                <Text style={{ fontSize: 15, fontFamily: mulish_regular, paddingTop: normalizeY(27), marginTop: normalizeY(20), color: myTheme.colors.LABEL_COLOR }}>If you don’t receive the email, please contact </Text>
                <View style={{ flexDirection: "row", marginHorizontal: normalizeX(10), }}>
                    <TouchableOpacity onPress={() => openLink('hello@plastk.ca')}>
                        <Text style={{ fontSize: 16, fontFamily: mulish_bold, color: myTheme.colors.LABEL_COLOR }}>hello@plastk.ca</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15, fontFamily: mulish_regular, color: myTheme.colors.LABEL_COLOR }}> or click the resend button</Text>
                </View>
                <View style={styles.resend_bt_container}>
                    <Button style={styles.resend_btn}
                        titleStyle={[styles.resend_text, {
                        }]}
                        title="Resend" onPress={() => reSendButtonPressed()} />
                </View>
                <View style={styles.resend_bt_container}>
                    <Button style={signUpScreenStyles.signIn}
                        titleStyle={[signUpScreenStyles.textSign, {
                            color: '#fff'
                        }]} title="Ok!" onPress={() => props.navigation.navigate('SignIn')} />

                    {isLoading &&
                        <CustomLoader />
                    }
                </View>

                {handleResponse()}
                {tokenValidation()}
            </View>
        </LinearGradient>
    )
}

