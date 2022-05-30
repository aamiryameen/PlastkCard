import React from 'react'

import {View, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@react-navigation/native';
import Text from '../../../../component/common/Text'
import { mulish_regular } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';




export default SavingsAccelerator = (props) => {

    const myTheme = useTheme();

    return (

        <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.linearGradientContainer}>

            <View style={{  marginHorizontal: normalizeX(20),marginVertical: normalizeY(20)}}>
                <View>
                    <Text style = {[styles.headerTextStyle, {color : myTheme.colors.LABEL_COLOR}]}>Savings Accelerator</Text>
                </View>

                <View style={{flexDirection : 'row', justifyContent: 'space-between', marginTop: normalizeY(20)}}>
                    <View>
                        <Text style = {[styles.titleTextStyle, {color : myTheme.colors.LABEL_COLOR}]}>Points</Text>
                        <Text style = {[styles.valueTextStyle, {color : myTheme.colors.LABEL_COLOR}]}>0</Text>
                    </View>

                    <View>
                        <Text style = {[styles.titleTextStyle, {color : myTheme.colors.LABEL_COLOR}]}>Value</Text>
                        <Text style = {[styles.valueTextStyle, {color : myTheme.colors.LABEL_COLOR}]}>$ 0</Text>
                    </View>

                </View>

            </View>



        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    linearGradientContainer : {
        flex: 1,
        borderRadius: 10,
        elevation: 10,
        marginTop : normalizeY(30)
    },
    headerTextStyle : {
        fontFamily: mulish_regular,
        fontWeight: '600',
        fontSize: normalizeFont(16)
    },
    titleTextStyle : {
        fontFamily: mulish_regular,
        fontWeight: '400',
        fontSize: normalizeFont(14)
    },
    valueTextStyle : {
        fontFamily: mulish_regular,
        fontWeight: '700',
        fontSize: normalizeFont(24,true)
    }

})