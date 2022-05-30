import { MY_CREDIT_SUBMIT_TNC, MY_CREDIT_SUBMIT_TNC_FAILURE, MY_CREDIT_SUBMIT_TNC_SUCCESS } from "../../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    response: ''
}


export default function myCreditTnCReducer (state = INITIAL_STATE, action) {

    switch(action.type) {
        case MY_CREDIT_SUBMIT_TNC:
            return {
                ...state,
                isLoading: true
            }

        case MY_CREDIT_SUBMIT_TNC_FAILURE:
        case MY_CREDIT_SUBMIT_TNC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }

        default:
            return state
    }
}