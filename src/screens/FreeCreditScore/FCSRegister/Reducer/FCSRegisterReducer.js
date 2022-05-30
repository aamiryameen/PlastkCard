import { FSC_REGISTER_FAILURE, FSC_REGISTER_PRESSED, FSC_REGISTER_SUCCESS, RESET_FSC_REGISTER_SCREEN } from "../../../../utils/Constants";

const INITIAL_STATE = {
    isLoading: false,
    response: ''
}
export default function fcsRegisterReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FSC_REGISTER_PRESSED:
            return {
                ...state,
                isLoading: true
            }

        case FSC_REGISTER_SUCCESS:
        case FSC_REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }

        case RESET_FSC_REGISTER_SCREEN:
            return {
                ...state,
                isLoading: false,
                response: ''
            }

        default:
            return state
    }

}