import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_ACCOUNT_STATUS, ACCOUNT_STATUS_SUCCESS, ACCOUNT_STATUS_FAILURE, getAuthenticationToken, SEND_OTP_CARD_ACTIVATION, ACTIVATE_CARD, OTP_CARD_ACTIVATION_SUCCESS, OTP_CARD_ACTIVATION_FAILURE, ACTIVATE_CARD_SUCCESS, ACTIVATE_CARD_FAILURE, LOGOUT_APP, GENERIC_ERROR, setAuthenticationToken } from '../../../utils/Constants'

import { getBaseUrl } from '../../../utils/WebService'
import Toast from 'react-native-simple-toast';


function* sendOTP(action) {

   let jsonResponse = ''
   let response = '';

   yield fetch(getBaseUrl() + 'application/send-verification-email/' + action.payload, {

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
               type: OTP_CARD_ACTIVATION_SUCCESS,
               response: jsonResponse

            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: OTP_CARD_ACTIVATION_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         yield put({
            type: OTP_CARD_ACTIVATION_FAILURE,
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
         type: OTP_CARD_ACTIVATION_FAILURE,
         response: response
      })
   }


}


function* activateCard(action) {

   let jsonResponse = ''
   let response = '';



   yield fetch(getBaseUrl() + 'cards/activate-card', {

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

   if (response && response.status < 500) {
      jsonResponse = yield response.json()


      if (response.status === 200) {
         if (jsonResponse.success === true) {

            yield put({
               type: ACTIVATE_CARD_SUCCESS,
               response: jsonResponse

            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: ACTIVATE_CARD_FAILURE,
               response: jsonResponse
            })
         }
         else if (jsonResponse.success === false) {

            yield put({
               type: ACTIVATE_CARD_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         yield put({
            type: ACTIVATE_CARD_FAILURE,
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
         type: ACTIVATE_CARD_FAILURE,
         response: response
      })
   }
}


function* logoutApp(action) {

   let jsonResponse = ''
   let response = '';

   try {
      yield fetch(getBaseUrl() + 'auth/logout', {

         method: 'DELETE',
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
   }
   catch(error) {

   }

   setAuthenticationToken('');


   
}

export function* activateCardActionWatcher() {
   yield takeLatest(SEND_OTP_CARD_ACTIVATION, sendOTP);
   yield takeLatest(ACTIVATE_CARD, activateCard);
   yield takeLatest(LOGOUT_APP, logoutApp)
}