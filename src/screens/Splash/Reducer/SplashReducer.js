import { LOGOUT_APP, PROFILE_ACTIVE, SIGN_IN_SUCCESS } from '../../../utils/Constants'

const INITIAL_STATE = {

    isSuccess: false,
    isProfileActive: false,
    stack: ''

}

export default function signInSuccess(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                stack : action.stack

            }

        case LOGOUT_APP:
            return {
                ...state,
                isSuccess: false,
                isProfileActive: false,
                stack : ''
            }
        case PROFILE_ACTIVE:
            return {
                ...state,
                isProfileActive: true
            }

        default:
            return state

    }

}