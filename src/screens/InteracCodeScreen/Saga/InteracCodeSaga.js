import { call, put, takeLatest } from 'redux-saga/effects'


import { FETCH_INTERAC_TRANSACTION, getAuthenticationToken, INTERAC_TRANSACTION_SUCCESS, INTERAC_TRANSACTION_FAILURE, SUBMIT_INTERAC_CODE, INTERAC_CODE_SUBMISSION_SUCCESS, INTERAC_CODE_SUBMISSION_FAILURE, USE_CURRENT_AS_LIMIT, USE_CURRENT_AS_LIMIT_SUCCESS, USE_CURRENT_AS_LIMIT_FAILURE, CREATE_APPLICATION, CREATE_APPLICATION_SUCCESS, CREATE_APPLICATION_FAILURE, FETCH_ACCOUNT_STATUS_INTERAC_SCREEN, ACCOUNT_STATUS_INTERAC_SCREEN_SUCCESS, ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE, LOGOUT_APP, GENERIC_ERROR } from '../../../utils/Constants';
import { getBaseUrl } from '../../../utils/WebService';
import Toast from 'react-native-simple-toast';


function* fetchInteracTransactions(action) {

   let jsonResponse = ''
   let response = '';

   try {
      yield fetch(getBaseUrl() + 'transactions/get-interac-transaction', {

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
                  type: INTERAC_TRANSACTION_SUCCESS,
                  response: jsonResponse
               })
   
            }
            else if (jsonResponse.error === true) {
   
               yield put({
                  type: INTERAC_TRANSACTION_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: INTERAC_TRANSACTION_FAILURE,
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
            type: INTERAC_TRANSACTION_FAILURE,
            response: response
         })
      }
   }

   catch(error) {
      let response = {}
         response.message = GENERIC_ERROR
         yield put({
            type: INTERAC_TRANSACTION_FAILURE,
            response: response
         })
   }

   


}


function* submitInteracCode(action) {

   let jsonResponse = ''
   let response = '';

   try {
      yield fetch(getBaseUrl() + 'transactions/search-interac', {

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
                  type: INTERAC_CODE_SUBMISSION_SUCCESS,
                  response: jsonResponse
               })
   
            }
            else if (jsonResponse.success === false) {
   
               yield put({
                  type: INTERAC_CODE_SUBMISSION_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: INTERAC_CODE_SUBMISSION_FAILURE,
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
            type: INTERAC_CODE_SUBMISSION_FAILURE,
            response: response
         })
      }
   }

   catch(error) {
      let response = {}
         response.message = GENERIC_ERROR
         yield put({
            type: INTERAC_CODE_SUBMISSION_FAILURE,
            response: response
         })
   }

   


}

function* useCurrentAsLimit(action) {

   let jsonResponse = ''
   let response = '';

   yield fetch(getBaseUrl() + 'users/use-current-as-limit', {

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
               type: USE_CURRENT_AS_LIMIT_SUCCESS,
               response: jsonResponse
            })

         }
         else if (jsonResponse.error === true) {

            yield put({
               type: USE_CURRENT_AS_LIMIT_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         yield put({
            type: USE_CURRENT_AS_LIMIT_FAILURE,
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
         type: USE_CURRENT_AS_LIMIT_FAILURE,
         response: response
      })
   }

}

function* createApplication(action) {

   let jsonResponse = ''
   let response = '';

   yield fetch(getBaseUrl() + 'cards/create-application-user', {

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
               type: CREATE_APPLICATION_SUCCESS,
               response: jsonResponse
            })

         }
         else if (jsonResponse.success === false) {

            yield put({
               type: CREATE_APPLICATION_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         yield put({
            type: CREATE_APPLICATION_FAILURE,
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
         type: CREATE_APPLICATION_FAILURE,
         response: response
      })
   }

}

function* fetchAccountStatus() {

   let jsonResponse = ''
   let response = '';



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
               type: ACCOUNT_STATUS_INTERAC_SCREEN_SUCCESS,
               response: jsonResponse

            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         yield put({
            type: ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE,
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
         type: ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE,
         response: response
      })
   }
}


export function* interacCodeActionWatcher() {
   yield takeLatest(FETCH_INTERAC_TRANSACTION, fetchInteracTransactions);
   yield takeLatest(SUBMIT_INTERAC_CODE, submitInteracCode);
   yield takeLatest(USE_CURRENT_AS_LIMIT, useCurrentAsLimit);
   yield takeLatest(CREATE_APPLICATION, createApplication);
   yield takeLatest(FETCH_ACCOUNT_STATUS_INTERAC_SCREEN, fetchAccountStatus);
}