import { FETCH_HUBSPOT_BLOGS_ALL, RESET_HUBSPOT_BLOGS } from "../../../../../../utils/Constants"


export const fetchHubSpotBlogsAction = () => {
    return {
        type: FETCH_HUBSPOT_BLOGS_ALL
    }
}

export const resetHubSpotBlogsAction = () => {
    return {
        type: RESET_HUBSPOT_BLOGS
    }
}
