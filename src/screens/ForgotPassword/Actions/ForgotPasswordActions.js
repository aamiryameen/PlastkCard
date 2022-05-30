import { FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD, RESET_FORGOT_PASSWORD_SCREEN, RESET_RESEND_FORGOT_PASSWORD_SCREEN } from "../../../utils/Constants"

export const forgotPasswordAction = (email) => {

    return {
        type: FORGOT_PASSWORD,
        email : email
    }
}
export const resetForgotPasswordScreenAction = () => {

    return {
        type: RESET_FORGOT_PASSWORD_SCREEN,
    }
}



export const resendForgotPasswordAction = (email) => {

    return {
        type: RESEND_FORGOT_PASSWORD,
        email : email
    }
}
export const resetResendForgotPasswordScreenAction = () => {

    return {
        type: RESET_RESEND_FORGOT_PASSWORD_SCREEN,
    }
}