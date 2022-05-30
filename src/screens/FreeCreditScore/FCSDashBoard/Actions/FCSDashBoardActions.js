import { FCS_GET_STATUS, FCS_SUBMIT_TNC } from "../../../../utils/Constants"


export const fcsGetStatusAction = () => {
    return {
        type : FCS_GET_STATUS
    }
}

export const fcsAcceptTnCAction = (obj) => {

    return {
        type: FCS_SUBMIT_TNC,
        payload: obj
    }
}