
import React, { useState} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
import { useTheme } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { normalizeFont, normalizeY, normalizeX } from '../../utils/Utils';
import { getIsDarkModeEnabled, ligh_green, mulish_bold, setIsDarkModeEnabled } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

const Settings = () => {

    const myTheme = useTheme();

    const [isEnabled, setEnabled] = useState(getIsDarkModeEnabled())

    const storeTheme = async (key, appTheme) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(appTheme))
            setEnabled(appTheme);
            setIsDarkModeEnabled(appTheme)
            EventRegister.emit('appThemeChange', appTheme)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <View style={styles.profileContainer}>
                <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={[styles.style, { elevation: 3, borderRadius: 16 }]}>

                    <Text style={[styles.darkModeText, { color: myTheme.colors.LABEL_COLOR }]}>Dark Mode</Text>
                    <View style={styles.switchContainer} >
                        <ToggleSwitch
                            onColor={ligh_green}
                            offColor="#dcdcdc"
                            isOn={isEnabled}
                            onToggle={() => storeTheme("THEME_KEY", !isEnabled)}
                        />
                    </View>
                </LinearGradient>
            </View>

        </LinearGradient>
    );
};




const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    profileContainer: {
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
        alignItems: "center",
        marginTop: normalizeY(10)
    },
    style: {
        flexDirection: "row",
        width: "85%",
        height: normalizeY(50),
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: normalizeX(30),
    },
    darkModeText: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(13),
        textAlign: 'center'

    },
    switchContainer: {
        justifyContent: "flex-end",
        flex: 1,
        alignItems: "flex-end",
        paddingRight: normalizeX(10)
    },
})

export default Settings;
