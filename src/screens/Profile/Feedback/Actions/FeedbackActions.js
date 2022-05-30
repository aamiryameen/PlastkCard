import { FETCH_FEEDBACK, FEEDBACK_RESET } from '../../../../utils/Constants'


export const fetchFeedback = (data) => {

    return {
        type: FETCH_FEEDBACK,
        payload: data

    }
}

export const resetFeedback = () => {

    return {

        type: FEEDBACK_RESET
    }

}