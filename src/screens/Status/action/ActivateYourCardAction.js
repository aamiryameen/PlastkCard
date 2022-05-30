import { ACTIVATE_CARD, RESET_ACTIVATE_CARD_SCREEN, SEND_OTP_CARD_ACTIVATION } from "../../../utils/Constants"

export const sendOTPEmail = (data) => {
    return {
        type: SEND_OTP_CARD_ACTIVATION,
        payload: data
    }
}

export const activateCardAction = (data) => {
    return {
        type: ACTIVATE_CARD,
        payload: data
    }
}

export const resetActivateCardScreen = () => {
    return {
        type: RESET_ACTIVATE_CARD_SCREEN,
    }
}