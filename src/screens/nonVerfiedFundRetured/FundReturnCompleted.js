import React, { useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    Image,
    BackHandler, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeX, normalizeY } from "../../utils/Utils";
import ForgotPasswordSentStyle from '../ForgotPassword/ForgotPasswordSentStyle';
import Button from '../../component/common/Button';
import theme from "../../utils/theme";
import { idVerificationComplete } from '../../assets';

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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={[ForgotPasswordSentStyle.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={{ flex: 1.4, margin: 20, alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: normalizeY(5), backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR }}>
                <Image source={idVerificationComplete} resizeMode='cover' style={{ height: 170, width: 210, }} />
            </View>
            <View style={{ flex: 0.4 }}></View>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 20 }}>{`     CANADA POST ID VERIFICATION
                    COMPLETE`}</Text>
            </View>

            <View style={[ForgotPasswordSentStyle.resend_bt_container, { flex: 0.5, elevation: 10 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" />

            </View>
        </LinearGradient>
    )
}

