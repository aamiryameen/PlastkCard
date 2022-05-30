import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_INTERAC_CODE_PAYMENT_HISTORY, GENERIC_ERROR, getAuthenticationToken, INTERAC_CODE_PAYMENT_FAILURE, INTERAC_CODE_PAYMENT_HISTORY_FAILURE, INTERAC_CODE_PAYMENT_HISTORY_SUCCESS, INTERAC_CODE_PAYMENT_SUCCESS, LOGOUT_APP, SUBMIT_INTERAC_CODE_PAYMENT, TRANSACTION_HISTORY_FAILURE, TRANSACTION_HISTORY_SUCCESS } from '../../../../utils/Constants';

import { getBaseUrl } from '../../../../utils/WebService'
import Toast from 'react-native-simple-toast';



function* verifyPayment(action) {

    let jsonResponse = ''
    let response = '';

    let postObj = { ReferenceNumber: action.code }


    yield fetch(getBaseUrl() + 'transactions/search-interac-payment', {

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
                if (jsonResponse.status === true) {
                    yield put({
                        type: INTERAC_CODE_PAYMENT_SUCCESS,
                        response: jsonResponse,
                    })
                }
                else if (jsonResponse.error === true) {

                    yield put({
                        type: INTERAC_CODE_PAYMENT_FAILURE,
                        response: jsonResponse
                    })
                }
            }
            else {
                yield put({
                    type: INTERAC_CODE_PAYMENT_FAILURE,
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
                type: INTERAC_CODE_PAYMENT_FAILURE,
                response: response
            })
        }

    }

    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.error = true

        yield put({

            type: INTERAC_CODE_PAYMENT_FAILURE,
            response: response
        })
    }


}

function* fetchPaymentHistory(action) {

    let jsonResponse = ''
    let response = '';


    yield fetch(getBaseUrl() + 'cards/get-payment-transactions?perPage=' + action.perPage + '&page=' + action.page, {

        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
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
                    type: INTERAC_CODE_PAYMENT_HISTORY_SUCCESS,
                    response: jsonResponse,
                })
            }
            else {
                yield put({
                    type: INTERAC_CODE_PAYMENT_HISTORY_FAILURE,
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

                type: INTERAC_CODE_PAYMENT_HISTORY_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.error = true

        yield put({
            type: INTERAC_CODE_PAYMENT_HISTORY_FAILURE,
            response: response
        })
    }
}

export function* verifyPaymentActionWatcher() {
    yield takeLatest(SUBMIT_INTERAC_CODE_PAYMENT, verifyPayment);
    yield takeLatest(FETCH_INTERAC_CODE_PAYMENT_HISTORY, fetchPaymentHistory);
}