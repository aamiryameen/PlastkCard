import { FCS_SIGN_UP_FAILURE, FCS_SIGN_UP_PRESSED, FCS_SIGN_UP_SUCCESS, RESET_FCS_SIGNUP_DATA, RESET_FCS_SIGN_UP, UPDATE_FCS_SIGNUP_DATA } from "../../../../utils/Constants";


const INITIAL_STATE = {
    isLoading: false,
    response: '',
    signUpDataObject : ''
}


export default function fcsSignUpReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FCS_SIGN_UP_PRESSED:
            return {
                ...state,
                isLoading: true
            }

        case FCS_SIGN_UP_SUCCESS:
        case FCS_SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }

        case RESET_FCS_SIGN_UP:
            return {
                ...state,
                isLoading: false,
                response: ''
            }

        case RESET_FCS_SIGNUP_DATA:
            return {
                ...state,
                signUpDataObject: ''
            }

        case UPDATE_FCS_SIGNUP_DATA:
            return {
                ...state,
                signUpDataObject: action.payload
            }

        default:
            return state
    }

}