import React, { useRef } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    TextInput
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { normalizeFont, normalizeX, normalizeY } from "../../utils/Utils";
import Text from '../../component/common/Text'
var currencyFormatter = require('currency-formatter');
import Button from '../../component/common/Button'
import { useTheme } from '@react-navigation/native'
import { mulish_bold, mulish_medium, mulish_regular, ligh_green } from "../../utils/Constants";
import {useSelector} from 'react-redux'

export default ConvertPointsToCash = (props) => {


    const plastkPoints = useSelector(state => state.myCardReducer.totalPoints)
    const pointValue = useSelector(state => state.myCardReducer.pointValueInDollars)

    const myTheme = useTheme();

    const pointsValueToConvert = useRef('');

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={{ flex: 1 }}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

            <ScrollView showsVerticalScrollIndicator={false} style={{}}  keyboardShouldPersistTaps={'handled'}>


                <View style={styles.body}>
                    <Text style={[styles.placeholder, { color: myTheme.colors.TEXTINPUT_LABEL_COLOR, fontFamily: mulish_bold, fontSize: normalizeFont(14), marginTop: normalizeY(10) }]}>Plastk Points</Text>

                    <View style={styles.imageTextContainer}>
                        <Text style={[styles.placeholder, { color: ligh_green, fontFamily: mulish_bold, fontSize: normalizeFont(34, true) }]}>{currencyFormatter.format(plastkPoints, { code: '', precision: 0})}</Text>
                        <Image source={require('../../assets/images/p_my_list.png')} style={styles.p_logo} resizeMode="contain" />
                    </View>

                    <View style={styles.pendingPointsContainer}>
                        <Text style={{ fontSize: normalizeFont(14), color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_medium }}>Pending points</Text>
                        <Text style={{ fontSize: normalizeFont(14), color: ligh_green, fontFamily: mulish_medium, marginLeft: normalizeX(5) }}>0</Text>
                    </View>

                    <Text style={[styles.placeholder, { color: myTheme.colors.TEXTINPUT_LABEL_COLOR, fontFamily: mulish_medium, fontSize: normalizeFont(14), marginTop: normalizeY(20) }]}>Point Value</Text>

                    <View style={styles.amountContainer}>

                        <Text style={styles.amountText}>{currencyFormatter.format(pointValue, { code: 'CAD'})}</Text>
                    </View>

                    <Text style={[styles.placeholder, { color: myTheme.colors.TEXTINPUT_LABEL_COLOR, fontSize: normalizeFont(12) }]}>Select Card</Text>
                    <View style={[styles.placeholderContainer, { borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR, marginTop: normalizeY(15) }]}>
                        <Text style={[styles.placeholderText, { color: myTheme.colors.LABEL_COLOR }]}></Text>
                    </View>

                    <View style={[styles.textInputContainer, { borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR }]}>
                        <Text style={[styles.pointsValue, { color: myTheme.colors.LABEL_COLOR, }]}>Points value to convert </Text>
                        <TextInput  placeholderTextColor={myTheme.colors.LABEL_COLOR} onChangeText={text => pointsValueToConvert.current = text}
                            style={[styles.textInputStyle, { color: myTheme.colors.LABEL_COLOR, }]}
                        />
                    </View>

                    <Text style={[styles.placeholder, { color: myTheme.colors.TEXTINPUT_LABEL_COLOR, fontSize: normalizeFont(12) }]}>Equivalent Dollar value</Text>
                    <View style={[styles.placeholderContainer, { borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR }]}>
                        <Text style={[styles.placeholderText, { color: myTheme.colors.LABEL_COLOR }]}></Text>
                    </View>

                </View>

                <Button title="CONVERT POINTS" style={styles.button} />
            </ScrollView>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    body: {
        marginHorizontal: normalizeX(20),
        flex: 1
    },
    imageTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: normalizeY(-15),
    },
    placeholderContainer: {
        marginLeft: normalizeX(10),
        borderBottomWidth: 0.8,
        width: "90%",
        marginTop: normalizeY(8),
        paddingBottom: 7
    },
    placeholder: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(14),
        marginLeft: normalizeX(10),
        marginTop: normalizeY(20),
    },
    placeholderText: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(16),
    },
    p_logo: {
        height: 20,
        width: 20,
        marginTop: normalizeY(22),
        marginLeft: normalizeX(5)
    },
    pendingPointsContainer: {
        flexDirection: "row",
        marginLeft: normalizeX(10),
        marginTop: normalizeY(10),
        alignItems: 'center'
    },
    amountContainer: {
        flexDirection: "row",
        marginTop: normalizeY(5),
        alignItems: 'center',
        marginLeft: normalizeX(10)
    },
    amountText: {
        fontSize: normalizeFont(30),
        color: ligh_green,
        fontFamily: mulish_bold,
        marginLeft: normalizeX(0)
    },
    textInputContainer: {
        borderBottomWidth: 0.8,
        width: "90%",
        marginLeft: normalizeX(10),
        marginTop: normalizeY(20)
    },
    pointsValue: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12)
    },
    textInputStyle: {
        paddingBottom: 3,
        fontSize: normalizeFont(16)
    },
    button: {
        width: '80%',
        marginLeft: normalizeX(30),
        marginHorizontal: normalizeX(20),
        marginTop: normalizeY(60)
    }
})


