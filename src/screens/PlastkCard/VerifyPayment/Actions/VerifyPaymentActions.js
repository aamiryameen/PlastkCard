import { FETCH_INTERAC_CODE_PAYMENT_HISTORY, RESET_INTERAC_CODE_HISTORY_SCREEN, RESET_INTERAC_CODE_PAYMENT, RESET_INTERAC_CODE_PAYMENT_COMPLETE, SUBMIT_INTERAC_CODE_PAYMENT } from "../../../../utils/Constants"


export const submitInteracCodePaymentActionPressed = (code) => {
    return {
        type: SUBMIT_INTERAC_CODE_PAYMENT,
        code: code
    }
}

export const resetInteracCodePaymentScreenAction = () => {
    return {
        type: RESET_INTERAC_CODE_PAYMENT
    }
}

export const resetInteracCodePaymentScreenCompleteAction = () => {
    return {
        type: RESET_INTERAC_CODE_PAYMENT_COMPLETE
    }
}

export const fetchInteracPaymentHistory = (perPage = 100, page = 1) => {

    return {
        type: FETCH_INTERAC_CODE_PAYMENT_HISTORY,
        perPage: perPage,
        page: page
    }
}

export const resetInteracCodeHistoryScreen = () => {
    return {
        type: RESET_INTERAC_CODE_HISTORY_SCREEN
    }
}