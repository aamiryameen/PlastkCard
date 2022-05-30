import { FETCH_INTERAC_CODE_PAYMENT_HISTORY, INTERAC_CODE_PAYMENT_FAILURE, INTERAC_CODE_PAYMENT_HISTORY_FAILURE, INTERAC_CODE_PAYMENT_HISTORY_SUCCESS, INTERAC_CODE_PAYMENT_SUCCESS, RESET_INTERAC_CODE_HISTORY_SCREEN, RESET_INTERAC_CODE_PAYMENT, RESET_INTERAC_CODE_PAYMENT_COMPLETE, SUBMIT_INTERAC_CODE_PAYMENT } from "../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    interacResponse: '',
    interacHistoryResponse: ''
}

export default function verifyPaymentsReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case SUBMIT_INTERAC_CODE_PAYMENT:
        case FETCH_INTERAC_CODE_PAYMENT_HISTORY:
            return {
                ...state,
                isLoading: true
            }
        case INTERAC_CODE_PAYMENT_FAILURE:
        case INTERAC_CODE_PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interacResponse: action.response
            }

        case INTERAC_CODE_PAYMENT_HISTORY_FAILURE:
        case INTERAC_CODE_PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interacHistoryResponse: action.response
            }

        case RESET_INTERAC_CODE_PAYMENT:
            return {
                ...state,
                isLoading: false,
                interacResponse: ''
            }
        case RESET_INTERAC_CODE_PAYMENT_COMPLETE:
            return {
                ...state,
                isLoading: false,
                interacResponse: '',
                interacHistoryResponse: ''
            }
        case RESET_INTERAC_CODE_HISTORY_SCREEN:
            return {
                ...state,
                isLoading: false,
                interacHistoryResponse: ''
            }

        default:
            return state
    }
}