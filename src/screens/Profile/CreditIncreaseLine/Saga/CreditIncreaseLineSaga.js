import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_REQUEST_CREDIT_LINE_HISTORY, GENERIC_ERROR, getAuthenticationToken, REQUEST_CREDIT_LIMIT_PENDING,REQUEST_CREDIT_LINE_FAILURE, REQUEST_CREDIT_LINE_HISTORY_FAILURE, REQUEST_CREDIT_LINE_HISTORY_SUCCESS, REQUEST_CREDIT_LINE_SUCCESS, LOGOUT_APP, SUBMIT_REQUEST_CREDIT_LINE, REQUEST_CREDIT_PENDING_SUCCESS, REQUEST_CREDIT_PENDING_FAILURE } from '../../../../utils/Constants';

import { getBaseUrl } from '../../../../utils/WebService'
import Toast from 'react-native-simple-toast';

function* requestCreditIncrease(action) {

    let jsonResponse = ''
    let response = '';

    let postObj = { interact_code: action.code }


    yield fetch(getBaseUrl() + 'transactions/create-credit-limit-request', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify(postObj)
    }
    ).then(data => {
        response = data

    }).catch((error) => {
        console.error('Error:', error);
    });

    try {
        if (response && response.status < 500) {
            jsonResponse = yield response.json()
     
            if (response.status === 200) {

                if (jsonResponse.success === true) {
            
                    yield put({
                        type: REQUEST_CREDIT_LINE_SUCCESS,
                        response: jsonResponse,

                    })

                }
                else if (jsonResponse.error === true) {

                    yield put({
                        type: REQUEST_CREDIT_LINE_FAILURE,
                        response: jsonResponse
                    })
                }
            }
            else {
                yield put({
                    type: REQUEST_CREDIT_LINE_FAILURE,
                    response: jsonResponse
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
            response.error = true

            yield put({
                type: REQUEST_CREDIT_LINE_FAILURE,
                response: response
            })
        }

    }

    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.error = true

        yield put({

            type: REQUEST_CREDIT_LINE_FAILURE,
            response: response
        })
    }


}

function* fetchRequestCreditHistoryHistory(action) {

    let jsonResponse = ''
    let response = '';

    let paginationData = { itemsPerPage: 100, page: action.page, status: "All" }

    yield fetch(getBaseUrl() + 'transactions/get-credit-limit-request-by-user', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify(paginationData)
    }
    ).then(data => {
        response = data

    }).catch((error) => {
        console.error('Error:', error);
    });

    try {
        if (response && response.status < 500) {
            jsonResponse = yield response.json()
    
            if (response.status === 200) {

                yield put({
                    type: REQUEST_CREDIT_LINE_HISTORY_SUCCESS,
                    response: jsonResponse,
                })
            }

            else {
                yield put({
                    type: REQUEST_CREDIT_LINE_HISTORY_FAILURE,
                    response: jsonResponse
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
            response.error = true

            yield put({

                type: REQUEST_CREDIT_LINE_HISTORY_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.error = true

        yield put({
            type: REQUEST_CREDIT_LINE_HISTORY_FAILURE,
            response: response
        })
    }
}

function* fetchRequestCreditPendingStatus(action) {

    let jsonResponse = ''
    let response = '';

    let paginationData = { itemsPerPage: 100, page: action.page, status: "Pending" }

    yield fetch(getBaseUrl() + 'transactions/get-credit-limit-request-by-user', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify(paginationData)
    }
    ).then(data => {
        response = data

    }).catch((error) => {
        console.error('Error:', error);
    });

    try {
        if (response && response.status < 500) {
            jsonResponse = yield response.json()

            if (response.status === 200) {

                yield put({
                    type: REQUEST_CREDIT_PENDING_SUCCESS,
                    response: jsonResponse,
                })
            }
            
            else {
                yield put({
                    type: REQUEST_CREDIT_PENDING_FAILURE,
                    response: jsonResponse
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
            response.error = true

            yield put({

                type: REQUEST_CREDIT_PENDING_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.error = true

        yield put({
            type: REQUEST_CREDIT_PENDING_FAILURE,
            response: response
        })
    }
}

export function* requestCreditIncreaseActionWatcher() {
    yield takeLatest(SUBMIT_REQUEST_CREDIT_LINE, requestCreditIncrease);
    yield takeLatest(FETCH_REQUEST_CREDIT_LINE_HISTORY, fetchRequestCreditHistoryHistory);
    yield takeLatest(REQUEST_CREDIT_LIMIT_PENDING, fetchRequestCreditPendingStatus);
}