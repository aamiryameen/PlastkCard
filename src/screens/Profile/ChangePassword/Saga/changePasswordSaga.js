import { call, put, takeLatest } from 'redux-saga/effects'
import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS, FETCH_CHANGE_PASSWORD, GENERIC_ERROR, getAuthenticationToken, LOGOUT_APP } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService'
import Toast from 'react-native-simple-toast';


function* fetchChangePassword(action) {

    let jsonResponse = '';
    let response = ''

    yield fetch(getBaseUrl() + 'application/change-password', {

        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify(action.payload)
    }

    ).then(data => {
        response = data

    }).catch(error => {
        console.error("Error:", error)
    });

    if (response && response.status < 500) {

        jsonResponse = yield response.json()

        if (response.status === 200) {

            if (jsonResponse.success === true) {

                yield put({
                    type: CHANGE_PASSWORD_SUCCESS,
                    response: jsonResponse

                })
            }
            else if (jsonResponse.error === true) {

                yield put({
                    type: CHANGE_PASSWORD_FAILURE,
                    response: jsonResponse
                })
            }

        }
        else {

            yield put({
                type: CHANGE_PASSWORD_FAILURE,
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
        yield put({
            type: CHANGE_PASSWORD_FAILURE,
            response: response
        })
    }

}

export function* changePasswordActionWatcher() {
    yield takeLatest(FETCH_CHANGE_PASSWORD, fetchChangePassword)
}