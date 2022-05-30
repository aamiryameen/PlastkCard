import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../../../../component/common/Text'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { GENERIC_ERROR, mulish_regular } from '../../../../utils/Constants'
import { useSelector, useDispatch } from "react-redux";
import Modal from '../../../../component/common/Modal'
import { fetchInteracPaymentHistory, resetInteracCodeHistoryScreen } from '../Actions/VerifyPaymentActions'
var currencyFormatter = require('currency-formatter')
import Moment from 'moment'
import CustomLoader from '../../../../component/common/CustomLoader'




export default VerifyPaymentHistory = (props) => {

    const myTheme = useTheme();

    const isLoading = useSelector(state => state.verifyPaymentsReducer.isLoading)
    const interacHistoryResponse = useSelector(state => state.verifyPaymentsReducer.interacHistoryResponse)
    const [dataSource, setDataSource] = useState([])
    const isRequestSent = useRef(false)


    const dispatch = useDispatch()

    useEffect(() => {

        isRequestSent.current = true
        dispatch(fetchInteracPaymentHistory(100, 1))

        return function cleanUp() {
            dispatch(resetInteracCodeHistoryScreen())
        }
    }, [])

    const ItemView = ({ item }) => {
        return (

            <View style={[styles.container, { borderColor: myTheme.colors.HISTORY_BORDER_COLOR }]}>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>Date : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>{Moment(item.created_at).format("DD-MMM-YYYY")}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Bank Name : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1} >{item.SenderBankName}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Name : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1}>{item.SenderName}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Amount : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(item.Amount, { code: 'CAD' })}</Text>
                </View>

                <View style={styles.rowStyle}>
                    <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Reference Number : </Text>
                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.ReferenceNumber}</Text>
                </View>
            </View>

        )

    }

    const fetchRemainingData = () => {

        if (interacHistoryResponse) {
            if (interacHistoryResponse && interacHistoryResponse.response && interacHistoryResponse.response.hasOwnProperty('hasNextPage') && interacHistoryResponse.response.hasNextPage) {
                isRequestSent.current = true
                dispatch(fetchInteracPaymentHistory(100, interacHistoryResponse.response.nextPage))
            }
        }
    }

    const handleResponse = () => {

        if (interacHistoryResponse !== '') {

            if (interacHistoryResponse.success) {
                if (interacHistoryResponse.response.items.length === 0 && dataSource.length === 0) {

                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={[styles.noHistoryAvailableStyle, { color: myTheme.colors.LABEL_COLOR }]}>No History Available</Text>
                        </View>
                    )
                }
                else if (isRequestSent.current === true) {

                    isRequestSent.current = false
                    setTimeout(() => {
                        setDataSource([...dataSource, ...interacHistoryResponse.response.items])
                    }, 500);
                }
            } else {
                return (<Modal responseMessage={GENERIC_ERROR} modalType='error' onPress={() => dispatch(resetInteracCodeHistoryScreen())} />)
            }
        }
    }

    return (
        <View style={{ flex: 1, marginBottom: normalizeY(10), marginHorizontal: normalizeX(10) }}>


            {handleResponse()}

            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                onEndReached={fetchRemainingData}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />


            {isLoading &&
                <CustomLoader/>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        borderWidth: 1,
        marginTop: normalizeY(10),
        padding: normalizeX(10),
        flex: 1,
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
    noHistoryAvailableStyle: {
        textAlign: 'center',
        fontSize: normalizeFont(20),
        fontFamily: mulish_regular
    }
})