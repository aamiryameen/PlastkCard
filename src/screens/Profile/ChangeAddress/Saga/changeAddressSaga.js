import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { GENERIC_ERROR, CHANGE_ADDRESS_SUCCESS, CHANGE_ADDRESS_FAILURE, PERFROM_CHANGE_ADDRESS, getAuthenticationToken, getIsFreeUser } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService'

function* performChangeAddress(action) {

    let jsonResponse = ''
    let response = '';

    yield fetch(getBaseUrl() + (getIsFreeUser() ? 'free-users' : 'users') + '/update-user/' + action.email, {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },
        body: JSON.stringify(action.payload),
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
                    type: CHANGE_ADDRESS_SUCCESS,
                    response: jsonResponse
                    
                })

            }
            else if (jsonResponse.error === true) {
      
                yield put({
                    type: CHANGE_ADDRESS_FAILURE,
                    response: jsonResponse
                })
            }
        }
        else {
           
            yield put({
                type: CHANGE_ADDRESS_FAILURE,
                response: jsonResponse
            })
        }
    }
    else {
  
        let response = {}
        response.message = GENERIC_ERROR
        yield put({
            type: CHANGE_ADDRESS_FAILURE,
            response: response
        })
    }

}

export function* performChangeAddressActionWatcher() {
    yield takeLatest(PERFROM_CHANGE_ADDRESS, performChangeAddress);
}