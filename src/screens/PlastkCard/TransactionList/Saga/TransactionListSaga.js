import { put, takeEvery, takeLatest } from 'redux-saga/effects'
import { FETCH_TRANSACTION_HISTORY, FETCH_TRANSACTION_HISTORY_BY_DATE, FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION, GENERIC_ERROR, getAuthenticationToken, LOGOUT_APP, TRANSACTION_HISTORY_FAILURE, TRANSACTION_HISTORY_SUCCESS } from '../../../../utils/Constants';

import { getBaseUrl } from '../../../../utils/WebService'
import Toast from 'react-native-simple-toast';


function* fetchTransactionHistory(action) {

   let jsonResponse = ''
   let response = '';


   yield fetch(getBaseUrl() + 'cards/get-transactions?perPage=' + action.size + '&page=' + action.pageNumber, {

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

   try {
      if (response && response.status < 500) {
         jsonResponse = yield response.json()

         if (response.status === 200) {
            if (jsonResponse.success === true) {

               let list = populateList(jsonResponse.response.items, action.loadedItemsList)

               yield put({
                  type: TRANSACTION_HISTORY_SUCCESS,
                  response: jsonResponse,
                  transactionList: list,
                  pointsEarned: jsonResponse.pointsEarned
               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: TRANSACTION_HISTORY_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: TRANSACTION_HISTORY_FAILURE,
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
         response.error = true

         yield put({

            type: TRANSACTION_HISTORY_FAILURE,
            response: response
         })
      }

   }

   catch (error) {

      let response = {}
      response.message = GENERIC_ERROR
      response.error = true

      yield put({

         type: TRANSACTION_HISTORY_FAILURE,
         response: response
      })
   }


}

function* fetchTransactionHistoryByDescription(action) {

   let jsonResponse = ''
   let response = '';

   yield fetch(getBaseUrl() + 'cards/search-transactions?perPage=' + action.size + '&page=' + action.pageNumber + '&text=' + action.searchText.trim(), {

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

   try {
      if (response && response.status < 500) {
         jsonResponse = yield response.json()

         if (response.status === 200) {

            let list = populateList(jsonResponse.items, action.loadedItemsList)


            yield put({
               type: TRANSACTION_HISTORY_SUCCESS,
               response: jsonResponse,
               transactionList: list
            })
         }
         else {
            yield put({
               type: TRANSACTION_HISTORY_FAILURE,
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
         response.error = true

         yield put({

            type: TRANSACTION_HISTORY_FAILURE,
            response: response
         })
      }
   }
   catch (error) {

      let response = {}
      response.message = GENERIC_ERROR
      response.error = true

      yield put({

         type: TRANSACTION_HISTORY_FAILURE,
         response: response
      })
   }

}


function* fetchTransactionHistoryByDate(action) {

   let jsonResponse = ''
   let response = ''



   yield fetch(getBaseUrl() + 'cards/search-transactions-date?perPage=' + action.size + '&page=' + action.pageNumber + '&code=' + action.transactionType + '&startDate=' + encodeURIComponent(new Date(action.startDate)) + '&endDate=' + encodeURIComponent(new Date(action.endDate)), {

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
   try {

      if (response && response.status < 500) {
         jsonResponse = yield response.json()



         if (response.status === 200) {

            let list = populateList(jsonResponse.items, action.loadedItemsList)
            yield put({
               type: TRANSACTION_HISTORY_SUCCESS,
               response: jsonResponse,
               transactionList: list
            })
         }
         else {
            yield put({
               type: TRANSACTION_HISTORY_FAILURE,
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
         response.error = true

         yield put({

            type: TRANSACTION_HISTORY_FAILURE,
            response: response
         })
      }
   }
   catch (error) {
      let response = {}
      response.message = GENERIC_ERROR
      response.error = true

      yield put({

         type: TRANSACTION_HISTORY_FAILURE,
         response: response
      })
   }
}


function populateList(itemsResponse, loadedItemsList) {



   if (loadedItemsList === undefined || loadedItemsList === null)
      loadedItemsList = [];

   itemsResponse.map((item) => {


      loadedItemsList.push(item);

   });

   return loadedItemsList;

}



export function* transactionHistoryActionWatcher() {
   yield takeLatest(FETCH_TRANSACTION_HISTORY, fetchTransactionHistory);
   yield takeLatest(FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION, fetchTransactionHistoryByDescription);
   yield takeLatest(FETCH_TRANSACTION_HISTORY_BY_DATE, fetchTransactionHistoryByDate);
}