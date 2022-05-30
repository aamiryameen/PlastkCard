import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, FETCH_CHANGE_PASSWORD } from "../../../../utils/Constants";

const INITIAL_STATE = {

    isLoading: false,
    isError: false,
    response: ''
}

export default function fetchChangePassword(state = INITIAL_STATE, action) {


   
    switch (action.type) {
      
        case FETCH_CHANGE_PASSWORD:
    
            return {
                
                ...state,
                isLoading: true,
                isError: false

            }

        case CHANGE_PASSWORD_SUCCESS:
        
        return {
                ...state,
                isError: false,
                isLoading: false,
                response: action.response
            }

        case CHANGE_PASSWORD_FAILURE:
        
        return {
                ...state,
                isError: true,
                isLoading: false,
                response: action.response
            }

        case CHANGE_PASSWORD_RESET: {

            return {
                ...state,
                isError: false,
                isLoading: false,
                response: ''

            }
        }

        default: 
        return state

    }

}