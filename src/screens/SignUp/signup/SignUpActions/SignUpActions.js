
import { PERFORM_SIGN_UP, RESET_SIGNUP_DATA_OBJECT, RESET_SIGN_UP_SCREEN, UPDATE_SIGN_UP_DATA_OBJECT, VALIDATE_SET_PASSWORD_TOKEN_SIGNUP } from '../../../../utils/Constants'

export const performSignUpAction = (data) => {
    return {
        type: PERFORM_SIGN_UP,
        payload: data
    }
}

export const resetSignUpScreenAction = () => {
    return {
        type: RESET_SIGN_UP_SCREEN,
    }
}

export const vaildateSetPasswordTokenAction = (token) => {
    return {
        type: VALIDATE_SET_PASSWORD_TOKEN_SIGNUP,
        token: token
    }
}

export const updateSignUpDataAction = (obj) => {
    return {
        type: UPDATE_SIGN_UP_DATA_OBJECT,
        signUpDataObject: obj
    }
}

export const resetSignUpDataObjectAction = () => {
    return {
        type: RESET_SIGNUP_DATA_OBJECT,
    }
}