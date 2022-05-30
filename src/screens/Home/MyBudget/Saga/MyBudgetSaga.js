import { put, takeLatest } from 'redux-saga/effects'

import { getBaseUrl } from '../../../../utils/WebService'
import { FETCH_SPENDING_INSIGHTS, getAuthenticationToken, SPENDING_INSIGHTS_FAILURE, SPENDING_INSIGHTS_SUCCESS, GENERIC_ERROR } from '../../../../utils/Constants';
import Toast from 'react-native-simple-toast';


function* fetchMyBudget(action) {

   let jsonResponse = ''
   let response = '';


   yield fetch(getBaseUrl() + 'cards/get-spending-insight', {

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


      if (response.status === 201) {
         if (jsonResponse.success === true) {
            yield put({
               type: SPENDING_INSIGHTS_SUCCESS,
               response: jsonResponse
            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: SPENDING_INSIGHTS_FAILURE,
               response: jsonResponse
            })
         }
      }
      else {
         yield put({
            type: SPENDING_INSIGHTS_FAILURE,
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

         type: SPENDING_INSIGHTS_FAILURE,
         response: response
      })
   }


}


export function* myBudgetActionWatcher() {
   yield takeLatest(FETCH_SPENDING_INSIGHTS, fetchMyBudget);
}