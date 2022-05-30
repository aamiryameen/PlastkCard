import React from 'react'

import { View, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@react-navigation/native';
import Text from '../../../../component/common/Text'
import { mulish_regular } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { useSelector } from 'react-redux'
var currencyFormatter = require('currency-formatter')
import Moment from 'moment'




export default NextPaymentInfo = (props) => {

    const myTheme = useTheme();

    const minPayment = useSelector(state => state.myCardReducer.minPayment)
    const paymentDate = useSelector(state => state.myCardReducer.lastPaymentDate)

    return (

        <View style={styles.containerView}>

            <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.linearGradientContainer}>

                <View style={{ marginHorizontal: normalizeX(15), marginVertical: normalizeY(20) }}>
                    <Text style={[styles.headerTextStyle, { color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }]}>Next Payment</Text>

                    <View style={{ flexDirection: 'row', marginTop: normalizeY(20), justifyContent: 'space-between' }}>
                        <View>
                            <Text style={[styles.titleTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>Due Date</Text>
                            <Text style={[styles.valueTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{paymentDate === '' ? '-' : Moment(paymentDate).format("MMM DD")}</Text>
                        </View>

                        <View style={{ marginRight: normalizeX(5) }}>
                            <Text style={[styles.titleTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>Minimum Payment Due</Text>
                            <Text style={[styles.valueTextStyle, { color: myTheme.colors.LABEL_COLOR, textAlign: 'right' }]}>{currencyFormatter.format(minPayment, { code: 'CAD' })}</Text>
                        </View>

                    </View>

                </View>

            </LinearGradient>

        </View>

    )

}

const styles = StyleSheet.create({
    containerView: {
        borderRadius: 10,
        elevation: 3,
        marginTop: normalizeY(30),
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
    },
    linearGradientContainer: {
        borderRadius: 10,
    },
    headerTextStyle: {
        fontFamily: mulish_regular,
        fontWeight: '700',
        fontSize: normalizeFont(16)
    },
    titleTextStyle: {
        fontFamily: mulish_regular,
        fontWeight: '400',
        fontSize: normalizeFont(13)
    },
    valueTextStyle: {
        fontWeight: '700',
        fontSize: normalizeFont(18, true)
    }

})