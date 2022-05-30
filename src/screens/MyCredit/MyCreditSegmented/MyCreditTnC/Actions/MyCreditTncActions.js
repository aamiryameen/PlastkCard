import { MY_CREDIT_SUBMIT_TNC } from "../../../../../utils/Constants"

export const myCreditSubmitTncAction = (obj) => {
    return {
        type: MY_CREDIT_SUBMIT_TNC,
        payload: obj
    }
}