import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../../../../component/common/Text'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { ligh_green, mulish_regular, mulish_bold, GENERIC_ERROR, colorRedDC143C } from '../../../../utils/Constants'
import { useSelector, useDispatch } from "react-redux";
import Modal from '../../../../component/common/Modal'
import { fetchRequestCreditIncreaseHistory, resetRequestCreditIncreaseHistoryScreen } from '../Actions/CreditIncreaseLineActions'
var currencyFormatter = require('currency-formatter')
import Moment from 'moment'
import CustomLoader from '../../../../component/common/CustomLoader'

export default RequestCreditIncreaseHistory = (props) => {

    const myTheme = useTheme();

    const isLoading = useSelector(state => state.requestCreditIncreaseReducer.isLoading)
    const interacHistoryResponse = useSelector(state => state.requestCreditIncreaseReducer.interacHistoryResponse)
    const [dataSource, setDataSource] = useState([])
    const isRequestSent = useRef(false)


    const dispatch = useDispatch()

    useEffect(() => {

        isRequestSent.current = true
        dispatch(fetchRequestCreditIncreaseHistory(10, 1))

        return function cleanUp() {
            dispatch(resetRequestCreditIncreaseHistoryScreen())
        }
    }, [])

    const ItemView = ({ item }) => {

        if (item.status !== 'Pending') {
            return (

                <View style={[styles.container, { borderColor: myTheme.colors.HISTORY_BORDER_COLOR }]}>

                    <View style={styles.rowStyle}>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>Date : </Text>
                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(16) }]}>{Moment(item.incoming_transactions.created_at).format("DD-MMM-YYYY")}</Text>
                    </View>

                    <View style={styles.rowStyle}>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Bank Name : </Text>
                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1} >{item.incoming_transactions.SenderBankName}</Text>
                    </View>

                    <View style={styles.rowStyle}>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Name : </Text>
                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1}>{item.incoming_transactions.SenderName}</Text>
                    </View>

                    <View style={styles.rowStyle}>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Amount : </Text>
                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(item.incoming_transactions.Amount, { code: 'CAD' })}</Text>
                    </View>

                    <View style={styles.rowStyle}>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Reference Number : </Text>
                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.incoming_transactions.ReferenceNumber}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Status : </Text>
                        <Text style={[styles.textStyle, { color: (item.status === 'Approved' ? ligh_green : colorRedDC143C), fontFamily: mulish_bold }]}>{item.status}</Text>
                    </View>
                </View>

            )
        }

    }

    const fetchRemainingData = () => {

        if (interacHistoryResponse) {
            if (interacHistoryResponse && interacHistoryResponse.paginatedData && interacHistoryResponse.paginatedData.hasOwnProperty('hasNextPage') && interacHistoryResponse.paginatedData.hasNextPage) {
                isRequestSent.current = true
                dispatch(fetchRequestCreditIncreaseHistory(10, interacHistoryResponse.paginatedData.nextPage))
            }
        }
    }

    const handleResponse = () => {

        if (interacHistoryResponse !== '') {

            if (interacHistoryResponse.success) {
                if (interacHistoryResponse.paginatedData.items.length === 0 && dataSource.length === 0) {

                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={[styles.noHistoryAvailableStyle, { color: myTheme.colors.LABEL_COLOR }]}>No History Available</Text>
                        </View>
                    )
                }
                else if (isRequestSent.current === true) {

                    let shouldShowEmptyMessage = false

                    interacHistoryResponse.paginatedData.items.map(item => {
                        if (item.status === 'Approved' || item.status === 'Rejected') {
                            shouldShowEmptyMessage = true
                        }
                    })


                    isRequestSent.current = false

                    if (!shouldShowEmptyMessage) {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={[styles.noHistoryAvailableStyle, { color: myTheme.colors.LABEL_COLOR }]}>No History Available</Text>
                            </View>
                        )

                    } else {
                        setTimeout(() => {
                            setDataSource([...dataSource, ...interacHistoryResponse.paginatedData.items])
                        }, 500);
                    }

                }
            } else {

                if (interacHistoryResponse.hasOwnProperty('paginatedData') && interacHistoryResponse.paginatedData === null) {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={[styles.noHistoryAvailableStyle, { color: myTheme.colors.LABEL_COLOR }]}>No History Available</Text>
                        </View>
                    )
                } else {
                    return (<Modal responseMessage={GENERIC_ERROR} modalType='error' onPress={() => dispatch(resetRequestCreditIncreaseHistoryScreen())} />)
                }

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
                <CustomLoader />
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
        borderRadius: 10,

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