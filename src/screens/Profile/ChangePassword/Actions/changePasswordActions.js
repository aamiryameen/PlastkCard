
import { CHANGE_PASSWORD_RESET, FETCH_CHANGE_PASSWORD } from '../../../../utils/Constants'

export const fetchChangePassword = (data) => {

    return {

        type: FETCH_CHANGE_PASSWORD,
        payload: data
    }

}

export const resetChangePassword = () => {

    return {
        
        type: CHANGE_PASSWORD_RESET

    }
}