import { call, put, takeLatest } from 'redux-saga/effects'
import { getBaseUrl } from '../../../../utils/WebService'
import { getAuthenticationToken, PERFORM_SET_PASSWORD, SET_PASSWORD_FAILURE, SET_PASSWORD_SUCCESS, GENERIC_ERROR } from '../../../../utils/Constants'

function* performSetPassword (action) {
    let jsonResponse = ''
    let response = '';
   
    yield fetch(getBaseUrl() + 'auth/reset_password', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
           'Content-Type': 'application/json'
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
              yield put({
                 type: SET_PASSWORD_SUCCESS,
                 message: " Password Set Successfully "
              })
  
           }
         
           else if (jsonResponse.error === true) {
  
              yield put({
                 type: SET_PASSWORD_FAILURE,
                 message: jsonResponse.message

              })
           }
        }
        else
        {
           yield put({
              type: SET_PASSWORD_FAILURE,
              message: jsonResponse.message
           })
        }
     }
     else
     {
        yield put({
           type: SET_PASSWORD_FAILURE,
           message: GENERIC_ERROR
        })
     }
}

export function* setPasswordActionWatcher() {
    yield takeLatest(PERFORM_SET_PASSWORD, performSetPassword);
 }