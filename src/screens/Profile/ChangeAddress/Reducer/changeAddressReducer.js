
import { PERFROM_CHANGE_ADDRESS, RESET_CHANGE_ADDRESS, CHANGE_ADDRESS_FAILURE, CHANGE_ADDRESS_SUCCESS } from '../../../../utils/Constants'

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    response: ''
}

export default function perfromChangeAddress(state = INITIAL_STATE, action) {

    switch (action.type) {

        case PERFROM_CHANGE_ADDRESS:

            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case CHANGE_ADDRESS_SUCCESS:

            return {
                ...state,
                isLoading: false,
                isError: false,
                response: action.response,
            }
        case CHANGE_ADDRESS_FAILURE:

            return {
                ...state,
                isLoading: false,
                isError: true,
                response: action.response
            }

        case RESET_CHANGE_ADDRESS:

            return {
                ...state,
                isLoading: false,
                isError: false,
                response: ''

            }

        default:
            return state;

    }

}