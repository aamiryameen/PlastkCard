
import { FETCH_FEEDBACK, FEEDBACK_SUCCESS, FEEDBACK_FAILURE, FEEDBACK_RESET } from '../../../../utils/Constants'


const INITIALIZE_STATE = {

    isLoading: false,
    isError: false,
    response: ''

}

export default function fetchFeedback(state = INITIALIZE_STATE, action) {

    switch (action.type) {

        case FETCH_FEEDBACK:

            return {

                ...state,
                isLoading: true,
                isError: false,

            }
        case FEEDBACK_SUCCESS:

            return {

                ...state,
                isLoading: false,
                isError: false,
                response: action.response

            }

        case FEEDBACK_FAILURE:

            return {
                ...state,
                isLoading: false,
                isError: true,
                response: action.response

            }

        case FEEDBACK_RESET:

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