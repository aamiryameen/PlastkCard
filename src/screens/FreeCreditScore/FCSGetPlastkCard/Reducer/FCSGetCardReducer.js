import { FCS_APPLY_PLASTK_CARD, FCS_APPLY_PLASTK_CARD_FAILURE, FCS_APPLY_PLASTK_CARD_SUCCESS, FCS_RESET_APPLY_PLASTK_CARD } from "../../../../utils/Constants";


const INITIAL_STATE = {
    isLoading: false,
    response: ''
}

export default function fcsGetCardReducer(state = INITIAL_STATE, action) {


    switch (action.type) {

        case FCS_APPLY_PLASTK_CARD:
            return {
                ...state,
                isLoading: true
            }

        case FCS_APPLY_PLASTK_CARD_FAILURE:
        case FCS_APPLY_PLASTK_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }

        case FCS_RESET_APPLY_PLASTK_CARD:
            return {
                ...state,
                isLoading: false,
                response: ''
            }

        default:
            return state
    }
}