import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";

import { normalizeFont, normalizeX, normalizeY } from "../../../utils/Utils";
import LinearGradient from 'react-native-linear-gradient';
import SendMoneyHistory from './SendMoneyHistory'
import SendMoney from './SendMoney'
import { useTheme } from '@react-navigation/native';
import Text from "../../../component/common/Text";
import { mulish_regular } from "../../../utils/Constants";


export default SecureLogin = (props) => {

    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)
    const myTheme = useTheme();

    const showSelectedScreen = () => {
        if (tabSelectedIndex === 0) {
            return (<SendMoney />)
        }
        else if (tabSelectedIndex === 1) {
            return (<SendMoneyHistory />)
        }
    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={styles.gradientContainerStyle}>
            <ScrollView showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps={'handled'}>
                <View style={{ alignItems: "center" }}>

                    <View style={[styles.widgetContainerStyle, {borderColor: myTheme.colors.SEGMENTED_BORDER_COLOR }]}>

                        <TouchableOpacity onPress={() => setTabSelectedIndex(0)}>

                            <View style={[styles.pinWidgetStyle, { backgroundColor: tabSelectedIndex === 0 ? '#fecf31' : 'transparent' }]}>
                                <Text style={{ color: tabSelectedIndex === 0 ? "#fff" : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>Send Money</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setTabSelectedIndex(1)}>

                            <View style={[styles.fingerPrintWidgetStyle, { backgroundColor: tabSelectedIndex === 1 ? '#fecf31' : 'transparent' }]}>
                                <Text style={{ color: tabSelectedIndex === 1 ? "#fff" : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>History</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {showSelectedScreen()}

            </ScrollView>
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
        paddingTop: normalizeY(30)
    },
    widgetContainerStyle: {

        borderWidth: 1,
        borderRadius: 16,
        flexDirection: 'row',
        height: normalizeY(60),
        paddingHorizontal: normalizeX(10),
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "92%"
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

