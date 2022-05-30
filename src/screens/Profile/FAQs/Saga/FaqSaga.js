import { call, put, takeLatest } from 'redux-saga/effects'

import Toast from 'react-native-simple-toast';
import { GENERIC_ERROR, GET_ALL_FAQS, GET_ALL_FAQS_BY_CATEGORY, GET_ALL_FAQS_BY_CATEGORY_FAULIRE, GET_ALL_FAQS_BY_CATEGORY_SUCCESS, GET_ALL_FAQS_FAULIRE, GET_ALL_FAQS_SUCCESS, LOGOUT_APP, SEARCH_FAQS, SEARCH_FAQ_FAILURE, SEARCH_FAQ_SUCCESS } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService';



function* getAllFaqs() {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'faq/search-category', {

         method: 'GET',
         cache: 'no-cache',
         headers: {
            'Content-Type': 'application/json',
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

            yield put({
               type: GET_ALL_FAQS_SUCCESS,
               response: jsonResponse

            })

         }
         else {
            yield put({
               type: GET_ALL_FAQS_FAULIRE,
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
            type: GET_ALL_FAQS_FAULIRE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: GET_ALL_FAQS_FAULIRE,
         response: response
      })

   }

}


function* searchFaqs(action) {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'faq/search-faq?text=' + action.searchText + '&itemsPerPage=1000', {

         method: 'GET',
         cache: 'no-cache',
         headers: {
            'Content-Type': 'application/json',
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
                  type: SEARCH_FAQ_SUCCESS,
                  response: jsonResponse

               })
            }
            else if (jsonResponse.error === true) {

               yield put({
                  type: SEARCH_FAQ_FAILURE,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: SEARCH_FAQ_FAILURE,
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
            type: SEARCH_FAQ_FAILURE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: SEARCH_FAQ_FAILURE,
         response: response
      })
   }

}


function* searchFaqsCatergory(action) {

   let jsonResponse = ''
   let response = '';

   try {

      yield fetch(getBaseUrl() + 'faq/search-category?category=' + encodeURIComponent(action.category) + '&itemsPerPage=1000', {

         method: 'GET',
         cache: 'no-cache',
         headers: {
            'Content-Type': 'application/json',
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

            yield put({
               type: GET_ALL_FAQS_BY_CATEGORY_SUCCESS,
               response: jsonResponse

            })

         }
         else {
            yield put({
               type: GET_ALL_FAQS_BY_CATEGORY_FAULIRE,
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
            type: GET_ALL_FAQS_BY_CATEGORY_FAULIRE,
            response: response
         })
      }

   }
   catch (error) {

      let response = {}

      response.message = GENERIC_ERROR
      yield put({
         type: GET_ALL_FAQS_BY_CATEGORY_FAULIRE,
         response: response
      })

   }

}

export function* faqsActionWatcher() {
   yield takeLatest(GET_ALL_FAQS, getAllFaqs);
   yield takeLatest(SEARCH_FAQS, searchFaqs);
   yield takeLatest(GET_ALL_FAQS_BY_CATEGORY, searchFaqsCatergory);

}