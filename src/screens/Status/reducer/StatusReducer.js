import { FETCH_ACCOUNT_STATUS, ACCOUNT_STATUS_ERROR, ACCOUNT_STATUS_FAILURE, ACCOUNT_STATUS_SUCCESS, CHECK_EMAIL_VERIFIED, EMAIL_VERIFIED_FAILURE, EMAIL_VERIFIED_SUCCESS, RESEND_VERIFICATION_EMAIL, RESEND_VERIFICATION_EMAIL_FAILURE, RESEND_VERIFICATION_EMAIL_SUCCESS, RESET_ACCOUNT_STATUS_SCREEN, VALIDATE_EMAIL_TOKEN, VALIDATE_EMAIL_TOKEN_SUCCESS, VALIDATE_EMAIL_TOKEN_FAILURE } from '../../../utils/Constants'

const INITIAL_STATE = {

    isLoading: false,
    isError: false,
    response: '',
    emailVerifiedResponse: '',
    resendVerificationEmailResponse: '',
    emailValidationResponse: ''
}

export default function accountStatus(state = INITIAL_STATE, action) {

  
    
    switch (action.type) {

        case FETCH_ACCOUNT_STATUS:
        case CHECK_EMAIL_VERIFIED:
        case RESEND_VERIFICATION_EMAIL:
        case VALIDATE_EMAIL_TOKEN:

            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case ACCOUNT_STATUS_FAILURE:

            return {
                ...state,
                isLoading: false,
                response: action.response,
                isError: true
            }

        case ACCOUNT_STATUS_SUCCESS:

            return {

                ...state,
                isLoading: false,
                response: action.response,
                isError: false

            }

        case EMAIL_VERIFIED_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                emailVerifiedResponse: action.response
            }

        case EMAIL_VERIFIED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                emailVerifiedResponse: action.response
            }

        case RESEND_VERIFICATION_EMAIL_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                resendVerificationEmailResponse: action.response
            }

        case RESEND_VERIFICATION_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                resendVerificationEmailResponse: action.response
            }

        case RESET_ACCOUNT_STATUS_SCREEN:
            return {
                ...state,
                isLoading: false,
                isError: false,
                response: '',
                emailVerifiedResponse: '',
                resendVerificationEmailResponse: '',
                emailValidationResponse:''
            }

            case VALIDATE_EMAIL_TOKEN_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    emailValidationResponse: action.emailValidationResponse
                }
    
            case VALIDATE_EMAIL_TOKEN_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    emailValidationResponse: action.emailValidationResponse
                }

        default:
            return state

    }

}