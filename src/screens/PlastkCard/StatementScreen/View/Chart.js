import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'

import {
    LineChart,
} from "react-native-chart-kit";
import { normalizeFont, normalizeY } from '../../../../utils/Utils';

import { useTheme } from '@react-navigation/native';
import { ligh_green, mulish_regular } from '../../../../utils/Constants';



export default Chart = (props) => {

    const myTheme = useTheme()

    return (

        <View style={styles.linearGradientContainerStyle}>

            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", 'Jun', 'Jul', 'Aug'],
                    datasets: [
                        {
                            data: [
                                Math.random() * 10,
                                Math.random() * 10,
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
    linearGradientContainerStyle: {
        marginTop: normalizeY(30)
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
    }
})