import { FETCH_TRANSACTION_HISTORY, FETCH_TRANSACTION_HISTORY_BY_DATE, FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION, RESET_TRANSACTION_HISTORY, RESET_TRANSACTION_HISTORY_COMPLETE } from "../../../../utils/Constants"

export const fetchTransactionHistory = (page = 1, size = 10, loadedItemsList) => {

    return {
        type: FETCH_TRANSACTION_HISTORY,
        pageNumber: page,
        size: size,
        loadedItemsList: loadedItemsList
    }
}

export const resetTransactionHistory = () => {
    return {
        type: RESET_TRANSACTION_HISTORY
    }
}

export const resetTransactionHistoryComplete = () => {
    return {
        type: RESET_TRANSACTION_HISTORY_COMPLETE
    }
}

export const fetchTransactionHistoryByDescription = (page = 1, size = 10, searchText, loadedItemsList) => {
    return {
        type: FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION,
        pageNumber: page,
        size: size,
        searchText: searchText,
        loadedItemsList: loadedItemsList
    }
}

export const fetchTransactionHistoryByDate = (page = 1, size = 10, startDate, endDate, tType, loadedItemsList) => {
    return {
        type: FETCH_TRANSACTION_HISTORY_BY_DATE,
        pageNumber: page,
        size: size,
        startDate: startDate,
        endDate: endDate,
        transactionType: tType,
        loadedItemsList
    }
}