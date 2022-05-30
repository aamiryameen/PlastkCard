
import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    BackHandler,
    Alert,
    Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { normalizeX, normalizeY } from '../../utils/Utils'
import theme from '../../utils/theme'
import { colorWhiteffffff, ligh_green, mulish_bold, mulish_regular } from "../../utils/Constants";
export default Mylist = (props) => {

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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={{ flex: 1, }} >
            < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            />
            {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}
            {/* header style */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: "row", paddingTop: normalizeY(20), paddingHorizontal: normalizeX(5), paddingLeft: normalizeX(20) }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.my_list}>My list items</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <TouchableOpacity style={styles.empty_list_container} >
                                    <Text style={styles.empty_list} >Empty list</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View
                                style={styles.card}>
                                <View style={styles.card_item_container}>
                                    <View style={styles.fries_container}>
                                        <Image source={require('../../assets/images/french_fries1.png')} style={{ height: 60, width: 60 }} />
                                    </View>
                                    <View style={styles.items_container}>
                                        <Text style={{ color: theme.LABEL_COLOR, fontSize: 17 }}>McCain Fries</Text>
                                        <Text style={{ color: theme.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(5) }}>650g</Text>
                                        <View style={{ flexDirection: "row", marginTop: normalizeY(10) }}>
                                            <Image source={require("../../assets/images/p_my_list.png")} style={{ height: 23, width: "21%" }} />
                                            <Text style={{ color: theme.LABEL_COLOR, fontSize: 17, marginLeft: normalizeX(4) }}>1,750</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.card_item_container}>
                                    <View style={styles.fries_container}>
                                        <Image source={require('../../assets/images/french_fries2.png')} style={{ height: 60, width: 50 }} />
                                    </View>
                                    <View style={styles.items_container}>
                                        <Text style={{ color: theme.LABEL_COLOR, fontSize: 17 }}>Chocolate Chip Cookie</Text>
                                        <Text style={{ color: theme.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(5) }}>650g</Text>
                                        <View style={{ flexDirection: "row", marginTop: normalizeY(10) }}>
                                            <Image source={require("../../assets/images/p_my_list.png")} style={{ height: 24, width: "14%" }} />
                                            <Text style={{ color: theme.LABEL_COLOR, fontSize: 17, marginLeft: normalizeX(4) }}>1,750</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ ...styles.card, paddingTop: normalizeY(10), paddingBottom: normalizeY(10), flex: 0.94 }}>

                                    <View style={styles.card_item_container}>
                                        <View style={[styles.fries_container, {
                                            paddingRight: 6, height: 80,
                                            width: "16%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 10, marginTop: normalizeY(5),
                                            backgroundColor: colorWhiteffffff
                                        }]}>
                                            <Image source={require('../../assets/images/french-fries3.png')} style={{ height: 50, width: 20 }} />
                                        </View>
                                        <View style={styles.items_container}>
                                            <Text style={{ color: theme.LABEL_COLOR, fontSize: 17 }}>Dairy  queen set </Text>
                                            <Text style={{ color: theme.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(5) }}>650g</Text>
                                            <View style={{ flexDirection: "row", marginTop: normalizeY(10) }}>
                                                <Image source={require("../../assets/images/p_my_list.png")} style={{ height: 23.5, width: "19%" }} />
                                                <Text style={{ color: theme.LABEL_COLOR, fontSize: 17, marginLeft: normalizeX(4) }}>1,750</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.delete}>
                                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
                                        <MaterialCommunityIcons
                                            name="delete"
                                            color="red"
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.card_item_container}>
                                    <View style={styles.fries_container}>
                                        <Image source={require('../../assets/images/french_fries4.png')} style={{ height: 60, width: 50 }} />
                                    </View>
                                    <View style={styles.items_container}>
                                        <Text style={{ color: theme.LABEL_COLOR, fontSize: 17 }}>McCain Fries</Text>
                                        <Text style={{ color: theme.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(5) }}>650g</Text>
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Image source={require("../../assets/images/p_my_list.png")} style={{ height: 23, width: "21%" }} />
                                            <Text style={{ color: theme.LABEL_COLOR, fontSize: 17, marginLeft: normalizeX(4) }}>1,750</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    push_notification_container: {
        flex: 0.15, margin: 20, backgroundColor: theme.BACKGROUND_TERMS,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: normalizeX(10),
        elevation: 2
    },
    text: {
        color: theme.LABEL_COLOR,
        fontSize: 15,
        paddingLeft: normalizeX(20),
        fontFamily: mulish_regular
    },
    my_list: {
        marginTop: normalizeY(8),
        fontSize: 22,
        color: theme.LABEL_COLOR,
        fontFamily: mulish_bold,

    },
    empty_list_container: {
        height: 45,
        width: 90,
        marginTop: normalizeY(5),
        backgroundColor: ligh_green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    empty_list: {
        color: colorWhiteffffff
    },
    card: {
        padding: 10,
        marginLeft: normalizeX(10),
        marginRight: normalizeX(10),
        flex: 0.6,
        marginTop: normalizeY(25),
        backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR,
        borderRadius: 10

    },
    card_item_container: {
        flex: 1,
        flexDirection: "row"
    },
    fries_container: {
        height: 80,
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: colorWhiteffffff
    },
    items_container: {
        paddingLeft: normalizeX(10),
        marginTop: normalizeY(5)
    },
    delete: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        paddingLeft: normalizeX(20),
        paddingRight: normalizeX(30),
        borderRadius: 10,
        marginTop: normalizeY(25),
        marginLeft: normalizeX(10),
        backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR,
    }
})