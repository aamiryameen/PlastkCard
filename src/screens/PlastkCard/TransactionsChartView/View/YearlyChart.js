import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'

import {
    LineChart,
} from "react-native-chart-kit";
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';

import { useTheme } from '@react-navigation/native';
import { ligh_green, mulish_regular } from '../../../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient'

import Text from '../../../../component/common/Text'


export default YearlyChart = (props) => {

    const myTheme = useTheme()

    return (

        <View style={styles.linearGradientContainerStyle}>
          
            <LineChart
                data={{
                    labels: ["2016", "2017", "2018", "2019", "2020"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 10,
                                Math.random() * 10,
                                Math.random() * 10,
                                Math.random() * 10,
                                Math.random() * 10,
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 35} // from react-native
                height={220}
                yAxisLabel="$"
                withDots={true}
                withVerticalLines={true}
                withHorizontalLines={false}
                yAxisSuffix="k"
                yAxisInterval={1}
                backgroundColor="transparent"
                chartConfig={{
                    backgroundColor: "transparent",
                    backgroundGradientFrom: "transparent",
                    backgroundGradientTo: "transparent",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => ligh_green,
                    labelColor: (opacity = 1) => myTheme.colors.LABEL_COLOR,
                    fillShadowGradient: ligh_green,
                    fillShadowGradientOpacity: 0.3,

                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                    }
                }}
                bezier
                style={{
                    alignSelf: 'center',
                    backgroundColor: "transparent"
                }}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    linearGradientContainerStyle : {
        marginTop: normalizeY(30)
    },
    titleTextStyle : {
        fontFamily: mulish_regular,
        fontWeight: '600',
        fontSize: normalizeFont(14)
    },
    valueTextStyle : {
        fontFamily: mulish_regular,
        fontWeight: '700',
        fontSize: normalizeFont(20)
    }
})