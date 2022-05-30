import { put, takeLatest } from 'redux-saga/effects'

import Toast from 'react-native-simple-toast';
import { getBaseUrl } from '../../../../../utils/WebService';
import { FETCH_ACCOUNT_STATUS, GENERIC_ERROR, getAuthenticationToken, getEmail, MY_CREDIT_SUBMIT_TNC, MY_CREDIT_SUBMIT_TNC_FAILURE, MY_CREDIT_SUBMIT_TNC_SUCCESS } from '../../../../../utils/Constants';



function* acceptMyCreditTnc(action) {

    let jsonResponse = ''
    let response = '';


    yield fetch(getBaseUrl() + 'users' + '/update-user/' + getEmail(), {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify(action.payload)
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
                    type: FETCH_ACCOUNT_STATUS,
                })
            }

            else {
                yield put({
                    type: MY_CREDIT_SUBMIT_TNC_FAILURE,
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
            response.success = false

            yield put({

                type: MY_CREDIT_SUBMIT_TNC_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.success = false

        yield put({
            type: MY_CREDIT_SUBMIT_TNC_FAILURE,
            response: response
        })
    }
}

export function* myCreditTnCActionWatcher() {
    yield takeLatest(MY_CREDIT_SUBMIT_TNC, acceptMyCreditTnc);
}