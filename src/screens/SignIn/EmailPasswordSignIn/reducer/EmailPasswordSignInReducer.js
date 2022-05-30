
import { PERFORM_EMAIL_PASSWORD_SIGN_IN, EMAIL_PASSWORD_SIGN_IN_SUCCESS, EMAIL_PASSWORD_SIGN_IN_FAILURE, RESET_EMAIL_PASSWORD_SIGN_IN, VALIDATE_SET_PASSWORD_TOKEN, VALID_SET_PASSWORD_TOKEN, INVALID_SET_PASSWORD_TOKEN, VALIDATE_EMAIL_TOKEN, VALIDATE_EMAIL_TOKEN_FAILURE, VALIDATE_EMAIL_TOKEN_SUCCESS} from '../../../../utils/Constants'
const INITIAL_STATE = {
    isLoading: false,
    response: '',
    isError: false,
    tokenValidationResponse: '',
    emailValidationResponse: ''
}

export default function SignInWithNamedType(viewType = '') {
    return function emailPasswordSignIn(state = INITIAL_STATE, action) {

        switch (action.type) {
            case `${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${viewType}`:
            case `${VALIDATE_SET_PASSWORD_TOKEN}_${viewType}`:
            case `${VALIDATE_EMAIL_TOKEN}_${viewType}`:

                return {
                    ...state,
                    isLoading: true,
                    isError: false
                }
            case `${EMAIL_PASSWORD_SIGN_IN_SUCCESS}_${viewType}`:

                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    response: action.response

                }
            case `${EMAIL_PASSWORD_SIGN_IN_FAILURE}_${viewType}`:
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    response: action.response
                }
            case `${RESET_EMAIL_PASSWORD_SIGN_IN}_${viewType}`:
                return {

                    ...state,
                    isLoading: false,
                    response: '',
                    isError: false,
                    tokenValidationResponse: '',
                    emailValidationResponse: ''
                }

            case `${VALID_SET_PASSWORD_TOKEN}_${viewType}`:
            case `${INVALID_SET_PASSWORD_TOKEN}_${viewType}`:
                return {
                    ...state,
                    isLoading: false,
                    tokenValidationResponse: action.tokenValidationResponse
                }

            case `${VALIDATE_EMAIL_TOKEN_FAILURE}_${viewType}`:
            case `${VALIDATE_EMAIL_TOKEN_SUCCESS}_${viewType}`:
                return {
                    ...state,
                    isLoading: false,
                    emailValidationResponse: action.emailValidationResponse
                }
            default:
                return state;

        }

    }
}