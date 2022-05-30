import { getBaseUrl } from '../../../../utils/WebService'
import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_MY_CARD_INFO, FETCH_POINTS_INFO_DASHBOARD, getAuthenticationToken, LOGOUT_APP, MY_CARD_INFO_FAILURE, MY_CARD_INFO_SUCCESS, POINTS_INFO_DASHBOARD_FAILURE, POINTS_INFO_DASHBOARD_SUCCESS, GENERIC_ERROR } from '../../../../utils/Constants'
import Toast from 'react-native-simple-toast';


function* fetchMyCardInfo(action) {

    let response = ""
    let jsonResponse = ""

    yield fetch(getBaseUrl() + 'cards/get-summary', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },

    }).then((data) => {
        response = data

    }).catch((error) => {
        console.log(error)
    })

    try {

        if (response && response.status < 500) {

            jsonResponse = yield response.json()

            if (response.status === 200) {

                if (jsonResponse.success === true) {

                    let obj = {}

                    if (jsonResponse.card_summary !== null && jsonResponse.card_summary !== undefined) {
                        obj.availableCreditLimit = jsonResponse.card_summary.AvailableCreditLimit
                        obj.balance = jsonResponse.card_summary.Balance
                        obj.creditLimit = jsonResponse.card_summary.CreditLimit
                    }
                    else {
                        obj.availableCreditLimit = 0
                        obj.balance = 0
                        obj.creditLimit = 0
                    }

                    if (jsonResponse.statement_summary !== null && jsonResponse.statement_summary !== undefined) {

                        obj.lastPaymentDate = jsonResponse.statement_summary.LastPaymentDate
                        obj.amountDue = jsonResponse.statement_summary.NewBalance
                        obj.minPayment = jsonResponse.statement_summary.MinPayment
                        obj.statementEndDate = jsonResponse.statement_summary.StatementEndDate
                        obj.purchaseAmount = jsonResponse.statement_summary.PurchaseAmount

                    } else {

                        obj.lastPaymentDate = ''
                        obj.amountDue = 0,
                        obj.minPayment = 0
                        obj.statementEndDate = ''
                        obj.purchaseAmount = 0
                    }

                    yield put({
                        type: MY_CARD_INFO_SUCCESS,
                        availableCreditLimit: obj.availableCreditLimit,
                        balance: obj.balance,
                        creditLimit: obj.creditLimit,
                        lastPaymentDate: obj.lastPaymentDate,
                        amountDue: obj.amountDue,
                        minPayment: obj.minPayment,
                        statementEndDate: obj.statementEndDate,
                        purchaseAmount: obj.purchaseAmount,
                    })
                }
                else {

                    yield put({
                        type: MY_CARD_INFO_FAILURE,
                    })
                }
            }

            else {

                yield put({
                    type: MY_CARD_INFO_FAILURE,
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

            yield put({
                type: MY_CARD_INFO_FAILURE,
            })
        }
    }

    catch (error) {
        yield put({
            type: MY_CARD_INFO_FAILURE,
        })
    }

}


function* fetchPointsInfo(action) {

    let response = ""
    let jsonResponse = ""

    yield fetch(getBaseUrl() + 'cards/get-points-summary', {

        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthenticationToken()
        },

    }).then((data) => {
        response = data

    }).catch((error) => {
        console.log(error)
    })

    try {

        if (response && response.status < 500) {

            jsonResponse = yield response.json()

            if (response.status === 200) {

                if (jsonResponse.success === true) {
                    yield put({
                        type: POINTS_INFO_DASHBOARD_SUCCESS,
                        totalPoints: jsonResponse.total_points,
                        pointValueInDollars: jsonResponse.total_points_value,
                        pendingPoints: jsonResponse.total_pending_points,
                        pendingTransactions: jsonResponse.total_pending_transactions,
                        lastPaymentAmount : (jsonResponse.last_payment[0] !== undefined) ? jsonResponse.last_payment[0].TransactionAmount : 0
                    })
                }
                else {

                    yield put({
                        type: POINTS_INFO_DASHBOARD_FAILURE,
                    })
                }
            }

            else {

                yield put({
                    type: POINTS_INFO_DASHBOARD_FAILURE,
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

            yield put({
                type: POINTS_INFO_DASHBOARD_FAILURE,
            })
        }
    }

    catch (error) {
        yield put({
            type: POINTS_INFO_DASHBOARD_FAILURE,
        })
    }

}

export function* myCardInfoActionWatcher() {
    yield takeLatest(FETCH_MY_CARD_INFO, fetchMyCardInfo)
    yield takeLatest(FETCH_POINTS_INFO_DASHBOARD, fetchPointsInfo)
}