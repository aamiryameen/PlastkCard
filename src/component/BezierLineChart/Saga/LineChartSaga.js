import { put, takeLatest } from 'redux-saga/effects'
import { getBaseUrl } from '../../../utils/WebService'
import { CHART_DATA_FAILURE, CHART_DATA_SUCCESS, DASHBOARD_MY_CARD_DAILY, DASHBOARD_MY_CARD_MONTHLY, DASHBOARD_MY_CARD_WEEKLY, DASHBOARD_MY_POINTS_DAILY, DASHBOARD_MY_POINTS_MONTHLY, DASHBOARD_MY_POINTS_WEEKLY, FETCH_CHART_DATA, GENERIC_ERROR, getAuthenticationToken, LOGOUT_APP } from '../../../utils/Constants';
import Toast from 'react-native-simple-toast';


function* fetchChartData(action) {

   let jsonResponse = ''
   let response = '';
   try {

      yield fetch(getBaseUrl() + 'cards/get-transaction-chart/' + action.dataDuration, {

         method: 'GET',
         cache: 'no-cache',
         headers: {
            'Authorization': 'Bearer ' + getAuthenticationToken()
         }
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
               type: `${CHART_DATA_SUCCESS}_${action.viewType}`,
               response: jsonResponse

            })

         }
         else {
            yield put({
               type: `${CHART_DATA_FAILURE}_${action.viewType}`,
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
            type: `${CHART_DATA_FAILURE}_${action.viewType}`,
            response: response
         })
      }

   }
   catch (error) {
      let response = {}
      response.message = GENERIC_ERROR
      yield put({
         type: `${CHART_DATA_FAILURE}_${action.viewType}`,
         response: response
      })
   }

}




export function* fetchChartDataActionWatcher() {
   yield takeLatest(`${FETCH_CHART_DATA}_${DASHBOARD_MY_CARD_DAILY}`, fetchChartData);
   yield takeLatest(`${FETCH_CHART_DATA}_${DASHBOARD_MY_CARD_MONTHLY}`, fetchChartData);
   yield takeLatest(`${FETCH_CHART_DATA}_${DASHBOARD_MY_CARD_WEEKLY}`, fetchChartData);
   yield takeLatest(`${FETCH_CHART_DATA}_${DASHBOARD_MY_POINTS_DAILY}`, fetchChartData);
   yield takeLatest(`${FETCH_CHART_DATA}_${DASHBOARD_MY_POINTS_MONTHLY}`, fetchChartData);
   yield takeLatest(`${FETCH_CHART_DATA}_${DASHBOARD_MY_POINTS_WEEKLY}`, fetchChartData);
}