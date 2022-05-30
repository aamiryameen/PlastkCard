import { ACTIVATE_CARD_FAILURE, ACTIVATE_CARD, ACTIVATE_CARD_SUCCESS, OTP_CARD_ACTIVATION_FAILURE, OTP_CARD_ACTIVATION_SUCCESS, SEND_OTP_CARD_ACTIVATION, RESET_ACTIVATE_CARD_SCREEN } from "../../../utils/Constants";


const INITIAL_STATE = {
    isLoading: false,
    otpResponse: '',
    cardActivationResponse: '',
    isEmailSent: false,
    isError: false
}
export default function activateCardReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case SEND_OTP_CARD_ACTIVATION:
        case ACTIVATE_CARD:
            return {
                ...state,
                isLoading: true
            }

        case OTP_CARD_ACTIVATION_FAILURE:
        case OTP_CARD_ACTIVATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                otpResponse: action.response,
                isEmailSent : (action.type ===  OTP_CARD_ACTIVATION_SUCCESS ? true : false),
                isError: (action.type ===  OTP_CARD_ACTIVATION_SUCCESS ? false : true),
            }

        case ACTIVATE_CARD_FAILURE:
        case ACTIVATE_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cardActivationResponse: action.response,
                isError: (action.type ===  ACTIVATE_CARD_SUCCESS ? false : true),
                otpResponse: ''
            }

        case RESET_ACTIVATE_CARD_SCREEN:
            return {
                ...state,
                isLoading: false,
                cardActivationResponse: '',
                otpResponse: '',
                isError: false
            }

        default:
            return state
    }

}