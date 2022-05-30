import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_FEEDBACK, FEEDBACK_SUCCESS, FEEDBACK_FAILURE, getAuthenticationToken, GENERIC_ERROR } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService'

function* fetchFeedback(action) {



    let jsonResponse = '';
    let response = ''

    yield fetch(getBaseUrl() + 'feedback/create', {

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
                    type: FEEDBACK_SUCCESS,
                    response: jsonResponse

                })
            }

            else if (jsonResponse.success === false) {

                yield put({
                    type: FEEDBACK_FAILURE,
                    response: jsonResponse
                })
            }

        }
        else {

            yield put({
                type: FEEDBACK_FAILURE,
                response: jsonResponse
            })
        }


    }

    else {

        let response = {}
        response.message = GENERIC_ERROR
        yield put({
            type: FEEDBACK_FAILURE,
            response: response
        })
    }

}

export function* feedbackActionWatcher() {
    yield takeLatest(FETCH_FEEDBACK, fetchFeedback)
}