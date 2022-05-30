import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import {
    useTheme,
} from '@react-navigation/native';

import SignInScreen from './SignIn/EmailPasswordSignIn/view/SignIn'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ForgotPasswordSent from './ForgotPassword/ForgotPasswordSent'
import FingerPinSignUp from './SignUp/FingerPinSignUp'
import LoginFingerPin from './Profile/LoginFingerPin'
import PersonalInfoStepOne from './SignUp/signup/View/PersonalInfo'
import AddressStepOne from './SignUp/signup/View/Address'
import EmploymentInfoStepOne from './SignUp/signup/View/EmploymentInfo'
import FinancialInfoStepOne from './SignUp/signup/View/FinancialInfo'
import Header from '../component/common/Header'
import SetPassword from './SignUp/./setPassword/view/SetPassword'
import Modal from '../component/common/Modal'
import ApplicationSubmitted from './SignUp/ApplicationSubmitted'
import RegisterSecureLogin from './RegisterSecureLogin/RegisterSecureLogin'
import SecureLogin from './SignIn/SecureLogin/SecureLogin'
import FcsSignUp from './FreeCreditScore/FCSRegister/View/fcsSignup'
import CmsContent from '../screens/Profile/CMSContent/View/CMSView'

export default AuthStackScreen = (props) => {


    const Stack = createStackNavigator();

    const appTheme = useTheme()

    return (


        <Stack.Navigator
            headerMode={'screen'}
            screenOptions={{
                header: ({ scene, navigation }) => <Header onPress={navigation.goBack} title={scene.descriptor.options.headerTitle} myThemeStyle={appTheme} />
            }}
            initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ header: (props) => null }} />
            <Stack.Screen name="RegisterSecureLogin" component={RegisterSecureLogin} options={{ headerTitle: 'Register Secure Login' }} />
            <Stack.Screen name="SecureLogin" component={SecureLogin} options={{ headerTitle: 'Secure Login' }} />
            <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerTitle: 'Create Profile' }} />
            <Stack.Screen name="Modal" component={Modal} options={{ header: (props) => null }} />
            <Stack.Screen name="PersonalInfoStepOne" component={PersonalInfoStepOne} options={{ headerTitle: 'Sign Up' }} />
            <Stack.Screen name="AddressStepOne" component={AddressStepOne} options={{ headerTitle: 'Sign Up' }} />
            <Stack.Screen name="EmploymentInfoStepOne" component={EmploymentInfoStepOne} options={{ headerTitle: 'Sign Up' }} />
            <Stack.Screen name="FinancialInfoStepOne" component={FinancialInfoStepOne} options={{ headerTitle: 'Sign Up' }} />
            <Stack.Screen name="LoginFingerPin" component={LoginFingerPin} options={{ headerTitle: 'sign in' }} />
            <Stack.Screen name="FingerPinSignUp" component={FingerPinSignUp} options={{ headerTitle: 'Set Code' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: 'Forgot Password' }} />
            <Stack.Screen name="ForgotPasswordSent" component={ForgotPasswordSent} options={{ header: (props) => null }} />
            <Stack.Screen name="ApplicationSubmitted" component={ApplicationSubmitted} options={{ header: (props) => null }} />
            <Stack.Screen name="FcsSignUp" component={FcsSignUp} options={{ headerTitle: 'Free Credit Score Sign Up' }} />
            <Stack.Screen name="CmsContent" component={CmsContent} options={{ headerTitle: '', animationEnabled: false }} />
        </Stack.Navigator>
    )


}