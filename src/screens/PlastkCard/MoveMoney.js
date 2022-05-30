
import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { normalizeX, normalizeY, normalizeFont } from '../../utils/Utils'
import { useTheme } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mulish_bold, Moderateyellow } from "../../utils/Constants";

import Text from '../../component/common/Text'

export default MoveMoney = (props) => {

    const myTheme = useTheme();

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1, }} >

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <View style={styles.body}>

                <TouchableOpacity onPress={() => props.navigation.navigate('ConvertPointsToCash')} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.passwordText, { color: myTheme.colors.LABEL_COLOR }]}>Convert points into dollars</Text>
                        <Ionicons
                            name="md-chevron-forward"
                            color={Moderateyellow}
                            size={25}
                            style={styles.iconStyle}
                        />
                    </LinearGradient>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('SendMoneyTransfer')} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.passwordText, { color: myTheme.colors.LABEL_COLOR }]}>Send Money E-Transfer</Text>
                        <Ionicons
                            name="md-chevron-forward"
                            color={Moderateyellow}
                            size={25}
                            style={styles.iconStyle}
                        />
                    </LinearGradient>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('RequestMoneyTransfer')} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.passwordText, { color: myTheme.colors.LABEL_COLOR }]}>Request Money E-Transfer</Text>
                        <Ionicons
                            name="md-chevron-forward"
                            color={Moderateyellow}
                            size={25}
                            style={styles.iconStyle}
                        />
                    </LinearGradient>

                </TouchableOpacity>

            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: 70,
        width: 340,
        borderRadius: 16,
        elevation: 5,
        marginTop: normalizeY(10)

    },
    passwordText: {
        alignItems: "flex-start",
        marginHorizontal: normalizeX(5),
        flex: 0.95,
        fontSize: normalizeFont(14),
        fontFamily: mulish_bold,
        marginLeft: normalizeX(20)
    },
    iconStyle: {
        alignItems: "flex-start",
        marginTop: normalizeY(1),
        marginRight: normalizeX(10)
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(10),
        marginTop: normalizeY(30),
        alignItems: "center"
    }
})
