import { CREATE_APPLICATION, FETCH_ACCOUNT_STATUS_INTERAC_SCREEN, FETCH_INTERAC_TRANSACTION, RESET_COMPLETE_INTERAC_CODES_SCREEN, RESET_INTERAC_CODE_SCREEN, RESET_INTERAC_HISTORY_SCREEN, SUBMIT_INTERAC_CODE, USER_RESPONSE_RECEIVED, USE_CURRENT_AS_LIMIT } from "../../../utils/Constants"


export const fetchInteracTransactionAction = (codes) => {

    return {
        type: FETCH_INTERAC_TRANSACTION,
        payload : codes
    }
}

export const fetchAccountStatusInteracScreen = () => {

    return {
        type: FETCH_ACCOUNT_STATUS_INTERAC_SCREEN,
    }
}

export const submitInteracCode = (interacCode) => {

    return {
        type: SUBMIT_INTERAC_CODE,
        payload : interacCode
    }
}

export const resetInteracCodeScreen = () => {

    return {
        type: RESET_INTERAC_CODE_SCREEN,
    }
}

export const useCurrentAsLimitAction = (data) => {

    return {
        type: USE_CURRENT_AS_LIMIT,
        payload: data
    }
}

export const createApplicationAction = (data) => {

    return {
        type: CREATE_APPLICATION,
        payload: data
    }
}

export const resetCompleteStateInteracCodeScreenAction = () => {

    return {
        type: RESET_COMPLETE_INTERAC_CODES_SCREEN,
    }
}

export const resetInteracHistoryScreen = () => {

    return {
        type: RESET_INTERAC_HISTORY_SCREEN,
    }
}

export const userResponseReceivedAction = () => {
    return {
        type: USER_RESPONSE_RECEIVED
    }
}