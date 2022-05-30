import { ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE, ACCOUNT_STATUS_INTERAC_SCREEN_SUCCESS, CREATE_APPLICATION, CREATE_APPLICATION_FAILURE, CREATE_APPLICATION_SUCCESS, FETCH_ACCOUNT_STATUS_INTERAC_SCREEN, FETCH_INTERAC_TRANSACTION, INTERAC_CODE_SUBMISSION_FAILURE, INTERAC_CODE_SUBMISSION_SUCCESS, INTERAC_TRANSACTION_FAILURE, INTERAC_TRANSACTION_SUCCESS, RESET_COMPLETE_INTERAC_CODES_SCREEN, RESET_INTERAC_CODE_SCREEN, RESET_INTERAC_HISTORY_SCREEN, SUBMIT_INTERAC_CODE, USER_RESPONSE_RECEIVED, USE_CURRENT_AS_LIMIT, USE_CURRENT_AS_LIMIT_FAILURE, USE_CURRENT_AS_LIMIT_SUCCESS } from "../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    response: '',
    interacCodeSubmissionResponse: '',
    useCurrentAsLimitResponse: '',
    createApplicationResponse: '',
    userResponse: '',
    userResponseReceived: false

}

export default function interacCodesReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case FETCH_INTERAC_TRANSACTION:
        case SUBMIT_INTERAC_CODE:
        case USE_CURRENT_AS_LIMIT:
        case CREATE_APPLICATION:
            return {
                ...state,
                isLoading: true,
            }

        case FETCH_ACCOUNT_STATUS_INTERAC_SCREEN:
                return {
                    ...state,
                    isLoading: true,
                    response: '',
                    userResponse: '',
                    userResponseReceived: false
                }

        case INTERAC_TRANSACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response,
            }

        case INTERAC_TRANSACTION_FAILURE:
            return {
                ...state,
                isLoading: false,
                response: action.response,
            }

        case INTERAC_CODE_SUBMISSION_SUCCESS:
        case INTERAC_CODE_SUBMISSION_FAILURE:
            return {
                ...state,
                isLoading: false,
                interacCodeSubmissionResponse: action.response,
            }

        case RESET_INTERAC_CODE_SCREEN:
            return {
                ...state,
                isLoading: false,
                interacCodeSubmissionResponse: '',
                useCurrentAsLimitResponse: '',
                createApplicationResponse: '',
            }

        case USE_CURRENT_AS_LIMIT_FAILURE:
        case USE_CURRENT_AS_LIMIT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                useCurrentAsLimitResponse: action.response
            }

        case CREATE_APPLICATION_SUCCESS:
        case CREATE_APPLICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                createApplicationResponse: action.response
            }

        case ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE:
        case ACCOUNT_STATUS_INTERAC_SCREEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userResponse: action.response
            }

        case RESET_COMPLETE_INTERAC_CODES_SCREEN:
            return {
                ...state,
                isLoading: false,
                interacCodeSubmissionResponse: '',
                useCurrentAsLimitResponse: '',
                createApplicationResponse: '',
                userResponse: '',
                response: '',
                userResponseReceived: false
            }
        case RESET_INTERAC_HISTORY_SCREEN:
            return {
                ...state,
                isLoading: false,
                response: ''
            }

        case USER_RESPONSE_RECEIVED:
            return {
                ...state,
                userResponseReceived: true
            }

        default:
            return state;
    }

}