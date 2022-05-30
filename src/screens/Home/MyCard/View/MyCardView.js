import React, { useEffect } from 'react'

import { View, StyleSheet, ScrollView } from 'react-native'
import Text from '../../../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { ligh_green, mulish_bold, mulish_regular } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { fetchMyCardInfoAction, fetchPointsInfoAction } from '../Actions/MyCardActions';
var currencyFormatter = require('currency-formatter');


export default MyCardView = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()
    const availableCreditLimit = useSelector(state => state.myCardReducer.availableCreditLimit)
    const balance = useSelector(state => state.myCardReducer.balance)
    const creditLimit = useSelector(state => state.myCardReducer.creditLimit)

    const totalPoints = useSelector(state => state.myCardReducer.totalPoints)
    const pendingTransactions = useSelector(state => state.myCardReducer.pendingTransactions)

    const lastPaymentAmount = useSelector(state => state.myCardReducer.lastPaymentAmount)


    useEffect(() => {

        dispatch(fetchMyCardInfoAction())
        dispatch(fetchPointsInfoAction())
    }, [])


    return (

        <View style={{ flex: 1 }}>

            <View style={{ marginTop: normalizeY(10), paddingHorizontal: normalizeY(10) }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR }]}>Available Credit</Text>
                        <Text style={[styles.availableCreditValueText, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(balance, { code: 'CAD' })}</Text>
                    </View>
                    <View>
                        <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR }]}>Total Points</Text>
                        <Text style={[styles.pointsValueText, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(totalPoints, { code: '', precision: 0 })}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View>
                        <View style={{ flexDirection: 'column', marginTop: normalizeY(5) }}>
                            <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR, fontWeight: '600', textAlign: 'left' }]}>Current Balance</Text>
                            <Text style={styles.pendingTransactionsTextStyle}>{currencyFormatter.format(creditLimit - balance, { code: 'CAD' }) }</Text>
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR, fontWeight: '600', textAlign: 'left' }]}>Credit Limit</Text>
                            <Text style={styles.pendingTransactionsTextStyle}>{currencyFormatter.format(creditLimit, { code: 'CAD' })}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'column', marginTop: normalizeY(5) }}>
                            <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR, fontWeight: '600', textAlign: 'right' }]}>Pending Transactions</Text>
                            <Text style={[styles.currentBalanceTextStyle]}>{currencyFormatter.format(pendingTransactions, { code: 'CAD'})}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', marginTop: normalizeY(5) }}>
                            <Text style={[styles.titleText, { color: myTheme.colors.LABEL_COLOR, fontWeight: '600', textAlign: 'right' }]}>Last Payment</Text>
                            <Text style={[styles.currentBalanceTextStyle]}>{currencyFormatter.format(lastPaymentAmount, { code: 'CAD' })}</Text>
                        </View>
                    </View>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: normalizeFont(13),
        fontWeight: '700'
    },
    availableCreditValueText: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(24, true),
        fontWeight: '700',
        textAlign: 'left'
    },
    pointsValueText: {
        fontFamily: mulish_regular,
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
    },
    currentBalanceTextStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(12),
        color: ligh_green,
        fontWeight: '600',
        textAlign: 'right'
    }
})