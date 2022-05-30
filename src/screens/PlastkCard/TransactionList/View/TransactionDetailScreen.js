import React from 'react'

import { View, StyleSheet } from 'react-native'

import Text from '../../../../component/common/Text'
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from '@react-navigation/native';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import Moment from 'moment'
import { colorRedDC143C, ligh_green, mulish_regular } from '../../../../utils/Constants';
var currencyFormatter = require('currency-formatter');




export default TransactionDetailScreen = (props) => {

    const myTheme = useTheme();


    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Description</Text>

            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{props.route.params.item.Description}</Text>

            <View style={[styles.borderSpaceStyle]} />



            {
                props.route.params.item.TransactionTypeCode === 'C' ?
                    <>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>{props.route.params.item.RewardPoints >= 0 ? 'Points Earned' : 'Points Redeemed'}</Text>
                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(Math.abs(props.route.params.item.RewardPoints), { code: '', precision: 0 })}</Text>
                        <View style={[styles.borderSpaceStyle]} />

                    </>
                    : props.route.params.item.RewardPoints > 0 ?

                        <>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>{'Points Earned'}</Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(Math.abs(props.route.params.item.RewardPoints), { code: '', precision: 0 })}</Text>
                            <View style={[styles.borderSpaceStyle]} />

                        </>

                        : null
            }

            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Transaction Amount</Text>
            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(props.route.params.item.TransactionAmount, { code: 'CAD' })}</Text>

            <View style={[styles.borderSpaceStyle]} />

            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Transaction Date</Text>
            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{Moment(props.route.params.item.created_at).format("hh:mma DD-MMM-YYYY")}</Text>

            <View style={[styles.borderSpaceStyle]} />

            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Transaction Type</Text>
            <Text style={[styles.textStyle, { color: (props.route.params.item.TransactionTypeCode === 'C' ? colorRedDC143C : ligh_green), fontWeight: '700' }]}>{props.route.params.item.TransactionTypeCode === 'C' ? 'Debit' : 'Credit'}</Text>

            <View style={[styles.borderSpaceStyle]} />

            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Transaction Status</Text>
            <Text style={[styles.textStyle, { color: (props.route.params.item.SettlementStatus === 'Unresolved' ? '#ef9749' : myTheme.colors.LABEL_COLOR), fontWeight: '700' }]}>{props.route.params.item.SettlementStatus}</Text>

            <View style={[styles.borderSpaceStyle]} />
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalizeX(20),
        paddingVertical: normalizeY(20)
    },
    textStyle: {
        fontSize: normalizeFont(16),
        fontFamily: mulish_regular,
        fontWeight: '400',
        marginTop: normalizeY(8)
    },
    titleStyle: {
        fontSize: normalizeFont(13),
        fontFamily: mulish_regular,
        fontWeight: '600',
        marginTop: normalizeY(10)
    },
    borderSpaceStyle: {
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: normalizeY(5),
        borderColor: '#DCDCDC'
    }
})