import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { useSelector } from 'react-redux';
import LineChartView from '../../../../component/BezierLineChart/View/LineChartView';
import { PLASTK_CARD_MONTHLY, mulish_regular } from '../../../../utils/Constants';
import { useTheme } from '@react-navigation/native';
import Text from '../../../../component/common/Text';
import { noDataAvailable } from '../../../../assets';

export default MonthlyChart = (props) => {

    const myTheme = useTheme()

    const response = useSelector(state => state.myCardMonthlyReducer.response)

    return (

        <View style={styles.linearGradientContainerStyle}>
            {response !== '' && response.label && response.label.length > 0 ?
                <LineChartView response={response} view={PLASTK_CARD_MONTHLY} renderedFrom = 'plastkcard' />
                :
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={noDataAvailable} resizeMode='contain' style={{ width: normalizeX(150), height: normalizeY(130) }} />
                    <Text numberOfLines={2} style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10) }}>No data available. Please go and use your card</Text>
                </View>
            }
        </View>

    )
}


const styles = StyleSheet.create({
    linearGradientContainerStyle: {
        paddingTop: normalizeY(35),
    },

})