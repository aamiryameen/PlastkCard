import { FETCH_TRANSACTION_HISTORY, FETCH_TRANSACTION_HISTORY_BY_DATE, FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION, RESET_TRANSACTION_HISTORY, RESET_TRANSACTION_HISTORY_COMPLETE, TRANSACTION_HISTORY_FAILURE, TRANSACTION_HISTORY_SUCCESS } from "../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    response: '',
    footerLoading: false,
    transactionList: [],
    pointsEarned: 0
}

export default function transactionHistoryReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case FETCH_TRANSACTION_HISTORY:
        case FETCH_TRANSACTION_HISTORY_BY_DATE:
        case FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION:
            return {
                ...state,
                isLoading: (action.pageNumber === 1) ? true : false,
                footerLoading: (action.pageNumber !== 1) ? true : false,
            }

        case TRANSACTION_HISTORY_FAILURE:
        case TRANSACTION_HISTORY_SUCCESS:

            return {
                ...state,
                isLoading: false,
                response: action.response,
                footerLoading: false,
                transactionList: (action.type === TRANSACTION_HISTORY_SUCCESS ? action.transactionList : []),
                pointsEarned: (action.type === TRANSACTION_HISTORY_SUCCESS ? action.pointsEarned : 0)
            }

        case RESET_TRANSACTION_HISTORY:
            return {
                ...state,
                isLoading: false,
                footerLoading: false,
                transactionList: ''
            }

        case RESET_TRANSACTION_HISTORY_COMPLETE:
            return {
                ...state,
                isLoading: false,
                footerLoading: false,
                transactionList: '',
                response: ''
            }

        default:
            return state;
    }
}