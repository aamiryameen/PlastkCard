import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    BackHandler, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeY } from "../../utils/Utils";
import styles from '../ForgotPassword/ForgotPasswordSentStyle'
import theme from '../../utils/theme'
import Button from '../../component/common/Button'
import { fundsRequested } from '../../assets';

export default SecuredFundReceived = (props) => {

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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>
            <StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            <View style={{ flex: 1.4, margin: 20, alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: normalizeY(30), backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR, elevation: 0.6 }}>
                <Image source={fundsRequested} resizeMode='cover' style={{ height: 170, width: 170, }} />
            </View>
            <View style={{ flex: 0.3 }}></View>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 20 }}>Secured Funds Received</Text>
                <Text style={{ color: theme.LABEL_COLOR, fontSize: 13, marginTop: normalizeY(30) }}>Plastk has received your Security deposit of $3000.</Text>
            </View>
            <View style={[styles.resend_bt_container, { flex: 0.5, elevation: 30 }]}>
                <Button style={{ marginTop: 10 }} title="Ok!" />

            </View>
        </LinearGradient>
    )
}

