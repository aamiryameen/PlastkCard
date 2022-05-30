import {ACCEPT_DISCLOSURE_AGREEMENT_PRESSED, ACCEPT_TERMS_AND_CONDITIONS_PRESSED, FETCH_CMS_CONTENT, RESET_CMS_CONTENT} from '../../../../utils/Constants'

export const fetchCmsContent = (data) => {

    return {
        type: FETCH_CMS_CONTENT,
        payload: data
    }
}

export const resetCmsContent = () => {

    return {
        type : RESET_CMS_CONTENT
    }

}

export const acceptTermsAndConditionsPressed = () => {
    return {
        type: ACCEPT_TERMS_AND_CONDITIONS_PRESSED
    }
}

export const acceptDisclosureAgreementPressed = () => {
    return {
        type: ACCEPT_DISCLOSURE_AGREEMENT_PRESSED
    }
}