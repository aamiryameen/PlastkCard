import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Text from "../../../../component/common/Text";
import VerifyPayment from './VerifyPayment'
import VerifyPaymentHistory from './VerifyPaymentHistory'
import { mulish_regular } from "../../../../utils/Constants";
import { normalizeFont, normalizeX, normalizeY } from "../../../../utils/Utils"
import { useDispatch } from 'react-redux'
import { resetInteracCodePaymentScreenCompleteAction } from "../Actions/VerifyPaymentActions";

export default VerifyPaymentScreen = (props) => {

    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)
    const myTheme = useTheme();

    const showSelectedScreen = () => {
        if (tabSelectedIndex === 0) {
            return (<VerifyPayment navigation={props.navigation} />)
        }
        else if (tabSelectedIndex === 1) {
            return (<VerifyPaymentHistory />)
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {

        return function cleanUp() {
            dispatch(resetInteracCodePaymentScreenCompleteAction())
        }

    }, [])

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={styles.gradientContainerStyle}>
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <View style={{ alignItems: "center" }}>

                <View style={[styles.widgetContainerStyle]}>

                    <TouchableOpacity onPress={() => setTabSelectedIndex(0)}>

                        <View style={[styles.pinWidgetStyle, { backgroundColor: tabSelectedIndex === 0 ? '#fecf31' : 'transparent' }]}>
                            <Text style={{ color: tabSelectedIndex === 0 ? "#fff" : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>Verify Funds</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTabSelectedIndex(1)}>

                        <View style={[styles.fingerPrintWidgetStyle, { backgroundColor: tabSelectedIndex === 1 ? '#fecf31' : 'transparent' }]}>
                            <Text style={{ color: tabSelectedIndex === 1 ? "#fff" : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>Payment History</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            {showSelectedScreen()}

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    bottomButtonsView: {
        marginTop: normalizeY(15),
        flex: 0.3
    },
    gradientContainerStyle: {
        flex: 1,
        paddingHorizontal: normalizeX(10),
        paddingTop: normalizeY(30),
    },
    widgetContainerStyle: {
        borderWidth: 1,
        borderColor: '#dfe1e9',
        borderRadius: 16,
        flexDirection: 'row',
        height: normalizeY(60),
        paddingHorizontal: normalizeX(10),
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    pinWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        marginLeft: normalizeX(10),
        alignItems: 'center',
        justifyContent: "center",
        width: '80%'
    },
    fingerPrintWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%'
    }

})

