import { put, takeLatest } from 'redux-saga/effects'

import { getBaseUrl } from '../../../../utils/WebService'
import Toast from 'react-native-simple-toast';
import { ACCEPT_EQUIFAX_DISCLAIMER, CREDIT_FILE_FAILURE, CREDIT_FILE_SUCCESS, EID_ANSWERS_FAILURE, EID_ANSWERS_SUCCESS, EID_QUESTIONS_SUCCESS, EID_QUESTION_FAILURE, EQUIFAX_DISCLAIMER_FAILURE, EQUIFAX_DISCLAIMER_SUCCESS, FETCH_CREDIT_FILE, FETCH_EID_QUESTIONS, GENERIC_ERROR, getAuthenticationToken, getEmail, getIsFreeUser, LOGOUT_APP, START_EID_VERIFICATION, SUBMIT_EID_ANSWERS } from '../../../../utils/Constants';

function* startEquifaxVerification(action) {

    let jsonResponse = ''
    let response = '';


    yield fetch(getBaseUrl() + 'equifax/verify', {

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

                if (jsonResponse.success === true) {

                    yield put({
                        type: EID_QUESTIONS_SUCCESS,
                        response: jsonResponse,
                        questionsList: jsonResponse.questions.questions
                    })

                }
                else if (jsonResponse.success === false) {

                    yield put({
                        type: EID_QUESTION_FAILURE,
                        response: jsonResponse
                    })
                }
            }
            else {
                yield put({
                    type: EID_QUESTION_FAILURE,
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
                type: EID_QUESTION_FAILURE,
                response: response
            })
        }

    }

    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.success = false

        yield put({

            type: EID_QUESTION_FAILURE,
            response: response
        })
    }


}

function* fetchEidQuestions(action) {

    let jsonResponse = ''
    let response = '';

    yield fetch(getBaseUrl() + 'equifax/get-questions', {

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
                    type: EID_QUESTIONS_SUCCESS,
                    response: jsonResponse,
                    questionsList: jsonResponse.questions.questions
                })
            }

            else {
                yield put({
                    type: EID_QUESTION_FAILURE,
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

                type: EID_QUESTION_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.success = false

        yield put({
            type: EID_QUESTION_FAILURE,
            response: response
        })
    }
}

function* fetchCreditFile(action) {

    let jsonResponse = ''
    let response = '';

    let url = getBaseUrl() + 'equifax/get-file'

    if(action.isHardRefresh) {
        url += '/true'
    }

    yield fetch(url, {

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
                    type: CREDIT_FILE_SUCCESS,
                    response: jsonResponse,
                })
            }

            else {
                yield put({
                    type: CREDIT_FILE_FAILURE,
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

                type: CREDIT_FILE_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.success = false

        yield put({
            type: CREDIT_FILE_FAILURE,
            response: response
        })
    }
}

function* submitAnswers(action) {

    let jsonResponse = ''
    let response = '';


    yield fetch(getBaseUrl() + 'equifax/answer', {

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
                    type: EID_ANSWERS_SUCCESS,
                    response: jsonResponse,
                })
            }

            else {
                yield put({
                    type: EID_ANSWERS_FAILURE,
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

                type: EID_ANSWERS_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.success = false

        yield put({
            type: EID_ANSWERS_FAILURE,
            response: response
        })
    }
}


function* acceptEquifaxDisclaimer(action) {

    let jsonResponse = ''
    let response = '';


    yield fetch(getBaseUrl() + (getIsFreeUser() ? 'free-users' : 'users') + '/update-user/' + getEmail(), {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify({ equifax_disclaimer: new Date() })
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
                    type: EQUIFAX_DISCLAIMER_SUCCESS,
                    response: jsonResponse,
                })
            }

            else {
                yield put({
                    type: EQUIFAX_DISCLAIMER_FAILURE,
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

                type: EQUIFAX_DISCLAIMER_FAILURE,
                response: response
            })
        }
    }
    catch (error) {

        let response = {}
        response.message = GENERIC_ERROR
        response.success = false

        yield put({
            type: EQUIFAX_DISCLAIMER_FAILURE,
            response: response
        })
    }
}

export function* equifaxActionWatcher() {
    yield takeLatest(START_EID_VERIFICATION, startEquifaxVerification);
    yield takeLatest(FETCH_EID_QUESTIONS, fetchEidQuestions);
    yield takeLatest(FETCH_CREDIT_FILE, fetchCreditFile);
    yield takeLatest(SUBMIT_EID_ANSWERS, submitAnswers);
    yield takeLatest(ACCEPT_EQUIFAX_DISCLAIMER, acceptEquifaxDisclaimer);
}