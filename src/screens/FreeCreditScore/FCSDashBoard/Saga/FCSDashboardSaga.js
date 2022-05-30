import { call, put, takeLatest } from 'redux-saga/effects'

import Toast from 'react-native-simple-toast';
import { FCS_GET_STATUS, FCS_GET_STATUS_FAILURE, FCS_GET_STATUS_SUCCESS, FCS_SUBMIT_TNC, FCS_SUBMIT_TNC_FAILURE, FCS_SUBMIT_TNC_SUCCESS, GENERIC_ERROR, getAuthenticationToken, getEmail, LOGOUT_APP } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService';



function* fetchAccountStatus() {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'free-users/get-current-status', {

         method: 'GET',
         cache: 'no-cache',
         headers: {
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
                  type: FCS_GET_STATUS_SUCCESS,
                  response: jsonResponse

               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: FCS_GET_STATUS_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: FCS_GET_STATUS_FAILURE,
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
            type: FCS_GET_STATUS_FAILURE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: FCS_GET_STATUS_FAILURE,
         response: response
      })

   }

}

function* updateUser(action) {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'free-users/update-user/' + getEmail(), {

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

               yield fetchAccountStatus()
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: FCS_SUBMIT_TNC_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: FCS_SUBMIT_TNC_FAILURE,
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
            type: FCS_SUBMIT_TNC_FAILURE,
            response: response
         })
      }


   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: FCS_SUBMIT_TNC_FAILURE,
         response: response
      })
   }
}


export function* fcsDashBoardActionWatcher() {
   yield takeLatest(FCS_GET_STATUS, fetchAccountStatus);
   yield takeLatest(FCS_SUBMIT_TNC, updateUser);

}