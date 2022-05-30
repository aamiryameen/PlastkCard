import { FETCH_REQUEST_CREDIT_LINE_HISTORY, REQUEST_CREDIT_LINE_FAILURE, REQUEST_CREDIT_LINE_HISTORY_FAILURE,RESET_CREDIT_LIMIT_INCREASE_PENDING ,REQUEST_CREDIT_LINE_HISTORY_SUCCESS, REQUEST_CREDIT_LINE_SUCCESS, RESET_REQUEST_CREDIT_LINE_HISTORY_SCREEN, RESET_REQUEST_CREDIT_LINE, RESET_CREDIT_LINE_COMPLETE_HISTORY, SUBMIT_REQUEST_CREDIT_LINE, REQUEST_CREDIT_LIMIT_PENDING, REQUEST_CREDIT_PENDING_FAILURE, REQUEST_CREDIT_PENDING_SUCCESS } from "../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    interacResponse: '',
    interacHistoryResponse: '',
    creditLimitPending: ''
}

export default function requestCreditIncreaseReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case SUBMIT_REQUEST_CREDIT_LINE:
        case FETCH_REQUEST_CREDIT_LINE_HISTORY:
            return {
                ...state,
                isLoading: true
            }
        case REQUEST_CREDIT_LINE_FAILURE:
        case REQUEST_CREDIT_LINE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interacResponse: action.response
            }

        case REQUEST_CREDIT_LINE_HISTORY_FAILURE:
        case REQUEST_CREDIT_LINE_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interacHistoryResponse: action.response
            }

        case RESET_REQUEST_CREDIT_LINE:
            return {
                ...state,
                isLoading: false,
                interacResponse: '',
            }
        case RESET_CREDIT_LINE_COMPLETE_HISTORY:
            return {
                ...state,
                isLoading: false,
                interacResponse: '',
                interacHistoryResponse: ''
            }
        case RESET_REQUEST_CREDIT_LINE_HISTORY_SCREEN:
            return {
                ...state,
                isLoading: false,
                interacHistoryResponse: ''
            }

        case REQUEST_CREDIT_PENDING_FAILURE:
        case REQUEST_CREDIT_PENDING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                creditLimitPending: action.response
            }
            case RESET_CREDIT_LIMIT_INCREASE_PENDING: 
            return {
                ...state,
                isLoading: false,
                creditLimitPending: '',
                
            }
            case REQUEST_CREDIT_LIMIT_PENDING:
                return {
                    ...state,
                    isLoading: true
                }

        default:
            return state
    }
}