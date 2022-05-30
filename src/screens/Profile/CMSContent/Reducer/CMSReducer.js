
import { FETCH_CMS_CONTENT, CMS_CONTENT_SUCCESS, CMS_CONTENT_FAILURE, RESET_CMS_CONTENT, ACCEPT_TERMS_AND_CONDITIONS_PRESSED, ACCEPT_TERMS_AND_CONDITIONS_FAILURE, ACCEPT_TERMS_AND_CONDITIONS_SUCCESS, ACCEPT_DISCLOSURE_AGREEMENT_PRESSED, ACCEPT_DISCLOSURE_AGREEMENT_FAILURE, ACCEPT_DISCLOSURE_AGREEMENT_SUCCESS } from '../../../../utils/Constants'

const INITIAL_STATE = {

    isLoading: false,
    isError: false,
    response: '',
    tncResponse : ''

}

export default function fetchCmsContent(state = INITIAL_STATE, action) {

    switch (action.type) {

        case FETCH_CMS_CONTENT:
        case ACCEPT_TERMS_AND_CONDITIONS_PRESSED:
        case ACCEPT_DISCLOSURE_AGREEMENT_PRESSED:

            return {
                ...state,
                isError: false,
                isLoading: true,
            }

        case CMS_CONTENT_SUCCESS:

            return {
                ...state,
                isLoading: false,
                isError: false,
                response: action.response,
            }

        case CMS_CONTENT_FAILURE:
        case ACCEPT_TERMS_AND_CONDITIONS_FAILURE:
        case ACCEPT_DISCLOSURE_AGREEMENT_FAILURE:

            return {
                ...state,
                isLoading: false,
                response: action.response,
                isError: true,
            }

        case RESET_CMS_CONTENT:
            return {
                ...state,
                isLoading: false,
                response: '',
                isError: false,
                tncResponse: ''
            }

        case ACCEPT_TERMS_AND_CONDITIONS_SUCCESS:
        case ACCEPT_DISCLOSURE_AGREEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tncResponse: action.tncResponse,
                isError: false
            }

        default:
            return state

    }
}