import { call, delay, put, takeLatest } from 'redux-saga/effects'

import { FCS_RESEND_OTP, FCS_SIGN_UP_FAILURE, FCS_SIGN_UP_PRESSED, FCS_SIGN_UP_SUCCESS, GENERIC_ERROR, getAuthenticationToken } from '../../../../utils/Constants';

import { getBaseUrl } from '../../../../utils/WebService'
import Toast from 'react-native-simple-toast';



function* performSignUp(action) {

   try {
      let jsonResponse = ''
      let response = '';



      yield fetch(getBaseUrl() + 'free-users/signup', {

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



      yield delay(2000)

      if (response && response.status < 500) {
         jsonResponse = yield response.json()

         if (response.status === 200 || response.status === 201) {
            if (jsonResponse.success === true) {
               yield put({
                  type: FCS_SIGN_UP_SUCCESS,
                  response: jsonResponse
               })

            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: FCS_SIGN_UP_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: FCS_SIGN_UP_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         let response = {}
         response.error = true
         response.message = GENERIC_ERROR
         yield put({
            type: FCS_SIGN_UP_FAILURE,
            response: response
         })
      }
   }

   catch (error) {
      let response = {}
      response.error = true
      response.message = GENERIC_ERROR
      yield put({
         type: FCS_SIGN_UP_FAILURE,
         response: response
      })
   }

}


function* reSendOTP(action) {

   let jsonResponse = ''
   let response = '';


   yield fetch(getBaseUrl() + 'free-users/resendOtp/', {

      method: 'GET',
      cache: 'no-cache',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + getAuthenticationToken()
      },
   },

   ).then(data => {
      response = data
   }).catch((error) => {
      console.error('Error:', error);
   });

   if (response && response.status < 500) {
      jsonResponse = yield response.json()

      if (response.status === 200) {
         Toast.showWithGravity('Plastk Verification Code resent successfully', Toast.LONG, Toast.TOP);
      }
      else {
         Toast.showWithGravity('Sorry we were unable to send you the email', Toast.LONG, Toast.TOP);
      }
   }
   else {
      Toast.showWithGravity('Sorry we were unable to send you the email', Toast.LONG, Toast.TOP);
   }

}

export function* fcsSignUpActionWatcher() {
   yield takeLatest(FCS_SIGN_UP_PRESSED, performSignUp);
   yield takeLatest(FCS_RESEND_OTP, reSendOTP);
}