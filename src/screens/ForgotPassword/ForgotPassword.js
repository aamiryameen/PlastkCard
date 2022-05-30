import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StatusBar

} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import signUpScreenStyles from "../SignUp/SignUpStyle";
import styles from './ForgotPasswordStyles'
import { normalizeX, normalizeY, ValidateEmail } from "../../utils/Utils";
import TextInput from '../../component/common/TextInput';
import Button from '../../component/common/Button'
import Modal from '../../component/common/Modal'
import { forgotPasswordAction, resetForgotPasswordScreenAction } from './Actions/ForgotPasswordActions'
import CustomLoader from "../../component/common/CustomLoader";

export default ForgotPassword = (props) => {

    const myTheme = useTheme();

    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.forgotPasswordReducer.isLoading)
    const message = useSelector(state => state.forgotPasswordReducer.message)
    const isError = useSelector(state => state.forgotPasswordReducer.isError)

    const email = useRef('')

    const forgotPasswordButtonPressed = () => {

        if (isFormValid()) {

            dispatch(forgotPasswordAction(email.current))
        }

    }

    const isFormValid = () => {
        
        let validationErrors = {}

        if (email.current === undefined || email.current === '' || email.current.trim() === '')
            validationErrors.email = "Please Enter Your Email"
        else if (!ValidateEmail(email.current))
            validationErrors.email = "Please Enter Valid Email"

        if (Object.keys(validationErrors).length === 0 && validationErrors.constructor === Object) {
            setError(validationErrors)
            return true
        }
        else {
            setError(validationErrors)
            return false
        }
    }

    const showMessage = () => {

        if (message) {

            if (!isError) {
                dispatch(resetForgotPasswordScreenAction())

                setTimeout(() => {
                    props.navigation.navigate('ForgotPasswordSent', { email: email.current })
                }, 250);

            }
            else {
                return (
                    <Modal responseMessage={message} modalType="error" onPress={() => {
                        dispatch(resetForgotPasswordScreenAction())
                    }} />
                )
            }


        }
    }

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}   style={styles.container}>
         <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}/>
            
            <View style={{ flex: 0.2, marginTop: normalizeY(20), paddingTop: normalizeY(40) }}>
                <Text style={{ fontSize: 18, fontFamily: "Mulish-Bold", paddingRight: normalizeX(20), color: myTheme.colors.LABEL_COLOR}}>Let's figure this out</Text>
                <Text style={{ fontSize: 13.5, fontFamily: "Mulish-Regular", paddingTop: normalizeY(10), color: myTheme.colors.LABEL_COLOR }}>Please, enter the email address you used to register</Text>
            </View>
            <View>
                <TextInput icon='email' keyboardType="email-address" theme={myTheme} containerStyle={signUpScreenStyles.textinput_style}
                    placeholder='Email'   onChangeText={(val) => email.current = val} maxLength={40}/>
                {error.email ? <Text style={styles.errorStyle}>{error.email} </Text> : null}
            </View>
            <View style={styles.button}>
                <Button style={{ marginTop: 10 }} title="Forgot Password" onPress={() => forgotPasswordButtonPressed()} />
            </View>

    
                    { isLoading  &&
                        <CustomLoader/>
                    }

            {showMessage()}

        </LinearGradient>
    )
}
