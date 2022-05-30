import { FCS_GET_STATUS, FCS_GET_STATUS_FAILURE, FCS_GET_STATUS_SUCCESS, FCS_SUBMIT_TNC, FCS_SUBMIT_TNC_FAILURE, FCS_SUBMIT_TNC_SUCCESS } from "../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    response: '',
    tncResponse: ''
}


export default function fcsDashBoardReducer(state = INITIAL_STATE, action) {

    
    switch (action.type) {
        case FCS_GET_STATUS:
        case FCS_SUBMIT_TNC:
            return {
                ...state,
                isLoading: true
            }

        case FCS_GET_STATUS_FAILURE:
        case FCS_GET_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }
        case FCS_SUBMIT_TNC_SUCCESS:
        case FCS_SUBMIT_TNC_FAILURE:
            return {
                ...state,
                isLoading: false,
                tncResponse: action.response
            }

        default:
            return state
    }
}