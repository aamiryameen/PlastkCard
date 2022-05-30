import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_PDF_STATEMENTS, PDF_STATEMENTS_SUCCESS, PDF_STATEMENTS_FAILURE, ALL_STATEMENTS_FAILURE, ALL_STATEMENTS_SUCCESS, FETCH_ALL_STATEMENTS, getAuthenticationToken, LOGOUT_APP, GENERIC_ERROR } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService';
import Toast from 'react-native-simple-toast';




function* fetchAllStatements() {

    let jsonResponse = ''
    let response = '';

    yield fetch(getBaseUrl() + 'cards/statements', {

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
                        type: PDF_STATEMENTS_SUCCESS,
                        pdfStatementResponse: jsonResponse

                    })

                }
                else {

                    yield put({

                        type: PDF_STATEMENTS_FAILURE,
                        pdfStatementResponse: jsonResponse

                    })

                }


            }
            else {
                let response = {}

                response.message = GENERIC_ERROR
                response.error = true
                yield put({
                    type: PDF_STATEMENTS_FAILURE,
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
            response.error = true
            yield put({
                type: PDF_STATEMENTS_FAILURE,
                response: response
            })
        }
    }
    catch (error) {



        let response = {}

        response.message = GENERIC_ERROR
        response.error = true

        yield put({
            type: PDF_STATEMENTS_FAILURE,
            response: response
        })
    }


}

export function* allStatementsActionWatcher() {
    yield takeLatest(FETCH_PDF_STATEMENTS, fetchAllStatements);
}