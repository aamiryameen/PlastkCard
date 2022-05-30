import { FETCH_USER_IP, PERFORM_EMAIL_PASSWORD_SIGN_IN, RESET_EMAIL_PASSWORD_SIGN_IN, VALIDATE_EMAIL_TOKEN, VALIDATE_SET_PASSWORD_TOKEN, VALIDATE_SET_PASSWORD_TOKEN_SIGNUP } from "../../../../utils/Constants"

export const performEmailPasswordSignIn = (data, viewType) => {

    return {
        type: `${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${viewType}`,
        payload: data,
        viewType: viewType
    }
}

export const resetEmailPasswordSignIn = (viewType) => {

    return {
        type: `${RESET_EMAIL_PASSWORD_SIGN_IN}_${viewType}`
    }

}


export const validateSetPasswordTokenAction = (data, viewType) => {

    return {
        type: `${VALIDATE_SET_PASSWORD_TOKEN}_${viewType}`,
        payload: data,
        viewType: viewType
    }
}

export const fetchUserIPAction = (viewType) => {
    return {
        type: `${FETCH_USER_IP}_${viewType}`,
    }
}

export const validateEmailTokenAction = (data, viewType) => {

    return {
        type: `${VALIDATE_EMAIL_TOKEN}_${viewType}`,
        payload: data,
        viewType: viewType
    }
}


