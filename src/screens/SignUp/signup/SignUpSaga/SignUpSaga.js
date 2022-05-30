import { call, delay, put, takeLatest } from 'redux-saga/effects'

import { GENERIC_ERROR, INVALID_SET_PASSWORD_TOKEN_SIGNUP, PERFORM_SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, VALIDATE_SET_PASSWORD_TOKEN_SIGNUP, VALID_SET_PASSWORD_TOKEN_SIGNUP } from '../../../../utils/Constants';

import { getBaseUrl } from '../../../../utils/WebService'


function* performSignUp(action) {

   try {
      let jsonResponse = ''
      let response = '';

      
   
      yield fetch(getBaseUrl() + 'application/signup', {
   
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
   
      
   
      yield delay(2000)
   
      if (response && response.status < 500) {
         jsonResponse = yield response.json()
   
         if (response.status === 200 || response.status === 201) {
            if (jsonResponse.success === true) {
               yield put({
                  type: SIGN_UP_SUCCESS,
                  response: jsonResponse
               })
   
            }
            else if (jsonResponse.error === true) {
   
               yield put({
                  type: SIGN_UP_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else
         {
            yield put({
               type: SIGN_UP_FAILURE,
               response: jsonResponse
            })
         }
      }
      else
      {
         let response = {}
         response.message = GENERIC_ERROR
         yield put({
            type: SIGN_UP_FAILURE,
            response: response
         })
      }
   }

   catch(error) {
      console.error(error)
   }

  

}


function* validateSetPasswordToken(action) {

   let jsonResponse = ''
   let response = '';
   

   
   yield fetch(getBaseUrl() + 'application/verifyOtp/' + action.token, {

      method: 'GET',
      cache: 'no-cache',
   }
   ).then(data => {
      response = data
   }).catch((error) => {
      console.error('Error:', error);
   });

   if (response && response.status < 500) {
      jsonResponse = yield response.json()

      if (response.status === 200) {
         if (jsonResponse.success === true) {
            yield put({
               type: VALID_SET_PASSWORD_TOKEN_SIGNUP,
               tokenValidationResponse: 'success'

            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: INVALID_SET_PASSWORD_TOKEN_SIGNUP,
               tokenValidationResponse: 'failure'
            })
         }
      }
      else
      {
         yield put({
            type: INVALID_SET_PASSWORD_TOKEN_SIGNUP,
            tokenValidationResponse: 'failure'
         })
         
      }
   }
   else
   {
      yield put({
         type: INVALID_SET_PASSWORD_TOKEN_SIGNUP,
         tokenValidationResponse: 'failure'
      })
   }

}

export function* performSignUpActionWatcher() {
   yield takeLatest(PERFORM_SIGN_UP, performSignUp);
   yield takeLatest(VALIDATE_SET_PASSWORD_TOKEN_SIGNUP, validateSetPasswordToken);
}