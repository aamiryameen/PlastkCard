import React, { useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    Image,
    BackHandler,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeX, normalizeY } from "../../../utils/Utils";
import styles from '../../ForgotPassword/ForgotPasswordSentStyle'
import theme from "../../../utils/theme";
import Button from '../../../component/common/Button';
import { verificationFailed } from '../../../assets';

export default ForgotPasswordSent = (props) => {

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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}
            style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>
            <StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={{ flex: 1.4, margin: 20, alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: normalizeY(30), backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR, elevation: 0.6 }}>
                <Image source={verificationFailed} resizeMode='cover' style={{ height: 170, width: 170, }} />
            </View>
            <View style={{ flex: 0.3 }}></View>
            <View style={{ alignItems: "center", flex: 0.5, marginHorizontal: normalizeX(4) }}>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 20, paddingHorizontal: normalizeX(10), marginHorizontal: normalizeX(10) }}>Your verification is not complete</Text>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 14, marginTop: normalizeY(15) }}>{`    Unfortunately we could not complete your 
    free verification with Equifax.`}</Text>
            </View>
            <View style={{ alignItems: "center", flex: 0.5, marginHorizontal: normalizeX(5) }}>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 15, marginTop: normalizeY(-10) }}>{`        You can be verified for free with CanadaPost 
         within the next 7 days, otherwise there
         is a charge of $24.99 afterwards.`}</Text>
            </View>
            <View style={[styles.resend_bt_container, { flex: 0.5, elevation: 30 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" />
            </View>
        </LinearGradient>
    )
}

