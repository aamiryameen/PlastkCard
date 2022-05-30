
import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { normalizeX, normalizeY } from '../../utils/Utils'
import theme from '../../utils/theme'
import { useTheme } from '@react-navigation/native'
import { mulish_regular } from "../../utils/Constants";
import Text from '../../component/common/Text'

export default Legal = (props) => {



    const myTheme = useTheme();

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1, }} >

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />


            <View style={styles.body}>



                <TouchableOpacity style={styles.cont} onPress={() => props.navigation.navigate("CmsContent", { slugName: "privacypolicy" })} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.push_notification_container} >
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Privacy Policy</Text>
                    </LinearGradient>

                </TouchableOpacity>

                <TouchableOpacity style={styles.cont} onPress={() => props.navigation.navigate("CmsContent", { slugName: "termsandconditions" })} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.push_notification_container} >
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Terms & Conditions</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cont} onPress={() => props.navigation.navigate("CmsContent", { slugName: "creditagrement" })} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.push_notification_container} >
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Credit Agreement</Text>
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity style={styles.cont} onPress={() => props.navigation.navigate("CmsContent", { slugName: "disclosureagreement" })} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.push_notification_container} >
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Disclosure Agreement</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cont} onPress={() => props.navigation.navigate("CmsContent", { slugName: "my-credit-score" })} activeOpacity={1}>
                    <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.push_notification_container} >
                        <Text style={[styles.text, { color: myTheme.colors.LABEL_COLOR }]}>Credit Score Agreement</Text>
                    </LinearGradient>
                </TouchableOpacity>


            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    cont: {
        marginTop: normalizeY(10),
        borderRadius: 10,
        borderRadius: 10,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 }
    },
    push_notification_container: {
        height: 64,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",

    },
    text: {
        color: theme.LABEL_COLOR,
        fontSize: 15,
        marginLeft: normalizeX(20),
        fontFamily: mulish_regular
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(20),
        marginTop: normalizeY(20)
    }
})
