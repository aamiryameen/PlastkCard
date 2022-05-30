import { PERFROM_CHANGE_ADDRESS, RESET_CHANGE_ADDRESS } from '../../../../utils/Constants'

export const perfromChangeAddress = (changeAddress, email) => {

    return {
        type: PERFROM_CHANGE_ADDRESS,
        payload: changeAddress,
        email: email
    }

}

export const resetChangeAddress = () => {

    return {

        type: RESET_CHANGE_ADDRESS,

    }

}
