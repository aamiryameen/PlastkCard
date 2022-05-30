import React from 'react'

import { View, StyleSheet, Image } from 'react-native'

import Text from '../../../../component/common/Text'

import { useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import { ligh_green, mulish_bold, mulish_regular } from '../../../../utils/Constants';
import { normalizeFont, normalizeY, normalizeX } from '../../../../utils/Utils';
var currencyFormatter = require('currency-formatter');




export default MyPointsView = (props) => {

    const myTheme = useTheme();

    const plastkPoints = useSelector(state => state.myCardReducer.totalPoints)
    const pointValue = useSelector(state => state.myCardReducer.pointValueInDollars)

    const pendingPoints = useSelector(state => state.myCardReducer.pendingPoints)

    return (


        <View style={{ flex: 1 }}>

            <View style={{ marginTop: normalizeY(10), paddingHorizontal: normalizeY(10) }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR }]}>Plastk Points</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.availableCreditValueText, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(plastkPoints, { code: '', precision: 0})}</Text>
                            <Image style={{ width: 20, height: 20, marginLeft: normalizeX(5), marginTop: normalizeY(7) }} resizeMode="contain" source={require('../../../../assets/images/p_my_list.png')} />
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR, textAlign: 'right' }]}>Point Value</Text>
                        <Text style={[styles.pointsValueText, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(pointValue, { code: 'CAD'})}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginTop: normalizeY(5) }}>
                    <Text style={[styles.titleText, { fontSize: normalizeFont(12), fontWeight: '600', color: myTheme.colors.LABEL_COLOR }]}>Pending Points</Text>
                    <Text style={styles.pendingTransactionsTextStyle}>{currencyFormatter.format(pendingPoints, { code: '', precision: 0 })}</Text>
                </View>

            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(13),
        fontWeight: '700',
        textAlign: 'left'
    },
    availableCreditValueText: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(24, true),
        fontWeight: '700',
        textAlign: 'left'
    },
    pointsValueText: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(24, true),
        alignSelf: 'flex-end',
        fontWeight: '700',
        textAlign: 'right'
    },
    pendingTransactionsTextStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(12),
        color: ligh_green,
        fontWeight: '600',
        textAlign: 'left'
    }

})