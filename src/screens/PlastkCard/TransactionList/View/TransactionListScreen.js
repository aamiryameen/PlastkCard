import React, { useEffect, useState, useRef } from 'react'

import { View, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, StatusBar, TextInput, RefreshControl } from 'react-native'
import Text from '../../../../component/common/Text'
import { ligh_green, mulish_bold, mulish_regular } from '../../../../utils/Constants'
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactionHistory, fetchTransactionHistoryByDate, fetchTransactionHistoryByDescription, resetTransactionHistory, resetTransactionHistoryComplete } from '../Actions/TransactionListAction'
import Moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Picker from '../../../../component/common/Picker'
var currencyFormatter = require('currency-formatter');
import Modal from '../../../../component/common/Modal'
import CustomLoader from '../../../../component/common/CustomLoader'


export default TransactionListScreen = (props) => {

    const dispatch = useDispatch()

    const myTheme = useTheme();

    const [isSearchOpened, setIsSearchOpened] = useState(false)

    const isRequestSent = useRef(false)

    const [dataSource, setDataSource] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const isLoading = useSelector(state => state.transactionHistoryReducer.isLoading)
    const response = useSelector(state => state.transactionHistoryReducer.response)
    const transactionList = useSelector(state => state.transactionHistoryReducer.transactionList)

    const footerLoading = useSelector(state => state.transactionHistoryReducer.footerLoading)

    const purchaseAmount = useSelector(state => state.myCardReducer.purchaseAmount)

    const searchTextRef = useRef('')
    const dateRef = useRef('')
    const typeRef = useRef('')
    const startDateRef = useRef('')
    const endDateRef = useRef('')

    const isListEmptyRef = useRef(false)


    const durationPickerDefaultValue = useRef('')
    const transactionTypePickerDefaultValue = useRef('')


    const durationPickerRef = useRef()
    const transactionTypePickerRef = useRef()


    const transactionTypes = [{
        label: 'All',
        value: 'all'
    }, {
        label: 'Debit',
        value: 'C'
    }, {
        label: 'Credit',
        value: 'D'
    }];

    const durationTypes = [{
        label: 'Last 7 Days',
        value: '7'
    }, {
        label: 'Last 30 Days',
        value: '30'
    }, {
        label: 'Last 60 Days',
        value: '60'
    }, {
        label: 'Last 3 Months',
        value: '90'
    }, {
        label: 'Last 6 Months',
        value: '180'
    }, {
        label: 'Last 12 Months',
        value: '360'
    }];


    const handleResponse = () => {

        if (response !== '') {

            if (response && response.hasOwnProperty('error') && response.error) {

                return (
                    <Modal responseMessage={response.message} onPress={() => props.navigation.goBack()} modalType='error' />
                )
            }

            else if (response && isRequestSent.current && transactionList !== '') {

                isListEmptyRef.current = false
                if (transactionList.length === 0)
                    isListEmptyRef.current = true

                isRequestSent.current = false
                setDataSource(transactionList)
            }
        }
    }


    const onRefresh = () => {
        setRefreshing(true)

        dispatch(resetTransactionHistoryComplete())
        setDataSource([])

        setIsSearchOpened(false)

        isRequestSent.current = true
        dispatch(fetchTransactionHistory(1, 10, []))


        setTimeout(() => {

            setRefreshing(false)

        }, 2000);
    }




    useEffect(() => {

        logFireBaseEvent('search_transactions')

        if (props.route.params && props.route.params.duration) {

            typeRef.current = 'all'

            if (props.route.params.duration === '7') {

                try {
                    durationPickerDefaultValue.current = 'Last 7 Days'
                    transactionTypePickerDefaultValue.current = 'All'
                }
                catch (error) {

                }
            } else if (props.route.params.duration === '30') {
                try {
                    durationPickerDefaultValue.current = 'Last 30 Days'
                    transactionTypePickerDefaultValue.current = 'All'
                }
                catch (error) {

                }
            } else if (props.route.params.duration === '360') {
                try {
                    durationPickerDefaultValue.current = 'Last 12 Months'
                    transactionTypePickerDefaultValue.current = 'All'
                }
                catch (error) {

                }
            }

            setIsSearchOpened(true)
            dateRef.current = props.route.params.duration
            onDateSearch(dateRef.current, typeRef.current)
        }
        else {
            if (response === '') {
                isRequestSent.current = true
                dispatch(fetchTransactionHistory(1, 10, []))
            }
            else if (response.success === true) {
                isRequestSent.current = true
                setDataSource([])
                setTimeout(() => {
                    setDataSource(transactionList)
                }, 300);
            }
        }
        
        return () => {
            dispatch(resetTransactionHistoryComplete())
            setDataSource([])
        }
    }, [])

    const getText = (item) => {

        if(item.TransactionTypeCode === 'C') {

            if(item.RewardPoints < 0) {
                return currencyFormatter.format(Math.abs(item.RewardPoints), { code: '', precision: 0 })
            } else {
                return currencyFormatter.format(item.TransactionAmount, { code: 'CAD' })
            }

        } else {

            if(item.RewardPoints > 0 && item.TransactionAmount === 0) {
                return currencyFormatter.format(item.RewardPoints, {code : '', precision: 0})
            } else {
                return currencyFormatter.format(item.TransactionAmount, { code: 'CAD' })
            }

        }
    }

    const ItemView = ({ item }) => {


        return (

            <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}
                style={styles.listItemContainerStyle}>

                <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => props.navigation.navigate('TransactionDetailScreen', { item: item })}>
                    <MaterialCommunityIcons
                        name={item.TransactionTypeCode === 'C' ? 'credit-card-minus' : 'credit-card-plus'}
                        color={item.TransactionTypeCode === 'C' ? '#fe5c31' : ligh_green}
                        size={normalizeFont(25, true)}
                    />

                    <View style={{ flex: 0.9 }}>
                        <Text numberOfLines={2} style={[styles.transactionDescriptionStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.Description}</Text>
                    </View>
                    <View style={{ flexDirection: "column", marginLeft: normalizeX(10) }}>
                        <Text style={[styles.transactionAmountStyle, { color: item.TransactionTypeCode === 'C' ? '#fe5c31' : ligh_green }]}>{getText(item)}</Text>
                        <Text style={styles.transactionDateStyle}>{Moment(item.created_at).format("DD-MM-YYYY")}</Text>
                    </View>

                    {item.SettlementStatus === 'Unresolved' ?
                        <MaterialCommunityIcons
                            name={'alpha-u-circle-outline'}
                            color={'#ef9749'}
                            size={normalizeFont(25, true)}
                        />
                        :
                        null
                    }

                </TouchableOpacity>
            </LinearGradient>

        );
    };

    const ListHeader = () => {
        return (
            <View style={styles.flatListHeaderStyle}>

            </View>
        );
    };

    const renderFooter = () => {
        return (
            (footerLoading) ?
                <View style={styles.footer}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
                : null
        );
    };

    const fetchRemainingData = () => {

        if (response && isRequestSent.current === false) {
            if (searchTextRef.current !== '' && response.hasOwnProperty('hasNextPage') && response.hasNextPage) {
                isRequestSent.current = true
                dispatch(fetchTransactionHistoryByDescription(response.nextPage, 10, searchTextRef.current, transactionList))
            }
            else if (startDateRef.current !== '' && endDateRef.current !== '' && response.hasOwnProperty('hasNextPage') && response.hasNextPage) {
                isRequestSent.current = true
                dispatch(fetchTransactionHistoryByDate(response.nextPage, 10, startDateRef.current, endDateRef.current, typeRef.current, transactionList))
            }
            else if (response && response.response && response.response.hasOwnProperty('hasNextPage') && response.response.hasNextPage) {
                isRequestSent.current = true
                dispatch(fetchTransactionHistory(response.response.nextPage, 10, transactionList))
            }
        }
    }

    const onResetButtonPressed = () => {

        dispatch(resetTransactionHistory())

        setDataSource([])

        searchTextRef.current = ''
        startDateRef.current = ''
        endDateRef.current = ''
        dateRef.current = ''
        typeRef.current = ''

        durationPickerDefaultValue.current = ''
        transactionTypePickerDefaultValue.current = ''


        try {
            durationPickerRef.current.handleValueChange('', 0)
            transactionTypePickerRef.current.handleValueChange('', 0)
        }
        catch (error) {
        }


        setTimeout(() => {

            isRequestSent.current = true

            dispatch(fetchTransactionHistory(1, 10, []))
        }, 500);
    }

    const onTextSearch = (searchText = '') => {

        dispatch(resetTransactionHistory())

        setDataSource([])

        logFireBaseEvent('search_transactions_custom')

        try {
            durationPickerRef.current.handleValueChange('', 0)
            transactionTypePickerRef.current.handleValueChange('', 0)
        }
        catch (error) {
        }

        searchTextRef.current = searchText

        startDateRef.current = ''
        endDateRef.current = ''
        dateRef.current = ''
        typeRef.current = ''

        durationPickerDefaultValue.current = ''
        transactionTypePickerDefaultValue.current = ''


        if (searchTextRef.current === '') {
            onResetButtonPressed()
        }
        else {
            setTimeout(() => {

                isRequestSent.current = true

                dispatch(fetchTransactionHistoryByDescription(1, 10, searchText, []))
            }, 500);
        }
    }

    const onDateSearch = (dateType = '', transactionType = '') => {

        dispatch(resetTransactionHistory())

        setDataSource([])

        if (dateType !== '' && transactionType !== '' && dateType !== null && transactionType !== null) {

            logFireBaseEvent('search_transactions_custom')
            searchTextRef.current = ''

            endDateRef.current = Moment()

            if (dateType === '7') {
                startDateRef.current = Moment().subtract(6, 'days')
            } else if (dateType === '30') {
                startDateRef.current = Moment().subtract(29, 'days')
            } else if (dateType === '60') {
                startDateRef.current = Moment().subtract(59, 'days')
            } else if (dateType === '90') {
                startDateRef.current = Moment().subtract(3, 'month')
            } else if (dateType === '180') {
                startDateRef.current = Moment().subtract(6, 'month')
            } else if (dateType === '360') {
                startDateRef.current = Moment().subtract(12, 'month')
            }

            typeRef.current = transactionType

            setTimeout(() => {

                isRequestSent.current = true

                dispatch(fetchTransactionHistoryByDate(1, 10, startDateRef.current, endDateRef.current, typeRef.current, []))
            }, 500);
        } else if (dateType === null && transactionType === null) {
            onResetButtonPressed()
        }
    }

    const listEmptyComponent = () => {

        if (isListEmptyRef.current) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.noHistoryAvailableStyle, { color: myTheme.colors.LABEL_COLOR }]}>No Record Available</Text>
                </View>
            )
        } else {
            return (null)
        }
    }


    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            {!isSearchOpened ?
                <>
                    <Text style={[styles.amountStyle, { color: myTheme.colors.LABEL_COLOR }]}>{currencyFormatter.format(purchaseAmount, { code: 'CAD' })}</Text>

                    <TouchableOpacity style={[styles.searchViewStyle, { backgroundColor: myTheme.colors.BACK_ARROW_BACKGROUND_COLOR, borderColor: myTheme.colors.SEGMENTED_BORDER_COLOR }]} onPress={() => setIsSearchOpened(!isSearchOpened)}>

                        <Text style={[styles.searchTextStyle, { color: myTheme.colors.LABEL_COLOR, backgroundColor: myTheme.colors.BACK_ARROW_BACKGROUND_COLOR, marginLeft: normalizeX(10) }]}>Recent</Text>

                        <MaterialIcons
                            name='search'
                            color={'#a1c452'}
                            size={normalizeFont(20, true)}
                            style={{ marginRight: normalizeX(10) }}
                        />
                    </TouchableOpacity>
                </>

                :
                <>

                    <View style={[styles.searchViewStyle, { backgroundColor: myTheme.colors.BACK_ARROW_BACKGROUND_COLOR, borderColor: myTheme.colors.SEGMENTED_BORDER_COLOR }]} >

                        <View style={{ flex: 0.95 }}>
                            <TextInput placeholder='Recent  ' placeholderTextColor={myTheme.colors.LABEL_COLOR} style={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontWeight: '400', fontSize: normalizeFont(12), marginLeft: normalizeX(10) }} onChangeText={text => { searchTextRef.current = text; onTextSearch(searchTextRef.current) }} />
                        </View>
                        <MaterialIcons
                            name='search'
                            color={'#a1c452'}
                            size={normalizeFont(20, true)}
                            style={{ marginRight: normalizeX(10) }}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: normalizeY(15), marginHorizontal: normalizeX(5) }}>

                        <View style={{ flex: 0.4 }}>
                            <Picker placeholder='Date' theme={myTheme} ref={durationPickerRef} title={durationPickerDefaultValue.current} values={durationTypes} onChange={(val) => { dateRef.current = val; onDateSearch(dateRef.current, typeRef.current) }} />
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Picker placeholder='Type' theme={myTheme} ref={transactionTypePickerRef} title={transactionTypePickerDefaultValue.current} values={transactionTypes} onChange={(val) => { typeRef.current = val; onDateSearch(dateRef.current, typeRef.current) }} />
                        </View>

                    </View>
                </>

            }


            <FlatList

                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                onEndReached={fetchRemainingData}
                ListHeaderComponent={ListHeader}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={listEmptyComponent}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />

            {handleResponse()}

            {isLoading &&
                <CustomLoader />
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalizeX(20)
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
    transactionDateStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(12),
        color: "#7f85a2",
        fontWeight: '600'
    },
    transactionAmountStyle: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(14),
        color: '#272d2f',
        fontWeight: '800',
        textAlign: 'center'
    },
    transactionDescriptionStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(13),
        marginLeft: normalizeX(5),
        color: '#272d2f',
        marginRight: normalizeX(5),
        fontWeight: '700'
    },
    flatListHeaderStyle: {
        marginVertical: normalizeY(5),
    },
    flatListHeaderTextStyle: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(12),
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchViewStyle: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: normalizeY(30),
        height: normalizeY(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: normalizeX(2)
    },
    amountStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(30, true),
        fontWeight: '700'
    },
    searchTextStyle: {
        fontFamily: mulish_regular,
        fontWeight: '400',
        fontSize: normalizeFont(12),
        marginLeft: normalizeX(10)
    },
    listItemContainerStyle: {
        flex: 1,
        paddingHorizontal: normalizeX(5),
        marginHorizontal: normalizeX(2),
        marginVertical: normalizeY(10),
        height: normalizeY(70),
        borderRadius: 16,
        elevation: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 }
    },
    touchableOpacityStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    noHistoryAvailableStyle: {
        textAlign: 'center',
        fontSize: normalizeFont(20),
        fontFamily: mulish_regular
    }
})