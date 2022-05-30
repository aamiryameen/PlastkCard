import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StatusBar,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { normalizeX, normalizeY } from '../../utils/Utils'
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import Button from '../../component/common/Button'
import { passwordChanged } from '../../assets';
import { logoutAppAction } from '../../screens/Splash/Action/SplashAction'
import { useDispatch } from "react-redux";

export default UpdatedPassword = (props) => {
    const myTheme = useTheme();
    const dispatch = useDispatch();
    const isBackOverRiddenRef = useRef(false)
    useEffect(() => {
        props.navigation.addListener('beforeRemove', (e) => {

            if (isBackOverRiddenRef.current === false) {

                isBackOverRiddenRef.current = true
                e.preventDefault();
                dispatch(logoutAppAction())
            }
        })
    }, []);

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={[styles.container]} >

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />
            <View style={{ height: 260, width: "90%", margin: 20, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: myTheme.colors.BACKGROUND_COLOR, elevation: 6 }}>
                <Image source={passwordChanged} resizeMode='contain' style={{ height: normalizeY(350), width: normalizeX(300) }} />
            </View>

            <View style={{ flex: 0.4 }}></View>
            <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: 28 }}>Password Updated</Text>
                <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: 15, marginTop: normalizeY(30),textAlign:'center' }}>Your password was just updated !</Text>
                <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: 15, marginTop: normalizeY(10),textAlign:'center' }}>You will now be logged out of the App. Kindly login again to continue</Text>

            </View>

            <View style={[styles.resend_bt_container, { flex: 0.5, elevation: 30 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" onPress={() => dispatch(logoutAppAction())} />
            </View>
        </LinearGradient>
    )
}

