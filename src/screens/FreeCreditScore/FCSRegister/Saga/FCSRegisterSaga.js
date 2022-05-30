import { call, put, takeLatest } from 'redux-saga/effects'
import { FSC_REGISTER_FAILURE, FSC_REGISTER_PRESSED, FSC_REGISTER_SUCCESS, GENERIC_ERROR } from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService'

function* fcsRegister(action) {
   let jsonResponse = ''
   let response = '';

   yield fetch(getBaseUrl() + 'free-users/register', {

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


   
   if (response && response.status < 500) {
      jsonResponse = yield response.json()

      if (response.status === 200 || response.status === 201) {
         if (jsonResponse.success === true) {
            yield put({
               type: FSC_REGISTER_SUCCESS,
               response: jsonResponse
            })

         }

         else if (jsonResponse.success === false) {

            yield put({
               type: FSC_REGISTER_FAILURE,
               response: jsonResponse

            })
         }
      }
      else {
         yield put({
            type: FSC_REGISTER_FAILURE,
            response: jsonResponse
         })
      }
   }
   else {
      let response = {}
      response.success = false
      response.message = GENERIC_ERROR
      yield put({
         type: FSC_REGISTER_FAILURE,
         response: response
      })
   }
}

export function* fcsRegisterActionWatcher() {
   yield takeLatest(FSC_REGISTER_PRESSED, fcsRegister);
}