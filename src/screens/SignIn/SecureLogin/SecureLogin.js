import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet
} from "react-native";

import { normalizeFont, normalizeX, normalizeY } from "../../../utils/Utils";
import LinearGradient from 'react-native-linear-gradient';

import FingerPrintLogin from '../FingerPrintLogin/View/FingerPrintLogin'
import PinCodeLogin from '../PinCodeLogin/View/PinCodeLogin'
import { useTheme } from '@react-navigation/native';
import Button from "../../../component/common/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Text from "../../../component/common/Text";
import { getIsFingerPrintRegistered, getIsPinCodeRegistered, mulish_regular } from "../../../utils/Constants";


export default SecureLogin = (props) => {

    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)
    const myTheme = useTheme();

    const [isFingerPrintSupported, setFingerPrintSupported] = useState(true)

    const showSelectedScreen = () => {
        if (tabSelectedIndex === 0) {
            return (<PinCodeLogin navigation={props.navigation}/>)
        }
        else if (tabSelectedIndex === 1) {
            return (<FingerPrintLogin navigation={props.navigation}/>)
        }
    }

    useEffect(() => {

        if (props.route.params.selectedScreen === 'fingerPrint')
            setTabSelectedIndex(1)

        setFingerPrintSupported(props.route.params.isFingerPrintSupported)

    }, [])


    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={styles.gradientContainerStyle}>

            <View style={{ flex: 1, }}>

                <View style={[styles.widgetContainerStyle]}>
                    {getIsPinCodeRegistered() ?

                        <TouchableOpacity onPress={() => setTabSelectedIndex(0)}>

                            <View style={[styles.pinWidgetStyle, { backgroundColor: tabSelectedIndex === 0 ? (getIsFingerPrintRegistered() ? '#fecf31' : 'transparent') : 'transparent' }]}>

                                <EvilIcons
                                    name="lock"
                                    color={tabSelectedIndex === 0 ? ( getIsFingerPrintRegistered() ? "#fff" : myTheme.colors.LABEL_COLOR) : myTheme.colors.LABEL_COLOR}
                                    size={27}
                                    style={{ paddingRight: normalizeX(5) }}
                                />

                                <Text style={{ color: tabSelectedIndex === 0 ? ( getIsFingerPrintRegistered() ? "#fff" : myTheme.colors.LABEL_COLOR) : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>Code</Text>

                            </View>
                        </TouchableOpacity>

                        :

                        null
                    }


                    {isFingerPrintSupported && getIsFingerPrintRegistered() ?

                        <TouchableOpacity onPress={() => setTabSelectedIndex(1)}>

                            <View style={[styles.fingerPrintWidgetStyle, { backgroundColor: tabSelectedIndex === 1 ? (getIsPinCodeRegistered() ? '#fecf31' : 'transparent') : 'transparent' }]}>

                                <Ionicons
                                    name="finger-print"
                                    color={tabSelectedIndex === 1 ? ( getIsPinCodeRegistered() ? "#fff" : myTheme.colors.LABEL_COLOR) : myTheme.colors.LABEL_COLOR}
                                    size={20}
                                    style={{ paddingRight: normalizeX(5) }}
                                />

                                <Text style={{ color: tabSelectedIndex === 1 ? ( getIsPinCodeRegistered() ? "#fff" : myTheme.colors.LABEL_COLOR) : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>Fingerprint</Text>


                            </View>

                        </TouchableOpacity>

                        : null}

                </View>


                {showSelectedScreen()}

            </View>
            <View style={{ flex: 0.9 }} />
            <View style={styles.bottomButtonsView}>
                <Button onPress={() => props.navigation.goBack()} title="Login with Email/Password" style={{ width: '95%' }} />
            </View>

        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    bottomButtonsView: {
        alignItems: "center",
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
        borderColor: '#dfe1e9',
        borderRadius: 16,
        flexDirection: 'row',
        height: normalizeY(60),
        marginHorizontal: normalizeX(8),
        alignItems: 'center',
        justifyContent: "space-around"

    },
    pinWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        marginLeft: normalizeX(20),
        alignItems: 'center',
        justifyContent: "center",
        width: '80%',
        overflow: "hidden"

    },
    fingerPrintWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginLeft: normalizeX(10),
        overflow: "hidden"
    }

})

