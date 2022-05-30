import { FETCH_SPENDING_INSIGHTS, SPENDING_INSIGHTS_FAILURE, SPENDING_INSIGHTS_SUCCESS } from "../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    response: ''
}

export default function myBudgetReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case FETCH_SPENDING_INSIGHTS:
            return {
                ...state,
                isLoading: true
            }
        case SPENDING_INSIGHTS_FAILURE:
        case SPENDING_INSIGHTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }

        default:
            return state
    }

}