import React, { useEffect, useState } from 'react'

import { View, StyleSheet, Image, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import Text from '../../../../component/common/Text'
import Button from '../../../../component/common/Button'
import { mulish_regular } from '../../../../utils/Constants';
import { idVerificationComplete } from '../../../../assets';
var currencyFormatter = require('currency-formatter')
import Moment from 'moment'



export default RequestCreditIncreaseSuccess = (props) => {

    const myTheme = useTheme()
    const [paymentInfo, setPaymentInfo] = useState({})

    useEffect(() => {

        logFireBaseEvent('credit_limit_increase_requested')
        setPaymentInfo(props.route.params.paymentInfo)

    }, [])

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={styles.gradientContainerStyle}>
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}
                style={{ alignItems: 'center', elevation: 3, borderRadius: 20, height: normalizeY(250), width: '100%' }}>

                <Image resizeMode='contain' source={idVerificationComplete} style={{ width: normalizeX(230), height: normalizeY(230) }} />

            </LinearGradient>

            <View style={{ flex: 1, marginTop: normalizeY(30) }}>
                <View style={{ flex: 0.8 }}>
                    <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center', fontFamily: mulish_regular, fontWeight: '700', fontSize: normalizeFont(20) }}>Pending Approval</Text>

                    <View style={[styles.container, { borderColor: myTheme.colors.HISTORY_BORDER_COLOR }]}>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>Date : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>{Moment(paymentInfo.created_at).format("DD-MMM-YYYY")}</Text>
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Bank Name : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1} >{paymentInfo.SenderBankName}</Text>
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Name : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1}>{paymentInfo.SenderName}</Text>
                        </View>
                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Amount : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(paymentInfo.Amount, { code: 'CAD' })}</Text>
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Reference Number : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{paymentInfo.ReferenceNumber}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 0.2 }}>
                    <Button title='OK!' onPress={() => props.navigation.goBack()} />
                </View>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientContainerStyle: {
        flex: 1,
        paddingHorizontal: normalizeX(10),
        paddingTop: normalizeY(10),
        marginHorizontal: normalizeX(10)
    },
    container: {
        borderWidth: 1,
        marginTop: normalizeY(10),
        padding: normalizeX(10),
        width: "100%",
        borderRadius: 10
    },
    headingStyle: {
        fontWeight: 'bold',
        fontSize: normalizeFont(16),
    },
    rowStyle: {
        flexDirection: 'row',
        marginTop: normalizeY(5),
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: normalizeFont(13),
        color: '#000000',
        opacity: 0.65,
    },
    textStyle: {
        flex: 1,
        fontSize: normalizeFont(13),
        color: '#000000',
        opacity: 0.65,
    },

})