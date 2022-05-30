import { UPDATE_PROFILE_PICTURE_FAILURE, UPDATE_PROFILE_PICTURE_SUCCESS, UPDATE_PROFILE_PICTURE, RESET_PROFILE_SCREEN } from "../../../utils/Constants"

const INITIAL_STATE = {
    isLoading: false,
    response: ''
}

export default function profileReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case UPDATE_PROFILE_PICTURE:
            return {
                ...state,
                isLoading: true
            }

        case UPDATE_PROFILE_PICTURE_FAILURE:
        case UPDATE_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.response
            }
        case RESET_PROFILE_SCREEN:
            return {
                isLoading: false,
                response: ''
            }
        default:
            return state;
    }
}