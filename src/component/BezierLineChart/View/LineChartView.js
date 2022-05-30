import React, { useState, useEffect } from 'react'

import { Dimensions, TouchableOpacity, View } from 'react-native'

import { ligh_green } from '../../../utils/Constants';
import { useTheme } from '@react-navigation/native';
import Text from '../../common/Text'

import {
    LineChart,
} from "react-native-chart-kit";
import { normalizeX } from '../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
var currencyFormatter = require('currency-formatter');

export default LineChartView = (props) => {

    const [renderInfoView, shouldRenderInfoView] = useState('')

    const myTheme = useTheme()

    useEffect(() => {
        shouldRenderInfoView('')
    }, [props.response])

    const formatYLabelLocal = (num) => {

        let value = props.view.toLowerCase().includes('points') ? '' : '$ '
        value = value + (Math.abs(num) > 999 ? (Math.sign(num) * ((Math.abs(num) / 1000).toFixed(2))).toFixed(2) + 'k' : (props.view.toLowerCase().includes('points') ? (Math.sign(num) * Math.abs(num)).toFixed(0) : (Math.sign(num) * Math.abs(num)).toFixed(2)))
        return value + ' '
    }

    const onClickView = () => {

        if (renderInfoView) {

            if (props.renderedFrom === 'dashboard') {
                return (

                    <>

                        <View style={{ position: 'absolute', left: renderInfoView.x - 10, top: renderInfoView.y + 35, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: '#FECF31', zIndex: 999 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#fff' }}>{props.view.toLowerCase().includes('points') ? currencyFormatter.format(renderInfoView.value, { code: '', precision: 0 }) : currencyFormatter.format(renderInfoView.value, { code: 'CAD' })}</Text>

                            </View>
                        </View>

                        <LinearGradient colors={['rgba(170, 225, 93, 1)', 'rgba(170, 225, 93, 0)']} style={{ position: 'absolute', left: renderInfoView.x, top: renderInfoView.y + 70, width: 30, bottom: 30, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />


                    </>
                )
            } else if (props.renderedFrom === 'plastkcard') {
                return (

                    <>

                        <View style={{ position: 'absolute', left: renderInfoView.x - 20, top: renderInfoView.y - 15, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: '#FECF31', zIndex: 999 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#fff' }}>{props.view.toLowerCase().includes('points') ? currencyFormatter.format(renderInfoView.value, { code: '', precision: 0 }) : currencyFormatter.format(renderInfoView.value, { code: 'CAD' })}</Text>

                            </View>
                        </View>

                        <LinearGradient colors={['rgba(170, 225, 93, 1)', 'rgba(170, 225, 93, 0)']} style={{ position: 'absolute', left: renderInfoView.x, top: renderInfoView.y + 20, width: 30, bottom: 30, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />


                    </>
                )
            }

        }
    }

    return (

        <>

            <TouchableOpacity onPress={() => shouldRenderInfoView('')}>

                <LineChart
                    data={{
                        labels: props.response.label,
                        datasets: [
                            {
                                data: (props.view.toLowerCase().includes('points') ? props.response.reward_points : props.response.transactions)
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 70} // from react-native
                    height={200}
                    withDots={true}
                    withVerticalLines={true}
                    withHorizontalLines={false}
                    yAxisInterval={1}
                    backgroundColor="transparent"
                    formatYLabel={formatYLabelLocal}
                    chartConfig={{
                        backgroundColor: "transparent",
                        backgroundGradientFrom: "transparent",
                        backgroundGradientTo: "transparent",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => ligh_green,
                        labelColor: (opacity = 1) => myTheme.colors.LABEL_COLOR,
                        fillShadowGradient: renderInfoView ? 'transparent' : ligh_green,
                        fillShadowGradientOpacity: renderInfoView ? 0 : 0.3,
                        stackedBar: false,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#fff"
                        },
                    }}
                    bezier
                    style={{
                        alignSelf: 'center',
                        backgroundColor: "transparent",
                        marginLeft: (props.response.label && props.response.label.length > 3) ? normalizeX(0) : normalizeX(40),
                        zIndex: 999

                    }}
                    onDataPointClick={(data) => shouldRenderInfoView(data)}
                />

            </TouchableOpacity>
            {onClickView()}
        </>
    )
}
