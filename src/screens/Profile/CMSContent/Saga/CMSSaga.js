import { FETCH_CMS_CONTENT, CMS_CONTENT_SUCCESS, CMS_CONTENT_FAILURE, LOGOUT_APP, ACCEPT_TERMS_AND_CONDITIONS_PRESSED, getAuthenticationToken, ACCEPT_TERMS_AND_CONDITIONS_FAILURE, ACCEPT_TERMS_AND_CONDITIONS_SUCCESS, GENERIC_ERROR, ACCEPT_DISCLOSURE_AGREEMENT_PRESSED, ACCEPT_DISCLOSURE_AGREEMENT_SUCCESS, ACCEPT_DISCLOSURE_AGREEMENT_FAILURE, isAndroid } from '../../../../utils/Constants'
import { getBaseUrl } from '../../../../utils/WebService'
import { call, put, takeLatest } from 'redux-saga/effects'
import Toast from 'react-native-simple-toast';


function* fetchCmsContent(action) {

    let response = ""
    let jsonResponse = ""

    yield fetch(getBaseUrl() + 'cms/contents-by-slug/' + action.payload, {

        method: 'GET',
        cache: 'no-cache',

    }).then((data) => {
        response = data

    }).catch((error) => {

        console.log(error)
    })

    try {

        if (response && response.status < 500) {

            jsonResponse = yield response.json()

            if (response.status === 200) {


                if (jsonResponse.success === false) {

                    let response = {}
                    response.message = GENERIC_ERROR

                    yield put({
                        type: CMS_CONTENT_FAILURE,
                        response: response
                    })
                }
                else {

                    if (isAndroid) {
                        yield* convertToPDF(jsonResponse[0].htmlContent)
                    } else {
                        yield put({
                            type: CMS_CONTENT_SUCCESS,
                            response: jsonResponse
                        })
                    }
                }

            }

            else {

                let response = {}
                response.message = GENERIC_ERROR

                yield put({
                    type: CMS_CONTENT_FAILURE,
                    response: response
                })
            }
        }
        else if (response && response.status === 522) {
            Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
            yield put({
                type: LOGOUT_APP,
            })
        }

        else {

            let response = {}
            response.message = GENERIC_ERROR
            yield put({
                type: CMS_CONTENT_FAILURE,
                response: response
            })
        }

    }

    catch (error) {
        let response = {}
        response.message = GENERIC_ERROR
        yield put({
            type: CMS_CONTENT_FAILURE,
            response: response
        })
    }


}


function* convertToPDF(data) {

    let response = ""
    let jsonResponse = ""

    //let newResp = data.replace(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/g, '#FF0000')



    yield fetch(getBaseUrl() + 'common/generate-pdf', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify({ htmlContent: data })

    }).then((data) => {
        response = data

    }).catch((error) => {

        console.log(error)
    })

    jsonResponse = yield response.json()

    yield put({
        type: CMS_CONTENT_SUCCESS,
        response: jsonResponse
    })

}


function* acceptTermsAndConditions(action) {

    let response = ""
    let jsonResponse = ""
    yield fetch(getBaseUrl() + 'users/update-tnc', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },

    }).then((data) => {
        response = data

    }).catch((error) => {

        console.log(error)
    })

    try {

        if (response && response.status < 500) {

            jsonResponse = yield response.json()

            if (response.status === 200) {

                if (jsonResponse.success === false) {

                    let response = {}
                    response.message = GENERIC_ERROR

                    yield put({
                        type: ACCEPT_TERMS_AND_CONDITIONS_FAILURE,
                        response: response
                    })
                }
                else if (jsonResponse.success === true) {

                    yield put({
                        type: ACCEPT_TERMS_AND_CONDITIONS_SUCCESS,
                        tncResponse: jsonResponse
                    })
                }

            }

            else {

                let response = {}
                response.message = GENERIC_ERROR

                yield put({
                    type: ACCEPT_TERMS_AND_CONDITIONS_FAILURE,
                    response: response
                })
            }
        }
        else if (response && response.status === 522) {
            Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
            yield put({
                type: LOGOUT_APP,
            })
        }

        else {

            let response = {}
            response.message = GENERIC_ERROR
            yield put({
                type: ACCEPT_TERMS_AND_CONDITIONS_FAILURE,
                response: response
            })
        }

    }

    catch (error) {
        let response = {}
        response.message = GENERIC_ERROR
        yield put({
            type: ACCEPT_TERMS_AND_CONDITIONS_FAILURE,
            response: response
        })
    }


}


function* acceptDisclosureAgreement(action) {

    let response = ""
    let jsonResponse = ""
    yield fetch(getBaseUrl() + 'users/update-disclosure-agreement', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },

    }).then((data) => {
        response = data

    }).catch((error) => {

        console.log(error)
    })

    try {

        if (response && response.status < 500) {

            jsonResponse = yield response.json()

            if (response.status === 200) {

                if (jsonResponse.success === false) {

                    let response = {}
                    response.message = GENERIC_ERROR

                    yield put({
                        type: ACCEPT_DISCLOSURE_AGREEMENT_FAILURE,
                        response: response
                    })
                }
                else if (jsonResponse.success === true) {

                    yield put({
                        type: ACCEPT_DISCLOSURE_AGREEMENT_SUCCESS,
                        tncResponse: jsonResponse
                    })
                }

            }

            else {

                let response = {}
                response.message = GENERIC_ERROR

                yield put({
                    type: ACCEPT_DISCLOSURE_AGREEMENT_FAILURE,
                    response: response
                })
            }
        }
        else if (response && response.status === 522) {
            Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
            yield put({
                type: LOGOUT_APP,
            })
        }

        else {

            let response = {}
            response.message = GENERIC_ERROR
            yield put({
                type: ACCEPT_DISCLOSURE_AGREEMENT_FAILURE,
                response: response
            })
        }

    }

    catch (error) {
        let response = {}
        response.message = GENERIC_ERROR
        yield put({
            type: ACCEPT_DISCLOSURE_AGREEMENT_FAILURE,
            response: response
        })
    }


}




export function* cmsContentActionWatcher() {
    yield takeLatest(FETCH_CMS_CONTENT, fetchCmsContent)
    yield takeLatest(ACCEPT_TERMS_AND_CONDITIONS_PRESSED, acceptTermsAndConditions)
    yield takeLatest(ACCEPT_DISCLOSURE_AGREEMENT_PRESSED, acceptDisclosureAgreement)
}