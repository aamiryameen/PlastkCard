import { FCS_RESEND_OTP, FCS_SIGN_UP_PRESSED, RESET_FCS_SIGNUP_DATA, RESET_FCS_SIGN_UP, UPDATE_FCS_SIGNUP_DATA } from "../../../../utils/Constants"


export const fcsSignUpPressedAction = (payload) => {
    return {
        type: FCS_SIGN_UP_PRESSED,
        payload : payload
    }
}

export const resetFcsSignUpAction = () => {
    return {
        type: RESET_FCS_SIGN_UP
    }
}

export const resetFcsSignUpDataAction = () => {
    return {
        type: RESET_FCS_SIGNUP_DATA
    }
}

export const updateFcsSignUpDataAction = (payload) => {
    return {
        type: UPDATE_FCS_SIGNUP_DATA,
        payload : payload
    }
}


export const fcsResendOTPAction = () => {
    return {
        type: FCS_RESEND_OTP
    }
}