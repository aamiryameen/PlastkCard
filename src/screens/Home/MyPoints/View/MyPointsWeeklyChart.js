import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import LineChartView from '../../../../component/BezierLineChart/View/LineChartView';
import { DASHBOARD_MY_POINTS_WEEKLY, mulish_regular } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../component/common/Text';
var currencyFormatter = require('currency-formatter');
import { noDataAvailable } from '../../../../assets';
import CustomLoader from '../../../../component/common/CustomLoader';


export default MyPointsWeeklyChart = (props) => {

    const myTheme = useTheme();


    const isLoading = useSelector(state => state.myCardWeeklyReducer.isLoading)
    const response = useSelector(state => state.myCardWeeklyReducer.response)
    const isError = useSelector(state => state.myCardWeeklyReducer.isError)


    const getTotal = () => {

        try {
            if (response !== '') {

                return response.reward_points.reduce(sum, 0)
            }
            return 0
        }
        catch (error) {
            return 0
        }
    }

    const sum = (total, num) => {
        return total + num
    }

    return (

        <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.linearGradientContainerStyle}>

            <View style={{ flexDirection: 'column', marginBottom: normalizeY(30), marginTop: normalizeY(5), marginHorizontal: normalizeX(15) }}>
                <Text style={[styles.titleTextStyle, { color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }]}>{'Points earned in the last 4 weeks'}</Text>
                <Text style={[styles.valueTextStyle, { color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }]}>{currencyFormatter.format(getTotal(), { symbol: '', precision: 0 })}</Text>
            </View>

            {response !== '' ? response.label && response.label.length > 0 ? <LineChartView response={response} view={DASHBOARD_MY_POINTS_WEEKLY} renderedFrom = 'dashboard' /> :

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={noDataAvailable} resizeMode='contain' style={{ width: normalizeX(150), height: normalizeY(130) }} />
                    <Text numberOfLines={2} style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10) }}>No data available. Please go and use your card</Text>
                </View>
                : null
            }

            {isLoading &&
                <CustomLoader />
            }

        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    linearGradientContainerStyle: {
        borderRadius: 20,
        elevation: 3,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        minHeight: 275
    },
    titleTextStyle: {
        fontFamily: mulish_regular,
        fontWeight: '600',
        fontSize: normalizeFont(14)
    },
    valueTextStyle: {
        fontFamily: mulish_regular,
        fontWeight: '700',
        fontSize: normalizeFont(20)
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    durationInfoText: {
        fontSize: normalizeFont(14),
        fontFamily: mulish_regular,
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontWeight: '700'
    }
})