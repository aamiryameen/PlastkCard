import { FCS_APPLY_PLASTK_CARD, FCS_RESET_APPLY_PLASTK_CARD } from "../../../../utils/Constants"


export const fcsApplyforPlastkPressedAction = (payload) => {

    return {
        type: FCS_APPLY_PLASTK_CARD,
        payload: payload
    }
}

export const fcsResetApplyPlastkAction = () => {
    return {
        type: FCS_RESET_APPLY_PLASTK_CARD
    }
}