import { FETCH_HUBSPOT_BLOGS_ALL, FETCH_HUBSPOT_BLOGS_ALL_FAILURE, FETCH_HUBSPOT_BLOGS_ALL_SUCCESS, RESET_HUBSPOT_BLOGS } from "../../../../../../utils/Constants"

const INITIAL_STATE = {
    isLoading: false,
    response: '',
    isError: false,
}


export default function creditEducationReducer (state = INITIAL_STATE, action) {


    switch(action.type) {

        case FETCH_HUBSPOT_BLOGS_ALL:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_HUBSPOT_BLOGS_ALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }
        
        case FETCH_HUBSPOT_BLOGS_ALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                response: action.response
            }

        case RESET_HUBSPOT_BLOGS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                response: ''
            }

        default:
            return state
    }
}