import React, { useRef } from 'react'

import { View, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'
import Text from '../../../../component/common/Text'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { mulish_bold, mulish_regular } from '../../../../utils/Constants'
import { PieChart } from 'react-native-svg-charts'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@react-navigation/native';
import CustomLoader from '../../../../component/common/CustomLoader'


export default MyBudgetPieChart = (props) => {

    const myTheme = useTheme();


    const isLoading = useSelector(state => state.myBudgetReducer.isLoading)
    const response = useSelector(state => state.myBudgetReducer.response)

    const colors = useRef([])

    const handleResponse = () => {

        if (response) {

            let data = []
            let obj = {}


            for (const key of response.data) {
                data.push(key.percentage)
                colors.current.push(key.color)
            }


            const pieData = data
                .filter((value) => value > 0)
                .map((value, index) => ({
                    value,
                    svg: {
                        fill: colors.current[index],

                    },
                    key: `pie-${index}`,
                }))


            return (
                <View>
                    <PieChart
                        style={{ height: 200 }}

                        data={pieData}


                    />

                </View>
            )
        }

    }

    return (
        <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}  
            style={styles.container}>

            <Text style={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}>My Spend</Text>
            {handleResponse()}
            {isLoading &&
                <CustomLoader/>
            }
        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        marginTop: normalizeY(20),
        paddingHorizontal: normalizeX(10),
        borderRadius: 20,
        paddingBottom: normalizeY(10)
    },
    textTitleStyle: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(15),
        paddingTop: normalizeY(20)
    },
    breakDownContainer: {
        marginTop: normalizeY(15)
    },
    itemStyle: {
        flexDirection: 'column'
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
    gridItemStyle: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: normalizeY(5),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    colorCircleStyle: {
        borderRadius: 35,
        width: 14,
        height: 14,
        marginRight: normalizeX(5),
        alignSelf: 'center',
        justifyContent: "center"
    },
    spendingAmountStyle: {
        fontFamily: mulish_regular,
        marginLeft: normalizeX(15),
        fontSize: normalizeFont(12),
        color: '#7F85A2'
    },
    spendingCategoryStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(14),
        color: '#272d2f'
    }
})