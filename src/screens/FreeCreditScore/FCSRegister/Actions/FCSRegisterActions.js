import { FSC_REGISTER_PRESSED, RESET_FSC_REGISTER_SCREEN } from "../../../../utils/Constants"


export const fcsRegisterPressedAction = (payload) => {
    return {
        type: FSC_REGISTER_PRESSED,
        payload : payload
    }
} 

export const resetFCSScreenAction = () => {
    return {
        type: RESET_FSC_REGISTER_SCREEN
    }
}