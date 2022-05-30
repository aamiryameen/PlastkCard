import React, { useState, useEffect } from 'react';
import { View, Image, useColorScheme } from 'react-native';
import AppDrawer from '../../../component/drawer/AppDrawer';
import FCSAppDrawer from '../../../component/drawer/FCSAppDrawer'
import AuthStackScreen from '../../AuthStackScreen';
import StatusScreensStack from '../../StatusScreensStack';
import { colorWhiteffffff, getAuthenticationToken, IS_FINGER_PRINT_LOGIN_REGISTERED, IS_FIRST_TIME_LOGIN, IS_PIN_CODE_LOGIN_REGISTERED, setFCMDeviceID, setIsAutoSecureLoginShown, setIsDarkModeEnabled, setIsFingerPrintRegistered, setIsFirstLogin, setIsPinCodeRegistered, setLoginTries, setMyCreditAuthDone, SMART_LOOK_API_KEY } from '../../../utils/Constants';
import { useSelector, useDispatch } from 'react-redux';
import {
    NavigationContainer,
} from '@react-navigation/native';
import { darkThemeStyle, defaultTheme } from '../../../utils/AppTheme';
import { EventRegister } from 'react-native-event-listeners';
import { getDataFromUserDefaults, logFireBaseEvent } from '../../../utils/Utils';
import { logoutAppAction } from '../Action/SplashAction';
import UserInactivity from 'react-native-user-inactivity';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
import analytics from '@react-native-firebase/analytics';
import { splashAnimation } from '@assets';
import { getApplicationName } from 'react-native-device-info';

var Smartlook = require('smartlook-react-native-wrapper');

export default splash = () => {

    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    const isSuccess = useSelector(state => state.SignInSuccessReducer.isSuccess)
    const isProfileActive = useSelector(state => state.SignInSuccessReducer.isProfileActive)
    const stack = useSelector(state => state.SignInSuccessReducer.stack)

    const [loading, setLoading] = useState(true)

    const [active, setActive] = useState(true);
    const [timer, setTimer] = useState((__DEV__ ? 1 : 2) * 60000);

    const [isEnabledOne, setIsEnabledOne] = useState(false);

    const dispatch = useDispatch()

    let appTheme = isEnabledOne ? darkThemeStyle : defaultTheme;


    const colorScheme = useColorScheme();


    useEffect(() => {

        if (!(__DEV__ || getApplicationName().includes('UAT'))) {
            Smartlook.setupAndStartRecording(SMART_LOOK_API_KEY);
        }


        let listener = EventRegister.addEventListener('appThemeChange', data => {
            setIsEnabledOne(data)

            logFireBaseEvent(true ? 'dark_mode' : 'light_mode')
        }, []);

        return () => {
            EventRegister.removeEventListener(listener)
            dispatch(logoutAppAction())
            setIsAutoSecureLoginShown(false)
            setMyCreditAuthDone(false)

            if (!(__DEV__ || getApplicationName().includes('UAT'))) {
                Smartlook.stopRecording()
            }

        };
    }, [])

    useEffect(() => {
        
               messaging()
             .getToken()
             .then(token => {
              //console.log(token)

              setFCMDeviceID(token)
             });
       
       
             messaging().onTokenRefresh(token => {
              // console.log('refresh : ' + token)

              setFCMDeviceID(token)
             });
       

        let enabled = false;
        let unsubscribe = null;

        messaging().requestPermission().then((authStatus) => {
            enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (enabled) {
                unsubscribe = messaging().onMessage(async remoteMessage => {
                    let localNotification = Notifications.postLocalNotification({
                        body: remoteMessage.notification.body,
                        title: remoteMessage.notification.title,
                        sound: "chime.aiff",
                        silent: false,
                        category: "SOME_CATEGORY",
                        userInfo: {}
                    });
                });
            }
        });

        if (enabled) {
            return unsubscribe;
        }
    }, []);


    useEffect(() => {

        setTimeout(() => {
            setLoading(false)
        }, 2500);


        (async () => {

            let isFirst = await getDataFromUserDefaults(IS_FIRST_TIME_LOGIN)
            let isFingerPrintRegistered = await getDataFromUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED)
            let isCodeLoginRegistered = await getDataFromUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED)

            isFirst === undefined ? setIsFirstLogin(true) : setIsFirstLogin(false)

            isFingerPrintRegistered === 'true' ? setIsFingerPrintRegistered(true) : setIsFingerPrintRegistered(false)

            isCodeLoginRegistered === 'true' ? setIsPinCodeRegistered(true) : setIsPinCodeRegistered(false)

            let loginTries = await getDataFromUserDefaults('login_tries')

            loginTries === undefined ? setLoginTries(0) : setLoginTries(parseInt(loginTries))


            let isEnabled = await getDataFromUserDefaults('THEME_KEY')

            if ((isEnabled !== undefined && isEnabled === 'true') || (isEnabled === undefined && colorScheme === 'dark')) {
                setIsEnabledOne(true)
                setIsDarkModeEnabled(true)
                appTheme = darkThemeStyle
                logFireBaseEvent('dark_mode')
            } else {
                logFireBaseEvent('light_mode')
            }
        })()
    }, [])

    const onUserActivityTimeOut = (isActive) => {
        if (__DEV__) {
            return;
        }
        if (!isActive && getAuthenticationToken() !== '') {
            logFireBaseEvent('inactivity_logout')
            Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
            dispatch(logoutAppAction())
        }
        setActive(isActive);
    }

    const getStack = () => {


        if (isSuccess) {
            if (stack === 'cardHolder') {
                if (isProfileActive)
                    return (<AppDrawer />)
                else
                    return (<StatusScreensStack />)
            } else {
                return (<FCSAppDrawer />)
            }
        }
        else
            return (<AuthStackScreen />)

    }

    return (
        <View style={{ flex: 1, backgroundColor: isEnabledOne ? '#212535' : '#fff' }}>

            <UserInactivity
                isActive={active}
                timeForInactivity={timer}
                onAction={isActive => { onUserActivityTimeOut(isActive) }}>

                {loading ?
                    <View style={{ flex: 1, backgroundColor: colorWhiteffffff }}>
                        <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={splashAnimation} resizeMode='contain' style={{ width: '50%', height: '50%', alignSelf: 'center' }} />
                        </View>
                    </View> :

                    <NavigationContainer theme={appTheme} ref={navigationRef}
                        onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
                        onStateChange={async () => {
                            const previousRouteName = routeNameRef.current;
                            const currentRouteName = navigationRef.current.getCurrentRoute().name

                            if (previousRouteName !== currentRouteName) {

                                await analytics().logScreenView({
                                    screen_name: currentRouteName,
                                    screen_class: currentRouteName,
                                });
                            }

                            // Save the current route name for later comparision
                            routeNameRef.current = currentRouteName;
                        }}
                    >

                        {getStack()}
                    </NavigationContainer>
                }

            </UserInactivity>
        </View>
    )

}