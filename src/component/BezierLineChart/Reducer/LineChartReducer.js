import { CHART_DATA_FAILURE, CHART_DATA_SUCCESS, FETCH_CHART_DATA } from "../../../utils/Constants"

const INITIAL_STATE = {
    isLoading: false,
    response: '',
    isError: false,
}


export default function chartDataWithNamedType(viewType = '') {
    return function chartDataReducer(state = INITIAL_STATE, action) {

        switch (action.type) {
            case `${FETCH_CHART_DATA}_${viewType}`:
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                }
            case `${CHART_DATA_SUCCESS}_${viewType}`:

                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    response: action.response

                }
            case `${CHART_DATA_FAILURE}_${viewType}`:
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                    response: action.response
                }

            default:
                return state;

        }

    }
}