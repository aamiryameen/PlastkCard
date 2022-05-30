import { FETCH_HUBSPOT_FCS_BLOGS_ALL, RESET_HUBSPOT_FCS_BLOGS } from "../../../../utils/Constants"


export const fetchFCSHubSpotBlogsAction = () => {
    return {
        type: FETCH_HUBSPOT_FCS_BLOGS_ALL
    }
}

export const resetHubSpotFCSBlogsAction = () => {
    return {
        type: RESET_HUBSPOT_FCS_BLOGS
    }
}