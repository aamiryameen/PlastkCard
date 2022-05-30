import { MY_CARD_INFO_FAILURE, MY_CARD_INFO_SUCCESS, POINTS_INFO_DASHBOARD_SUCCESS } from "../../../../utils/Constants";

const INITIAL_STATE = {
    availableCreditLimit: 0,
    balance: 0,
    creditLimit: 0,
    lastPaymentDate : '',
    amountDue : 0,
    minPayment : 0,
    statementEndDate : '',
    purchaseAmount : 0,
    totalPoints: 0,
    pointValueInDollars: 0,
    pendingPoints : 0,
    pendingTransactions: 0,
    lastPaymentAmount: 0

}
export default function myCardReducer (state = INITIAL_STATE, action) {

    switch(action.type) {

        case MY_CARD_INFO_SUCCESS:
            return {
                ...state,
                availableCreditLimit : action.availableCreditLimit,
                balance : action.balance,
                creditLimit : action.creditLimit,
                lastPaymentDate : action.lastPaymentDate,
                amountDue : action.amountDue,
                minPayment : action.minPayment,
                statementEndDate: action.statementEndDate,
                purchaseAmount: action.purchaseAmount,
            }

        case POINTS_INFO_DASHBOARD_SUCCESS: {
            return {
                ...state,
                totalPoints : action.totalPoints,
                pointValueInDollars : action.pointValueInDollars,
                pendingPoints: action.pendingPoints,
                pendingTransactions: action.pendingTransactions,
                lastPaymentAmount: action.lastPaymentAmount
            }
        }

        default:
            return state

    }

}