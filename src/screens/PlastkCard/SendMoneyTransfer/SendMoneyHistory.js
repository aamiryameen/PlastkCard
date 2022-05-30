//import liraries
import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeFont, normalizeX, normalizeY } from "../../../utils/Utils";
import { useTheme } from '@react-navigation/native'
import Text from '../../../component/common/Text'
import Feather from 'react-native-vector-icons/Feather';
import Picker from "../../../component/common/Picker";
var currencyFormatter = require('currency-formatter');
import Button from '../../../component/common/Button'
import { mulish_bold, mulish_medium, mulish_regular, ligh_green } from "../../../utils/Constants";


const SendMoneyHistory = (props) => {


    const myTheme = useTheme();


    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
                <View style={styles.body}>

                    <Text style={[styles.dateStyle, { color: myTheme.colors.LABEL_COLOR, }]}>March 05</Text>

                    <View style={styles.responseData}>

                        <Text style={[styles.name, { color: myTheme.colors.LABEL_COLOR, }]}>Albert Flores</Text>
                        <Text style={[styles.email, { color: myTheme.colors.LABEL_COLOR, }]}>albert.flores@gmail.com</Text>
                        <Text style={[styles.email, { color: myTheme.colors.LABEL_COLOR, }]}>{currencyFormatter.format(1000000, { code: 'CAD' })}</Text>
                        <Text style={styles.pending}>Pending</Text>

                    </View>


                    <Text style={[styles.dateStyle, { color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(20) }]}>March 05</Text>

                    <View style={styles.responseData}>

                        <Text style={[styles.name, { color: myTheme.colors.LABEL_COLOR, }]}>Albert Flores</Text>
                        <Text style={[styles.email, { color: myTheme.colors.LABEL_COLOR, }]}>albert.flores@gmail.com</Text>
                        <Text style={[styles.email, { color: myTheme.colors.LABEL_COLOR, }]}>{currencyFormatter.format(1000000, { code: 'CAD' })}</Text>
                        <Text style={[styles.pending, { color: ligh_green }]}>Complete</Text>

                    </View>

                </View>


            </ScrollView>


        </LinearGradient>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        marginHorizontal: normalizeX(15),
        marginTop: normalizeY(25),
        flex: 1

    },
    dateStyle: {

        fontSize: normalizeFont(16),
        fontFamily: mulish_bold
    },
    responseData: {
        marginLeft: normalizeX(15),
        marginTop: normalizeY(20)
    },
    name: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(14)
    },
    email: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12),
        marginTop: normalizeY(7)
    },
    pending: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(14),
        color: "#EF9749",
        marginTop: normalizeY(7)
    }
});


export default SendMoneyHistory;
