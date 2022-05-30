import { PERFORM_SET_PASSWORD, RESET_SET_PASSWORD_SCREEN, SET_PASSWORD_FAILURE, SET_PASSWORD_SUCCESS } from '../../../../utils/Constants'

const INITIAL_STATE = {

    isLoading: false,
    message: '',
    isError: false,

}

export default function setPasswordReducer (state = INITIAL_STATE, action) {
    switch (action.type) {

        case PERFORM_SET_PASSWORD:

            return {
                ...state,
                isLoading: true,
                isError: false

            }
        case SET_PASSWORD_SUCCESS:
            
            return {
                ...state,
                isLoading: false,
                message: action.message,
                isError: false,
            }
        case SET_PASSWORD_FAILURE:

            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.message
            }
            case RESET_SET_PASSWORD_SCREEN:
                return {
                    
                    ...state,
                    isLoading: false,
                    message: '',
                    isError: false,
                }
            default : 
            return state;
    }

}