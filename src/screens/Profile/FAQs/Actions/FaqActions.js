import { GET_ALL_FAQS, GET_ALL_FAQS_BY_CATEGORY, RESET_FAQS, RESET_FAQS_BY_CATEGORY, SEARCH_FAQS } from "../../../../utils/Constants"

export const getAllFAQSAction = () => {
    return {
        type: GET_ALL_FAQS
    }
}

export const searchFAQSAction = (text) => {
    return {
        type: SEARCH_FAQS,
        searchText: text
    }
}

export const resetFaqsAction = () => {
    return {
        type: RESET_FAQS
    }
}

export const getFAQSByCategory = (category) => {
    return {
        type: GET_ALL_FAQS_BY_CATEGORY,
        category: category
    }
}

export const resetFAQSByCategory = () => {
    return {
        type: RESET_FAQS_BY_CATEGORY
    }
}