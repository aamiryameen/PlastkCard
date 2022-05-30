import { FETCH_MY_CARD_INFO, FETCH_POINTS_INFO_DASHBOARD } from "../../../../utils/Constants"

export const fetchMyCardInfoAction = () => {
    return {
        type: FETCH_MY_CARD_INFO
    }
}

export const fetchPointsInfoAction = () => {
    return {
        type: FETCH_POINTS_INFO_DASHBOARD
    }

}