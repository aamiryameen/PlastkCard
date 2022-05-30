import { AUTO_SEND_VERIFICATION_EMAIL, CHECK_EMAIL_VERIFIED, FETCH_ACCOUNT_STATUS, RESEND_VERIFICATION_EMAIL, RESET_ACCOUNT_STATUS_SCREEN, VALIDATE_EMAIL_TOKEN } from '../../../utils/Constants'

export const getAccountStatusAction = () => {

    return {
        type: FETCH_ACCOUNT_STATUS,

    }

}

export const verifyEmailAction = () => {
    return {
        type: CHECK_EMAIL_VERIFIED
    }
}

export const resendVerificationEmailAction = () => {
    return {
        type: RESEND_VERIFICATION_EMAIL
    }
}

export const resetAccountStatusScreen = () => {
    return {
        type: RESET_ACCOUNT_STATUS_SCREEN
    }

}

export const validateEmailTokenStatusScreenAction = (token) => {

    return {
        type: VALIDATE_EMAIL_TOKEN,
        payload: token
    }

}

export const autoSendVerificationEmailAction = () => {

    return {
        type: AUTO_SEND_VERIFICATION_EMAIL
    }

}