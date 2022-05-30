import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpendingInsights } from '../Actions/MyBudgetActions';
import Text from '../../../../component/common/Text';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { mulish_regular } from '../../../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import CustomLoader from '../../../../component/common/CustomLoader'
var currencyFormatter = require('currency-formatter');
import { noDataAvailable } from '../../../../assets';

export default MyBudgetView = (props) => {

    const dispatch = useDispatch();
    const myTheme = useTheme();

    const isLoading = useSelector(state => state.myBudgetReducer.isLoading);
    const response = useSelector(state => state.myBudgetReducer.response);

    let formattedData = useRef([])

    useEffect(() => {
        if (response === '')
            dispatch(fetchSpendingInsights());
    }, [])

    const showSpendingBreakDown = () => {
        if (response) {
            return (
                <FlatList
                    data={formattedData.current}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={styles.gridItemStyle}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.colorCircleStyle, { backgroundColor: item.color }]} />
                                <Text style={[styles.spendingCategoryStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.category}</Text>
                            </View>
                            <Text style={styles.spendingAmountStyle}>{currencyFormatter.format(item.value, { code: 'CAD' })}</Text>
                        </View>
                    )}
                />
            )
        }
    }

    const handleResponse = () => {
        try {
            if (response) {

                if (response.data && response.data.length > 0) {

                    let data = [];

                    for (const key of response.data) {
                        if (key.percentage !== undefined && key.percentage !== null)
                            data.push({ color: key.color, width: key.percentage, category: key.category, value: key.value });
                    }

                    let startIndex = -1;
                    let endIndex = -1;

                    data.map((item, index) => {

                        if (item.width > 15 & startIndex === -1)
                            startIndex = index;
                        else if (item.width > 15 & endIndex === -1)
                            endIndex = index;

                    })

                    if (data.length > 2) {
                        let startItem = data.splice(startIndex, 1)

                        let endItem = data.splice(endIndex - 1, 1)

                        data.push(endItem[0]);
                        data.unshift(startItem[0]);
                    }

                    formattedData.current = data;

                    if (formattedData.current.length > 0) {

                        return (
                            <View>
                                <View style={{ flexDirection: 'row', flex: 1, marginTop: normalizeY(8) }}>
                                    {
                                        data.map((i, index) => {
                                            if (index === 0) {
                                                return (
                                                    <View key={index} style={{ backgroundColor: i.color, width: i.width + '%', height: 40, borderTopStartRadius: 10, borderBottomStartRadius: 10, borderBottomEndRadius: (data.length === 1 ? 10 : 0), borderTopEndRadius: (data.length === 1 ? 10 : 0) }} />
                                                )
                                            }
                                            else if (index === data.length - 1) {
                                                return (
                                                    <View key={index} style={{ backgroundColor: i.color, width: i.width + '%', height: 40, borderTopEndRadius: 10, borderBottomEndRadius: 10 }} />
                                                )
                                            }
                                            else {
                                                return (
                                                    <View key={index} style={{ backgroundColor: i.color, width: i.width + '%', height: 40 }} />
                                                )
                                            }
                                        })
                                    }
                                </View>

                                <View style={styles.breakDownContainer}>
                                    {showSpendingBreakDown()}
                                </View>
                            </View>
                        )
                    }
                    else {

                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: normalizeY(20) }}>
                                <Image source={noDataAvailable} resizeMode='contain' style={{ width: normalizeX(150), height: normalizeY(130) }} />
                                <Text numberOfLines={2} style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10) }}>No data available. Please go and use your card</Text>
                            </View>
                        )
                    }


                }
                else {

                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: normalizeY(20) }}>
                            <Image source={noDataAvailable} resizeMode='contain' style={{ width: normalizeX(150), height: normalizeY(130) }} />
                            <Text numberOfLines={2} style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10) }}>No data available. Please go and use your card</Text>
                        </View>
                    )

                }


            }
        }
        catch (error) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: normalizeY(20) }}>
                    <Image source={noDataAvailable} resizeMode='contain' style={{ width: normalizeX(150), height: normalizeY(130) }} />
                    <Text numberOfLines={2} style={{ color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(10) }}>No data available. Please go and use your card</Text>
                </View>
            )
        }


    }


    return (
        <View style={styles.containerView}>
            <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.container}>
                <Text style={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}>My Spend</Text>
                {handleResponse()}
                {isLoading &&
                    <CustomLoader />
                }
            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    containerView: {
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0 },

        backgroundColor: 'transparent'
    },
    container: {
        marginVertical: normalizeY(20),
        padding: normalizeFont(15, true),
        borderRadius: 20,
        elevation: 10,

    },
    textTitleStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(20, true),
        fontWeight: '700'
    },
    breakDownContainer: {
        marginTop: normalizeY(20)
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
        marginVertical: normalizeX(5),
        marginHorizontal: normalizeY(5),
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
        color: '#7F85A2',
        fontWeight: '500'
    },
    spendingCategoryStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(14),
        color: '#272d2f',
        marginRight: normalizeX(10),
        fontWeight: '600'
    }
})