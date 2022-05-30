import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_ACCOUNT_STATUS, ACCOUNT_STATUS_SUCCESS, ACCOUNT_STATUS_FAILURE, getAuthenticationToken, LOGOUT_APP, GENERIC_ERROR, CHECK_EMAIL_VERIFIED, RESEND_VERIFICATION_EMAIL, EMAIL_VERIFIED_SUCCESS, EMAIL_VERIFIED_FAILURE, RESEND_VERIFICATION_EMAIL_SUCCESS, RESEND_VERIFICATION_EMAIL_FAILURE, VALIDATE_EMAIL_TOKEN, VALIDATE_EMAIL_TOKEN_FAILURE, VALIDATE_EMAIL_TOKEN_SUCCESS, AUTO_SEND_VERIFICATION_EMAIL, getEmail } from '../../../utils/Constants'

import { getBaseUrl } from '../../../utils/WebService'
import Toast from 'react-native-simple-toast';



function* fetchAccountStatus() {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'users/get-current-status', {

         method: 'POST',
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

         if (response.status === 200) {
            if (jsonResponse.success === true) {

               yield put({
                  type: ACCOUNT_STATUS_SUCCESS,
                  response: jsonResponse

               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: ACCOUNT_STATUS_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: ACCOUNT_STATUS_FAILURE,
               response: jsonResponse
            })
         }
      }
      else if (response && response.status === 522) {
         Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
         yield put({
            type: LOGOUT_APP,
         })

      } else {
         let response = {}

         response.message = GENERIC_ERROR
         yield put({
            type: ACCOUNT_STATUS_FAILURE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: ACCOUNT_STATUS_FAILURE,
         response: response
      })

   }

}


function* checkEmailVerified() {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'users/verify-email', {

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

         if (response.status === 200) {
            if (jsonResponse.success === true) {

               yield put({
                  type: EMAIL_VERIFIED_SUCCESS,
                  response: jsonResponse

               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: EMAIL_VERIFIED_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: EMAIL_VERIFIED_FAILURE,
               response: jsonResponse
            })
         }
      }
      else if (response && response.status === 522) {
         Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
         yield put({
            type: LOGOUT_APP,
         })

      } else {
         let response = {}

         response.message = GENERIC_ERROR
         yield put({
            type: EMAIL_VERIFIED_FAILURE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: EMAIL_VERIFIED_FAILURE,
         response: response
      })
   }

}



function* resendVerificationEmail() {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'application/send-email-verification', {

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

         if (response.status === 200) {
            if (jsonResponse.success === true) {

               yield put({
                  type: RESEND_VERIFICATION_EMAIL_SUCCESS,
                  response: jsonResponse

               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: RESEND_VERIFICATION_EMAIL_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: RESEND_VERIFICATION_EMAIL_FAILURE,
               response: jsonResponse
            })
         }
      }
      else if (response && response.status === 522) {
         Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
         yield put({
            type: LOGOUT_APP,
         })

      } else {
         let response = {}

         response.message = GENERIC_ERROR
         yield put({
            type: RESEND_VERIFICATION_EMAIL_FAILURE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: RESEND_VERIFICATION_EMAIL_FAILURE,
         response: response
      })
   }
}

function* validateEmailToken(action) {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'application/verify-email/' + action.payload, {

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
                  type: VALIDATE_EMAIL_TOKEN_SUCCESS,
                  emailValidationResponse: 'success'

               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: VALIDATE_EMAIL_TOKEN_FAILURE,
                  emailValidationResponse: 'failure'
               })
            }
         }
         else {
            yield put({
               type: VALIDATE_EMAIL_TOKEN_FAILURE,
               emailValidationResponse: 'failure'
            })

         }
      }
      else {
         yield put({
            type: VALIDATE_EMAIL_TOKEN_FAILURE,
            emailValidationResponse: 'failure'
         })
      }

   }
   catch (error) {

      yield put({
         type: VALIDATE_EMAIL_TOKEN_FAILURE,
         emailValidationResponse: 'failure'
      })
   }

}


function* autoSendEmail(action) {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'application/send-email-verification/', {

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

      
      yield updateUser()
      yield fetchAccountStatus()

   }
   catch (error) {

   }
}


function* updateUser(action) {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'users/update-user/'+ getEmail(), {

         method: 'POST',
         cache: 'no-cache',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
         },
         body: JSON.stringify({ email_verification_sent:true })
      }
      ).then(data => {
         response = data
      }).catch((error) => {
         console.error('Error:', error);
      });

    
   }
   catch (error) {

   }
}

export function* accountStatusActionWatcher() {
   yield takeLatest(FETCH_ACCOUNT_STATUS, fetchAccountStatus);
   yield takeLatest(CHECK_EMAIL_VERIFIED, checkEmailVerified);
   yield takeLatest(RESEND_VERIFICATION_EMAIL, resendVerificationEmail);
   yield takeLatest(VALIDATE_EMAIL_TOKEN, validateEmailToken)
   yield takeLatest(AUTO_SEND_VERIFICATION_EMAIL, autoSendEmail)
}