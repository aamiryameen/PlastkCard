import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, RESEND_FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD_FAILURE, RESEND_FORGOT_PASSWORD_SUCCESS, RESET_RESEND_FORGOT_PASSWORD_SCREEN, RESET_FORGOT_PASSWORD_SCREEN } from "../../../utils/Constants"

const INITIAL_STATE = {
    isLoading: false,
    message: '',
    isError: false,
    resendPasswordResponse: ''

}

export default function forgotPasswordReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FORGOT_PASSWORD:
        case RESEND_FORGOT_PASSWORD:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.message,
                isError: false
            }

        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: action.message,
                isError: true
            }

        case RESET_FORGOT_PASSWORD_SCREEN:
            return {
                ...state,
                isLoading: false,
                message: '',
                isError: false,
            }

            case RESEND_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resendPasswordResponse: action.response,
                isError: false
            }

        case RESEND_FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                resendPasswordResponse: action.response,
                isError: true
            }

        case RESET_RESEND_FORGOT_PASSWORD_SCREEN:
            return {
                ...state,
                isLoading: false,
                resendPasswordResponse: '',
                isError: false,
            }

        default:
            return state
    }

}