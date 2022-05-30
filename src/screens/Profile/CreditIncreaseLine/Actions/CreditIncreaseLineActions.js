
import { FETCH_REQUEST_CREDIT_LINE_HISTORY, RESET_REQUEST_CREDIT_LINE_HISTORY_SCREEN, RESET_CREDIT_LINE_COMPLETE_HISTORY, SUBMIT_REQUEST_CREDIT_LINE, RESET_REQUEST_CREDIT_LINE, RESET_CREDIT_LIMIT_INCREASE_PENDING, REQUEST_CREDIT_LIMIT_PENDING } from "../../../../utils/Constants"


export const submitRequestCreditIncreaseActionPressed = (code) => {
    return {
        type: SUBMIT_REQUEST_CREDIT_LINE,
        code: code
    }
}

export const requestCreditLimitPendingAction = (perPage = 10, page = 1) => {
    return {
        type: REQUEST_CREDIT_LIMIT_PENDING,
        perPage: perPage,
        page: page
    }
}

export const resetCreditLimitIncreasePending = () => {
    return {

        type: RESET_CREDIT_LIMIT_INCREASE_PENDING
    }
}

export const resetRequestCreditIncreaseScreenAction = () => {
    return {
        type: RESET_REQUEST_CREDIT_LINE
    }
}

export const resetRequestCreditIncreaseCompleteAction = () => {
    return {
        type: RESET_CREDIT_LINE_COMPLETE_HISTORY
    }
}

export const fetchRequestCreditIncreaseHistory = (perPage = 10, page = 1) => {

    return {
        type: FETCH_REQUEST_CREDIT_LINE_HISTORY,
        perPage: perPage,
        page: page
    }
}



export const resetRequestCreditIncreaseHistoryScreen = () => {
    return {
        type: RESET_REQUEST_CREDIT_LINE_HISTORY_SCREEN
    }
}