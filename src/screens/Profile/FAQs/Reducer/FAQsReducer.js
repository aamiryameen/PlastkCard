import { GET_ALL_FAQS, GET_ALL_FAQS_BY_CATEGORY, GET_ALL_FAQS_BY_CATEGORY_FAULIRE, GET_ALL_FAQS_BY_CATEGORY_SUCCESS, GET_ALL_FAQS_FAULIRE, GET_ALL_FAQS_SUCCESS, RESET_FAQS, RESET_FAQS_BY_CATEGORY, SEARCH_FAQS, SEARCH_FAQ_FAILURE, SEARCH_FAQ_SUCCESS } from "../../../../utils/Constants";


const INITIAL_STATE = {
    response: '',
    isLoading: false,
    isError: false,
    searchResponse: '',

    categoryResponse: '',
    categoryLoading: false,
    categoryError: false

}


export default function faqReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case GET_ALL_FAQS:
        case SEARCH_FAQS:
            return {
                ...state,
                isLoading: true,
                response: '',
                searchResponse: '',
                isError: false
            }

        case GET_ALL_FAQS_SUCCESS:
            return {
                ...state,
                isError: false,
                isLoading: false,
                response: action.response,
                searchResponse: ''
            }

        case GET_ALL_FAQS_FAULIRE:
            return {
                ...state,
                isError: true,
                isLoading: false,
                response: action.response,
                searchResponse: ''
            }

        case SEARCH_FAQ_SUCCESS:
            return {
                ...state,
                isError: false,
                isLoading: false,
                response: '',
                searchResponse: action.response
            }

        case SEARCH_FAQ_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false,
                response: '',
                searchResponse: action.response
            }

        case RESET_FAQS:
            return {
                ...state,
                isError: false,
                isLoading: false,
                response: '',
                searchResponse: ''
            }

        case GET_ALL_FAQS_BY_CATEGORY:
            return {
                ...state,
                categoryError: false,
                categoryLoading: true,
                categoryResponse: ''
            }

        case GET_ALL_FAQS_BY_CATEGORY_FAULIRE:
            return {
                ...state,
                categoryResponse: action.response,
                categoryLoading: false,
                categoryError: true
            }

        case GET_ALL_FAQS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryError: false,
                categoryLoading: false,
                categoryResponse: action.response
            }

        case RESET_FAQS_BY_CATEGORY:
            return {
                ...state,
                categoryError: false,
                categoryLoading: false,
                categoryResponse: ''
            }


        default:
            return state
    }

}