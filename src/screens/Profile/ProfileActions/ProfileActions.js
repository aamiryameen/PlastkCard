import { UPDATE_PROFILE_PICTURE, RESET_PROFILE_SCREEN } from "../../../utils/Constants"


export const updateProfilePictureAction = (url, mime) => {
    return {
        type: UPDATE_PROFILE_PICTURE,
        imageUrl: url,
        mime:mime
    }
}

export const resetProfileScreen = () => {
    return {
        type: RESET_PROFILE_SCREEN
    }
}