import { ACCEPT_EQUIFAX_DISCLAIMER, FETCH_CREDIT_FILE, FETCH_EID_QUESTIONS, RESET_EID_VERIFICATION_SCREEN, RESET_EQUIFAX_DISCLAIMER, START_EID_VERIFICATION, SUBMIT_EID_ANSWERS } from "../../../../utils/Constants"


export const startEIDVerificationAction = () => {
    return {
        type: START_EID_VERIFICATION
    }
}

export const fetchEIDQuestionsAction = () => {
    return {
        type: FETCH_EID_QUESTIONS
    }
}

export const resetEIDVerificationAction = () => {
    return {
        type: RESET_EID_VERIFICATION_SCREEN
    }
}

export const fetchCreditFileAction = (isHardRefresh = false) => {
    return {
        type: FETCH_CREDIT_FILE,
        isHardRefresh: isHardRefresh
    }
}

export const submitAnswersAction = (answerObject) => {
    return {
        type: SUBMIT_EID_ANSWERS,
        payload: answerObject
    }
}

export const acceptEquifaxDisclaimerAction = () => {
    return {
        type: ACCEPT_EQUIFAX_DISCLAIMER
    }
}

export const resetEquifaxDisclaimer = () => {
    return {
        type: RESET_EQUIFAX_DISCLAIMER
    }
}