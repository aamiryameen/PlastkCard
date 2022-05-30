import { performSignUpActionWatcher } from '../../screens/SignUp/signup/SignUpSaga/SignUpSaga';
import { forgotPasswordActionWatcher } from '../../screens/ForgotPassword/Saga/ForgotPasswordSaga';
import { setPasswordActionWatcher } from '../../screens/SignUp/setPassword/saga/setPasswordSaga';
import { emailPasswordSignInActionWatcher } from '../../screens/SignIn/EmailPasswordSignIn/saga/EmailPasswordSignInSaga';
import { accountStatusActionWatcher } from '../../screens/Status/saga/StatusSaga';
import { interacCodeActionWatcher } from '../../screens/InteracCodeScreen/Saga/InteracCodeSaga';
import { activateCardActionWatcher } from '../../screens/Status/saga/ActivateYourCardSaga';

import { myBudgetActionWatcher } from '../../screens/Home/MyBudget/Saga/MyBudgetSaga';
import { transactionHistoryActionWatcher } from '../../screens/PlastkCard/TransactionList/Saga/TransactionListSaga';
import { changePasswordActionWatcher } from '../../screens/Profile/ChangePassword/Saga/changePasswordSaga';
import { cmsContentActionWatcher } from '../../screens/Profile/CMSContent/Saga/CMSSaga';
import { fetchChartDataActionWatcher } from '../../component/BezierLineChart/Saga/LineChartSaga';
import { myCardInfoActionWatcher } from '../../screens/Home/MyCard/Saga/MyCardSaga';
import { feedbackActionWatcher } from '../../screens/Profile/Feedback/Saga/FeedbackSaga';
import { allStatementsActionWatcher } from '../../screens/PlastkCard/StatementScreen/Saga/AllStatementsSaga';
import { verifyPaymentActionWatcher } from '../../screens/PlastkCard/VerifyPayment/Saga/VerifyPaymentsSaga';
import {profileActionWatcher} from '../../screens/Profile/ProfileSaga/ProfileSaga'
import {creditEducationActionWatcher} from '../../screens/MyCredit/MyCreditSegmented/PlastkSentinel/CreditEducation/Saga/CreditEducationSaga'
import {requestCreditIncreaseActionWatcher} from '../../screens/Profile/CreditIncreaseLine/Saga/CreditIncreaseLineSaga'
import {performChangeAddressActionWatcher} from '../../screens/Profile/ChangeAddress/Saga/changeAddressSaga'
import {equifaxActionWatcher} from '../../screens/MyCredit/EIDVerification/Saga/EquifaxSaga'
import {fcsRegisterActionWatcher} from '../../screens/FreeCreditScore/FCSRegister/Saga/FCSRegisterSaga'
import {fcsSignUpActionWatcher} from '../../screens/FreeCreditScore/FCSSignUpInfo/Saga/FCSSignUpSaga'
import {fcsDashBoardActionWatcher} from '../../screens/FreeCreditScore/FCSDashBoard/Saga/FCSDashboardSaga'
import {fcsBlogsActionWatcher} from  '../../screens/FreeCreditScore/FCSBlogs/Saga/FSCBlogsSaga'
import {fcsGetCardActionWatcher} from '../../screens/FreeCreditScore/FCSGetPlastkCard/Saga/FCSGetCardSaga'
import {myCreditTnCActionWatcher} from '../../screens/MyCredit/MyCreditSegmented/MyCreditTnC/Saga/MyCreditTncSaga'
import {rewardsGRSUrlActionWatcher} from '../../screens/GRS/Saga/GRSSaga'
import {faqsActionWatcher} from '../../screens/Profile/FAQs/Saga/FaqSaga'

import { all } from 'redux-saga/effects';


export default function* rootSaga() {

  yield all([
    performSignUpActionWatcher(),
    forgotPasswordActionWatcher(),
    setPasswordActionWatcher(),
    emailPasswordSignInActionWatcher(),
    accountStatusActionWatcher(),
    interacCodeActionWatcher(),
    activateCardActionWatcher(),
    myBudgetActionWatcher(),
    transactionHistoryActionWatcher(),
    changePasswordActionWatcher(),
    cmsContentActionWatcher(),
    fetchChartDataActionWatcher(),
    myCardInfoActionWatcher(),
    feedbackActionWatcher(),
    allStatementsActionWatcher(),
    verifyPaymentActionWatcher(),
    creditEducationActionWatcher(),
    requestCreditIncreaseActionWatcher(),
    profileActionWatcher(),
    performChangeAddressActionWatcher(),
    equifaxActionWatcher(),
    fcsRegisterActionWatcher(),
    fcsSignUpActionWatcher(),
    fcsDashBoardActionWatcher(),
    fcsBlogsActionWatcher(),
    fcsGetCardActionWatcher(),
    myCreditTnCActionWatcher(),
    rewardsGRSUrlActionWatcher(),
    faqsActionWatcher()
  ])

}