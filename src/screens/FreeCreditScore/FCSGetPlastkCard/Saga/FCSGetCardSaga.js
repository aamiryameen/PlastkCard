import { call, put, takeLatest } from 'redux-saga/effects'
import { FCS_APPLY_PLASTK_CARD, FCS_APPLY_PLASTK_CARD_FAILURE, FCS_APPLY_PLASTK_CARD_SUCCESS, GENERIC_ERROR, getAuthenticationToken, getEmail } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService'

function* fcsRegister(action) {
    let jsonResponse = ''
    let response = '';

    yield fetch(getBaseUrl() + 'free-users/update-user/' + getEmail(), {

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


    if (response && response.status < 500) {
        jsonResponse = yield response.json()

        if (response.status === 200 || response.status === 201) {
            if (jsonResponse.success === true) {

                yield switchToUser()

            }

            else if (jsonResponse.success === false) {

                yield put({
                    type: FCS_APPLY_PLASTK_CARD_FAILURE,
                    response: jsonResponse

                })
            }
        }
        else {
            yield put({
                type: FCS_APPLY_PLASTK_CARD_FAILURE,
                response: jsonResponse
            })
        }
    }
    else {
        let response = {}
        response.success = false
        response.message = GENERIC_ERROR
        yield put({
            type: FCS_APPLY_PLASTK_CARD_FAILURE,
            response: response
        })
    }
}



function* switchToUser(action) {
    let jsonResponse = ''
    let response = '';

    yield fetch(getBaseUrl() + 'auth/move_to_user/', {

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


    if (response && response.status < 500) {
        jsonResponse = yield response.json()


        if (response.status === 200 || response.status === 201) {
            if (jsonResponse.success === true) {
                yield put({
                    type: FCS_APPLY_PLASTK_CARD_SUCCESS,
                    response: jsonResponse

                })

            }

            else if (jsonResponse.success === false) {

                yield put({
                    type: FCS_APPLY_PLASTK_CARD_FAILURE,
                    response: jsonResponse

                })
            }
        }
        else {
            yield put({
                type: FCS_APPLY_PLASTK_CARD_FAILURE,
                response: jsonResponse
            })
        }
    }
    else {
        let response = {}
        response.success = false
        response.message = GENERIC_ERROR
        yield put({
            type: FCS_APPLY_PLASTK_CARD_FAILURE,
            response: response
        })
    }
}

export function* fcsGetCardActionWatcher() {
    yield takeLatest(FCS_APPLY_PLASTK_CARD, fcsRegister);
}