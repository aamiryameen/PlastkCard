import { call, put, takeLatest } from 'redux-saga/effects'
import {FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD_FAILURE, RESEND_FORGOT_PASSWORD_SUCCESS, GENERIC_ERROR} from '../../../utils/Constants'

 import { getBaseUrl } from '../../../utils/WebService'


function* forgotPassword(action) {

   let jsonResponse = ''
   let response = '';

   let postBody = {email : action.email}

   yield fetch(getBaseUrl() + 'auth/forget_password', {

      method: 'POST',
      cache: 'no-cache',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
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
               type: FORGOT_PASSWORD_SUCCESS,
               message: jsonResponse.message
            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: FORGOT_PASSWORD_FAILURE,
               message: jsonResponse.message
            })
         }
      }
      else
      {
         yield put({
            type: FORGOT_PASSWORD_FAILURE,
            message: jsonResponse.message
         })
      }
   }
   else
   {
      yield put({
         type: FORGOT_PASSWORD_FAILURE,
         message: GENERIC_ERROR
      })
   }


}


function* resendForgotPassword(action) {

   let jsonResponse = ''
   let response = '';

   let postBody = {email : action.email}

   yield fetch(getBaseUrl() + 'auth/forget_password', {

      method: 'POST',
      cache: 'no-cache',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
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
               type: RESEND_FORGOT_PASSWORD_SUCCESS,
               response: jsonResponse
            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: RESEND_FORGOT_PASSWORD_FAILURE,
               response: jsonResponse
            })
         }
      }
      else
      {
         yield put({
            type: RESEND_FORGOT_PASSWORD_FAILURE,
            response: jsonResponse
         })
      }
   }
   else
   {
      let response;
      response.message = GENERIC_ERROR
      yield put({
         type: RESEND_FORGOT_PASSWORD_FAILURE,
         response: response
      })
   }
}

export function* forgotPasswordActionWatcher() {
   yield takeLatest(FORGOT_PASSWORD, forgotPassword);
   yield takeLatest(RESEND_FORGOT_PASSWORD, resendForgotPassword);
}