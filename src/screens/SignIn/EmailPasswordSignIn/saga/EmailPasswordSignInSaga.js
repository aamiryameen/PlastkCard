import { call, put, takeLatest } from 'redux-saga/effects'
import { EMAIL_PASSWORD_SIGN_IN_FAILURE, EMAIL_PASSWORD_SIGN_IN_SUCCESS, FINGER_PRINT_SIGN_IN_SCREEN, PERFORM_EMAIL_PASSWORD_SIGN_IN, PIN_CODE_SIGN_IN_SCREEN, SIGN_IN_SCREEN, VALIDATE_SET_PASSWORD_TOKEN, VALID_SET_PASSWORD_TOKEN, INVALID_SET_PASSWORD_TOKEN, setAuthenticationToken, REGISTER_VIA_FINGER_PRINT_SCREEN, REGISTER_VIA_PIN_CODE_SCREEN, SKIP_REGISTER_SECURE_LOGIN_SCREEN, SET_PASSWORD_SCREEN, FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN, FETCH_USER_IP, setUserIP, VALIDATE_EMAIL_TOKEN, VALIDATE_EMAIL_TOKEN_SUCCESS, VALIDATE_EMAIL_TOKEN_FAILURE, GENERIC_ERROR, FCS_REGISTER_SCREEN} from '../../../../utils/Constants';
import { getBaseUrl } from '../../../../utils/WebService'


function* emailPasswordSignIn(action) {

   let jsonResponse = ''
   let response = '';
   try {
      yield fetch(getBaseUrl() + 'auth/login', {

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
   
         setAuthenticationToken(jsonResponse.token)
   
         if (response.status === 200) {
            if (jsonResponse.success === true) {
   
               yield put({
                  type: `${EMAIL_PASSWORD_SIGN_IN_SUCCESS}_${action.viewType}`,
                  response: jsonResponse
   
               })
            }
            else if (jsonResponse.error === true) {
   
               yield put({
                  type: `${EMAIL_PASSWORD_SIGN_IN_FAILURE}_${action.viewType}`,
                  response: jsonResponse
               })
            }
         }
         else {
            yield put({
               type: `${EMAIL_PASSWORD_SIGN_IN_FAILURE}_${action.viewType}`,
               response: jsonResponse
            })
         }
      }
      else {
         let response = {}
         response.message = GENERIC_ERROR
         yield put({
            type: `${EMAIL_PASSWORD_SIGN_IN_FAILURE}_${action.viewType}`,
            response : response
         })
      }
   
   }

   catch(error) {
      let response = {}
         response.message = GENERIC_ERROR
         yield put({
            type: `${EMAIL_PASSWORD_SIGN_IN_FAILURE}_${action.viewType}`,
            response : response
         })
   }

   

}


function* validateSetPasswordToken(action) {

   let jsonResponse = ''
   let response = '';
   
   
   yield fetch(getBaseUrl() + 'auth/verify_otp/' + action.payload, {

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
               type: `${VALID_SET_PASSWORD_TOKEN}_${action.viewType}`,
               tokenValidationResponse: 'success'

            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: `${INVALID_SET_PASSWORD_TOKEN}_${action.viewType}`,
               tokenValidationResponse: 'failure'
            })
         }
      }
      else
      {
         yield put({
            type: `${INVALID_SET_PASSWORD_TOKEN}_${action.viewType}`,
            tokenValidationResponse: 'failure'
         })
         
      }
   }
   else
   {
      yield put({
         type: `${INVALID_SET_PASSWORD_TOKEN}_${action.viewType}`,
         tokenValidationResponse: 'failure'
      })
   }

}


function* validateEmailToken(action) {

   let jsonResponse = ''
   let response = '';
   
   
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
               type: `${VALIDATE_EMAIL_TOKEN_SUCCESS}_${action.viewType}`,
               emailValidationResponse: 'success'

            })
         }
         else if (jsonResponse.error === true) {

            yield put({
               type: `${VALIDATE_EMAIL_TOKEN_FAILURE}_${action.viewType}`,
               emailValidationResponse: 'failure'
            })
         }
      }
      else
      {
         yield put({
            type: `${VALIDATE_EMAIL_TOKEN_FAILURE}_${action.viewType}`,
            emailValidationResponse: 'failure'
         })
         
      }
   }
   else
   {
      yield put({
         type: `${VALIDATE_EMAIL_TOKEN_FAILURE}_${action.viewType}`,
         emailValidationResponse: 'failure'
      })
   }

}



function* fetchUserIP(action) {

   let jsonResponse = ''
   let response = '';
      
   yield fetch('https://api.ipify.org/?format=json', {

      method: 'GET',
      cache: 'no-cache',
   }
   ).then(data => {
      response = data
   }).catch((error) => {
      console.error('Error:', error);
   });

   if (response && response.status === 200) {
      jsonResponse = yield response.json()

      if(jsonResponse.hasOwnProperty('ip')) {
         setUserIP(jsonResponse.ip)
      }
      
   }

}




export function* emailPasswordSignInActionWatcher() {
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${SIGN_IN_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${FCS_REGISTER_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${FINGER_PRINT_SIGN_IN_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${PIN_CODE_SIGN_IN_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${REGISTER_VIA_FINGER_PRINT_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${REGISTER_VIA_PIN_CODE_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${SKIP_REGISTER_SECURE_LOGIN_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${PERFORM_EMAIL_PASSWORD_SIGN_IN}_${SET_PASSWORD_SCREEN}`, emailPasswordSignIn);
   yield takeLatest(`${VALIDATE_SET_PASSWORD_TOKEN}_${SIGN_IN_SCREEN}`, validateSetPasswordToken);
   yield takeLatest(`${VALIDATE_SET_PASSWORD_TOKEN}_${FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN}`, validateSetPasswordToken);
   yield takeLatest(`${FETCH_USER_IP}_${SIGN_IN_SCREEN}`, fetchUserIP);

   yield takeLatest(`${VALIDATE_EMAIL_TOKEN}_${SIGN_IN_SCREEN}`, validateEmailToken);
}