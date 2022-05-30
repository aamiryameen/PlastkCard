import { combineReducers } from 'redux';

// Reducers //
import signUpReducer from '../../screens/SignUp/signup/SignUpReducer/SignUpReducer'
import forgotPasswordReducer from '../../screens/ForgotPassword/Reducer/ForgotPasswordReducer'
import setPasswordReducer from '../../screens/SignUp/setPassword/reducer/setPasswordReducer'
import SignInWithNamedType from '../../screens/SignIn/EmailPasswordSignIn/reducer/EmailPasswordSignInReducer'
import SignInSuccessReducer from '../../screens/Splash/Reducer/SplashReducer'
import { DASHBOARD_MY_CARD_DAILY, DASHBOARD_MY_CARD_MONTHLY, DASHBOARD_MY_CARD_WEEKLY, DASHBOARD_MY_POINTS_DAILY, DASHBOARD_MY_POINTS_MONTHLY, DASHBOARD_MY_POINTS_WEEKLY, FCS_REGISTER_SCREEN, FINGER_PRINT_SIGN_IN_SCREEN, FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN, LOGOUT_APP, PIN_CODE_SIGN_IN_SCREEN, REGISTER_VIA_FINGER_PRINT_SCREEN, REGISTER_VIA_PIN_CODE_SCREEN, setAuthenticationToken, setMyCreditAuthDone, SET_PASSWORD_SCREEN, SIGN_IN_SCREEN, SKIP_REGISTER_SECURE_LOGIN_SCREEN, } from '../../utils/Constants'
import accountStatusReducer from '../../screens/Status/reducer/StatusReducer'
import interacCodesReducer from '../../screens/InteracCodeScreen/Reducer/InteracCodesReducer'
import activateCardReducer from '../../screens/Status/reducer/ActivateYourCardReducer';
import myBudgetReducer from '../../screens/Home/MyBudget/Reducer/MyBudgetReducer'
import transactionHistoryReducer from '../../screens/PlastkCard/TransactionList/Reducer/TransactionListReducer'
import changePasswordReducer from '../../screens/Profile/ChangePassword/Reducer/ChagePasswordReducer'
import cmsContentReducer from '../../screens/Profile/CMSContent/Reducer/CMSReducer'
import chartDataWithNamedType from '../../component/BezierLineChart/Reducer/LineChartReducer'
import myCardReducer from '../../screens/Home/MyCard/Reducer/MyCardReducer'
import FeedbackReducer from '../../screens/Profile/Feedback/Reducer/FeedbackReducer'
import allStatementsReducer from '../../screens/PlastkCard/StatementScreen/Reducer/AllStatementsReducer'
import verifyPaymentsReducer from '../../screens/PlastkCard/VerifyPayment/Reducer/VerifyPaymentsReducer'
import profileReducer from '../../screens/Profile/ProfileReducer/ProfileReducer'
import creditEducationReducer from '../../screens/MyCredit/MyCreditSegmented/PlastkSentinel/CreditEducation/Reducer/CreditEducationReducer'
import requestCreditIncreaseReducer from '../../screens/Profile/CreditIncreaseLine/Reducer/CreditIncreaseLineReducer'
import changeAddressReducer from '../../screens/Profile/ChangeAddress/Reducer/changeAddressReducer'
import equifaxReducer from '../../screens/MyCredit/EIDVerification/Reducer/EquifaxReducer'
import fcsRegisterReducer from '../../screens/FreeCreditScore/FCSRegister/Reducer/FCSRegisterReducer'
import fcsSignUpReducer from '../../screens/FreeCreditScore/FCSSignUpInfo/Reducer/FCSSignupReducer'
import fcsDashBoardReducer from '../../screens/FreeCreditScore/FCSDashBoard/Reducer/FCSDashBoardReducer'
import fcsBlogsRedcuer from '../../screens/FreeCreditScore/FCSBlogs/Reducer/FSCBlogsReducer'
import fcsGetCardReducer from '../../screens/FreeCreditScore/FCSGetPlastkCard/Reducer/FCSGetCardReducer'
import myCreditTnCReducer from '../../screens/MyCredit/MyCreditSegmented/MyCreditTnC/Reducer/MyCreditTncReducer'
import faqReducer from '../../screens/Profile/FAQs/Reducer/FAQsReducer'

// Combining all the reducers //
const appReducer = combineReducers({
  signUpReducer: signUpReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  setPasswordReducer: setPasswordReducer,
  SignInSuccessReducer: SignInSuccessReducer,
  accountStatusReducer: accountStatusReducer,
  EmailPasswordLoginInReducer: SignInWithNamedType(SIGN_IN_SCREEN),
  fcsRegisterScreenLoginReducer: SignInWithNamedType(FCS_REGISTER_SCREEN),
  pinCodeSignInReducer: SignInWithNamedType(PIN_CODE_SIGN_IN_SCREEN),
  fingerPrintSignInReducer: SignInWithNamedType(FINGER_PRINT_SIGN_IN_SCREEN),
  pinCodeRegisterReducer: SignInWithNamedType(REGISTER_VIA_PIN_CODE_SCREEN),
  fingerPrintRegisterReducer: SignInWithNamedType(REGISTER_VIA_FINGER_PRINT_SCREEN),
  skipSecureRegisterReducer: SignInWithNamedType(SKIP_REGISTER_SECURE_LOGIN_SCREEN),
  setPasswordLoginReducer: SignInWithNamedType(SET_PASSWORD_SCREEN),
  forgotPasswordSuccessLoginReducer: SignInWithNamedType(FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN),
  interacCodesReducer: interacCodesReducer,
  activateCardReducer: activateCardReducer,
  myBudgetReducer: myBudgetReducer,
  transactionHistoryReducer: transactionHistoryReducer,
  changePasswordReducer: changePasswordReducer,
  cmsContentReducer: cmsContentReducer,
  myCardDailyReducer: chartDataWithNamedType(DASHBOARD_MY_CARD_DAILY),
  myCardMonthlyReducer: chartDataWithNamedType(DASHBOARD_MY_CARD_MONTHLY),
  myCardWeeklyReducer: chartDataWithNamedType(DASHBOARD_MY_CARD_WEEKLY),
  myPointsDailyReducer: chartDataWithNamedType(DASHBOARD_MY_POINTS_DAILY),
  myPointsMonthlyReducer: chartDataWithNamedType(DASHBOARD_MY_POINTS_MONTHLY),
  myPointsWeeklyReducer: chartDataWithNamedType(DASHBOARD_MY_POINTS_WEEKLY),
  myCardReducer: myCardReducer,
  FeedbackReducer: FeedbackReducer,
  allStatementsReducer: allStatementsReducer,
   requestCreditIncreaseReducer: requestCreditIncreaseReducer,
  verifyPaymentsReducer: verifyPaymentsReducer,
  profileReducer: profileReducer,
  creditEducationReducer: creditEducationReducer,
  changeAddressReducer: changeAddressReducer,
  equifaxReducer: equifaxReducer,
  fcsRegisterReducer : fcsRegisterReducer,
  fcsSignUpReducer : fcsSignUpReducer,
  fcsDashBoardReducer : fcsDashBoardReducer,
  fcsBlogsRedcuer: fcsBlogsRedcuer,
  fcsGetCardReducer: fcsGetCardReducer,
  myCreditTnCReducer: myCreditTnCReducer,
  faqReducer: faqReducer
})

// Creating root reducer with combined reducers //
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_APP) {
    state = undefined;
    setMyCreditAuthDone(false)
  }
  return appReducer(state, action);
}

export default rootReducer;