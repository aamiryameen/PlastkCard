import { INVALID_SET_PASSWORD_TOKEN_SIGNUP, PERFORM_SIGN_UP, RESET_SIGNUP_DATA_OBJECT, RESET_SIGN_UP_SCREEN, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, UPDATE_SIGN_UP_DATA_OBJECT, VALIDATE_SET_PASSWORD_TOKEN_SIGNUP, VALID_SET_PASSWORD_TOKEN_SIGNUP } from '../../../../utils/Constants'

const INITIAL_STATE = {
    isLoading: false,
    response: '',
    isError: false,
    tokenValidationResponse: '',
    signUpDataObject: ''

}

export default function signUpReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PERFORM_SIGN_UP:
        case VALIDATE_SET_PASSWORD_TOKEN_SIGNUP:
            return {
                ...state,
                isLoading: true,
                isError: false,
                tokenValidationResponse: ''
            }

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response,
                isError: false

            }

        case SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                response: action.response,
                isError: true
            }

        case RESET_SIGN_UP_SCREEN:
            return {
                ...state,
                isLoading: false,
                response: '',
                isError: false,
                tokenValidationResponse: ''
            }

        case VALID_SET_PASSWORD_TOKEN_SIGNUP:
        case INVALID_SET_PASSWORD_TOKEN_SIGNUP:
            return {
                ...state,
                isLoading: false,
                tokenValidationResponse: action.tokenValidationResponse
            }

        case UPDATE_SIGN_UP_DATA_OBJECT:
            return {
                ...state,
                signUpDataObject: action.signUpDataObject
            }

        case RESET_SIGNUP_DATA_OBJECT:
            return {
                ...state,
                signUpDataObject: ''
            }
        default:
            return state
    }

}