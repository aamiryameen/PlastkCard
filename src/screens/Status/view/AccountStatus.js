import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, StatusBar, Linking, ScrollView, RefreshControl } from 'react-native';
import FundRequested from './FundRequested'
import FundsRecieved from './FundRecieved'
import CardIssued from './CardIssued'
import ProfileCreated from './ProfileCreated'
import ActivateCard from './ActivateCard'
import { useSelector, useDispatch } from 'react-redux'
import { autoSendVerificationEmailAction, getAccountStatusAction, resendVerificationEmailAction, resetAccountStatusScreen, validateEmailTokenStatusScreenAction, verifyEmailAction } from '../action/StatusAction'

import Modal from '../../../component/common/Modal'
import { profileActiveAction } from '../../Splash/Action/SplashAction';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { logFireBaseEvent } from '../../../utils/Utils';
import DialogModal from '../../../component/common/DialogModal'

import Toast from 'react-native-simple-toast';
import CustomLoader from '../../../component/common/CustomLoader';
import Snackbar from 'react-native-snackbar';
import { GENERIC_ERROR, setIsFreeUser } from '../../../utils/Constants';


export default AccountStatus = (props) => {

    const dispatch = useDispatch()
    const myTheme = useTheme()

    const isLoading = useSelector(state => state.accountStatusReducer.isLoading)
    const statusResponse = useSelector(state => state.accountStatusReducer.response)
    const isError = useSelector(state => state.accountStatusReducer.isError)

    const emailVerifiedResponse = useSelector(state => state.accountStatusReducer.emailVerifiedResponse)
    const resendVerificationEmailResponse = useSelector(state => state.accountStatusReducer.resendVerificationEmailResponse)

    const emailValidationResponse = useSelector(state => state.accountStatusReducer.emailValidationResponse)


    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {

        logFireBaseEvent('login')

        setIsFreeUser(false)

        dispatch(getAccountStatusAction())

    }, [])



    useEffect(() => {

        Linking.addEventListener('url', handleOpenURL);

        return function cleanUp() {
            Linking.removeEventListener('url', handleOpenURL);
            Snackbar.dismiss()
        }

    }, [])

    const handleOpenURL = (event) => {
        navigate(event.url);
    }

    const navigate = (url) => {
        try {
            if (url === null) {
                return
            }

            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];
            const routeName = route.split('/')[1];

            let splitted = routeName.split('?')

            if (splitted[0] === 'redirect-page') {

                if (splitted[1].includes('checkToken')) {

                    let token = splitted[1].split('=')[1];
                    if (token !== undefined && token !== '')
                        setTimeout(() => {
                            dispatch(validateEmailTokenStatusScreenAction(token))
                        }, 250);
                }
            }
        } catch (error) {

        }


    }



    const positiveButtonPressed = () => {

        dispatch(resendVerificationEmailAction())

    }

    const negativeButtonPressed = () => {

        dispatch(verifyEmailAction())
    }


    const resetAndReFetchAccountStatus = () => {

        dispatch(resetAccountStatusScreen())

        setTimeout(() => {

            dispatch(getAccountStatusAction())

        }, 250);
    }


    const onRefresh = () => {
        setRefreshing(true)


        dispatch(getAccountStatusAction())


        setTimeout(() => {

            setRefreshing(false)

        }, 200);
    }


    const handleResponse = () => {
        try {
            if (emailVerifiedResponse) {

                if (isError) {

                    setTimeout(() => {
                        Snackbar.show({
                            text: 'We could not verify your email. Try sending another email to confirm.',
                            duration: Snackbar.LENGTH_INDEFINITE,
                            textColor: 'white',
                            backgroundColor: 'red',
                            action: {
                                text: 'OK',
                                textColor: 'white',
                                onPress: () => { Snackbar.dismiss() },
                            },
                        });
                    }, 2000);

                    resetAndReFetchAccountStatus()
                }
                else {
                    Toast.showWithGravity('Email verified successfully', Toast.LONG, Toast.TOP);

                    resetAndReFetchAccountStatus()
                }

            } else if (resendVerificationEmailResponse) {

                if (isError) {
                    return (
                        <Modal responseMessage={resendVerificationEmailResponse.message} modalType="error" onPress={() => resetAndReFetchAccountStatus()} />
                    )
                }
                else {
                    Toast.showWithGravity('Verification email resent successfully', Toast.LONG, Toast.BOTTOM);

                    resetAndReFetchAccountStatus()
                }
            } else if (emailValidationResponse) {
                if (isError) {
                    return (
                        <Modal responseMessage='Email verification failed. Please retry' modalType="error" onPress={() => resetAndReFetchAccountStatus()} />
                    )
                } else {

                    Toast.showWithGravity('Email verified successfully', Toast.LONG, Toast.TOP);

                    resetAndReFetchAccountStatus()
                }
            }

            else if (statusResponse) {

                if (isError) {

                    return (
                        <Modal responseMessage={statusResponse.message} modalType="error" />
                    )
                }
                else if (!statusResponse.user.hasOwnProperty('tnc')) {

                    setTimeout(() => {
                        props.navigation.navigate("CmsContent", { slugName: "termsandconditions", isFirstOpen: true })
                    }, 250);
                }
                else if (!statusResponse.user.hasOwnProperty('disclosure_agreement')) {

                    setTimeout(() => {
                        props.navigation.navigate("CmsContent", { slugName: "disclosureagreement", isFirstOpen: true })
                    }, 250);
                }
                else {

                    if ((!statusResponse.user.hasOwnProperty('email_verified') || !statusResponse.user.email_verified) && statusResponse.status === "Funds Requested") {

                        if (!statusResponse.user.hasOwnProperty('email_verification_sent') || !statusResponse.user.email_verification_sent) {
                            dispatch(autoSendVerificationEmailAction())
                        }

                        let msg = 'Kindly validate your email address. You can find the link in the email we sent you. If you have already verified just click yes!'
                        return (<DialogModal message={msg} modalType='interactive' buttons={['Resend Email', 'Yes']}
                            positiveButtonPressed={positiveButtonPressed} negativeButtonPressed={negativeButtonPressed} hideOnClick={false} />)
                    }

                    else if (statusResponse.status === "Funds Requested") {

                        return (
                            <FundRequested props={props.navigation} response={statusResponse} />
                        )
                    }

                    else if (statusResponse.status === "Funds Received") {

                        return (
                            <FundsRecieved response={statusResponse} />
                        )
                    }

                    else if (statusResponse.status === "Profile Created") {

                        return (
                            <ProfileCreated response={statusResponse} />
                        )
                    }

                    else if (statusResponse.status === "Card Issued") {

                        return (
                            <CardIssued response={statusResponse} />
                        )
                    }

                    else if (statusResponse.status === "Activate Your Card") {

                        return (
                            <ActivateCard response={statusResponse} />
                        )
                    }

                    else if (statusResponse.status === 'Active') {
                        setTimeout(() => {
                            dispatch(profileActiveAction())
                        }, 300);

                    }

                }

            }

        } catch (error) {

            setTimeout(() => {
                Snackbar.show({
                    text: GENERIC_ERROR,
                    duration: Snackbar.LENGTH_INDEFINITE,
                    textColor: 'white',
                    backgroundColor: 'red',
                    action: {
                        text: 'OK',
                        textColor: 'white',
                        onPress: () => { Snackbar.dismiss() },
                    },
                });
            }, 2000);
        }
    }


    return (
        <LinearGradient colors={[myTheme.colors.DASHBOARD_START_GRADIENT, myTheme.colors.DASHBOARD_END_GRADIENT]} style={styles.container} >
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DASHBOARD_START_GRADIENT} />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {isLoading &&
                    <CustomLoader />
                }
                {handleResponse()}
            </ScrollView>
        </LinearGradient>
    );



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})