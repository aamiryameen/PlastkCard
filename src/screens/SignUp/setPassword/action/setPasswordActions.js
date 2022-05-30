
import { PERFORM_SET_PASSWORD, RESET_SET_PASSWORD_SCREEN } from '../../../../utils/Constants'

export const performSetPasswordAction = (data) => {
    return {
        type: PERFORM_SET_PASSWORD,
        payload: data
    }
}

export const resetSetPasswordScreenAction = () => {
    return {
        type: RESET_SET_PASSWORD_SCREEN,
    }
}

