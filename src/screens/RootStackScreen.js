import 'react-native-gesture-handler';
import React from 'react'
import {
  useTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProflieScreen from './Profile/ProfileScreen'
import PersonalInfoApplication from './SignUp/PersonalInfoApplication'
import NotificationSettings from './Profile/NotificationSetting'
import Faq from './Profile/FAQs/View/Faq'
import FaqCategoryDetail from './Profile/FAQs/View/FaqCategoryDetail'
import Legal from './Profile/Legal'
import Help from './Profile/Help'
import About from './Profile/About'
import ReferFriend from './Profile/ReferFriend'
import Feedback from './Profile/Feedback/View/Feedback'
import ChangePassword from './Profile/ChangePassword/View/ChangePassword'
import PasswordUpdated from './Profile/PasswordUpdated'
import MessageSent from './Profile/MessageSent'
import Mylist from './Profile/Mylist'
import RequestCreditIncrease from './Profile/RequestCreditIncrease'
import SecuredAccount from './cardSecurity/SecuredAccount'
import VerifyCode from './Profile/VerifyCode'
import Scanner from '../component/Scanner/ScannerTessert'
import SecuredFundSent from './cardSecurity/securedFundSent'
import SecuredFundReceived from './cardSecurity/SecuredFundReceived'
import ResponseQuestions from './verification/equifax/ResponseQuestions'
import EquifaxEidConfirm from './verification/equifax/EquifaxEidConfirm'
import EquifaxEidFailed from './verification/equifax/EquifaxEidFailed'
import TermsOfServiceCanadaPost from './verification/CandaPost/TermsOfService'
import Pending from '../screens/verification/CandaPost/Pending'
import PostIdPending from './verification/CandaPost/PostIdPending'
import IdComplete from './verification/CandaPost/IdComplete'
import IdExpired from './verification/CandaPost/IdExpired'
import FundReturnPending from './nonVerfiedFundRetured/FundReturnPending'
import FundReturnCompleted from './nonVerfiedFundRetured/FundReturnCompleted'
import FundReturedExpired from './nonVerfiedFundRetured/FundReturedExpired'
import LinkCard from './cardLinkingAndActivation/LinkCard'
import ActivateCard from './cardLinkingAndActivation/ActivateCard'
import AccountStatus from './Status/view/AccountStatus'
import ProfileInfoScreen from './Profile/ProfileInfoScreen'
import CardActivated from './cardLinkingAndActivation/CardActivated'
import CardActivatedWithFeatures from './cardLinkingAndActivation/CardActivatedWithFeatures'
import CardActivatedError from './cardLinkingAndActivation/CardActivatedError'
import Header from '../component/common/Header'
import Modal from '../component/common/Modal'
import DashBoard from './Home/Dashboard/View/DashBoard'
import PlastkCardMain from './PlastkCard/PlastkCardMainScreen/View/PlastkCardMain';
import MoveMoney from './PlastkCard/MoveMoney'
import TransactionListScreen from './PlastkCard/TransactionList/View/TransactionListScreen'
import TransactionDetailScreen from './PlastkCard/TransactionList/View/TransactionDetailScreen'
import AccordionComponent from '../component/common/AccordionExpandingView'
import CardStatementScreen from './PlastkCard/StatementScreen/View/CardStatementScreen'
import ConvertPointsToCash from './PlastkCard/ConvertPointsToCash'
import SendMoneyTransfer from './PlastkCard/SendMoneyTransfer/SendMoneyTransfer'
import RequestMoneyTransfer from './PlastkCard/RequestMoneyTransfer/RequestMoneyTransfer'
import AllStatementsScreen from './PlastkCard/StatementScreen/View/AllStatementsScreen'
import SetPin from './Profile/SetPin'
import SetFingerprint from './Profile/SetFingerprint'
import ChangePinCode from './Profile/ChangePinCode'
import Settings from './Profile/Settings'
import VerifyPaymentScreen from './PlastkCard/VerifyPayment/View/VerifyPaymentScreen'
import RequestCreditSegment from '../screens/Profile/CreditIncreaseLine/View/RequestCreditSegment'
import RequestCreditIncreaeSuccess from '../screens/Profile/CreditIncreaseLine/View/RequestCreditSuccess'
import MyCredit from './MyCredit/MyCreditSegmented/MyCreditSegmented'
import VerifyPaymentSuccess from './PlastkCard/VerifyPayment/View/VerifyPaymentSuccess'
import CreditInsights from './MyCredit/CreditInsights'
import CreditWatch from '../screens/MyCredit/MyCreditSegmented/PlastkSentinel/CreditWatch'
import CmsContent from '../screens/Profile/CMSContent/View/CMSView'
import Benchmarks from './MyCredit/MyCreditSegmented/PlastkSentinel/Benchmarks'
import CreditView from './MyCredit/MyCreditSegmented/PlastkSentinel/CreditView'
import CreditEducation from './MyCredit/MyCreditSegmented/PlastkSentinel/CreditEducation/View/CreditEducation'
import BlogDetailScreen from './MyCredit/MyCreditSegmented/PlastkSentinel/CreditEducation/View/BlogDetailScreen'
import ChangeAddress from './Profile/ChangeAddress/View/changeAddress'
import equifaxVerification from './MyCredit/EIDVerification/View/EquifaxVerification'
import eidVerificationFailure from './MyCredit/EIDVerification/View/EidVerificationFailure'
import eidVerificationSuccess from './MyCredit/EIDVerification/View/EidVerificationSuccess'
import EidDisclaimer from './MyCredit/EIDVerification/View/EidDisclaimer'
import FCSBlogsDetails from './FreeCreditScore/FCSBlogs/View/FCSBlogsDetails'
import PdfViewer from '../component/common/PdfViewer';



export default RootStackScreen = () => {

  const myTheme = useTheme()

  const Stack = createStackNavigator();

  return (

    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: ({ scene, navigation }) => <Header onPress={navigation.goBack} title={scene.descriptor.options.headerTitle} myThemeStyle={myTheme} />
      }} initialRouteName="DashBoard" >
      <Stack.Screen name="DashBoard" component={DashBoard} options={{ header: (props) => null }} />
      <Stack.Screen name="Modal" component={Modal} options={{ header: (props) => null }} />
      <Stack.Screen name="AccordionComponent" component={AccordionComponent} options={{ header: (props) => null }} />
      <Stack.Screen name="Scanner" component={Scanner} options={{ header: (props) => null }} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} options={{ headerTitle: 'Verify Code' }} />
      <Stack.Screen name="RequestCreditIncrease" component={RequestCreditIncrease} options={{ headerTitle: 'Request Credit Increase' }} />
      <Stack.Screen name="PersonalInfoApplication" component={PersonalInfoApplication} options={{ headerTitle: 'Application' }} />
      <Stack.Screen name="Proflie" component={ProflieScreen} options={{ headerTitle: 'Profile' }} />
      <Stack.Screen name="CmsContent" component={CmsContent} options={{ headerTitle: '', animationEnabled: false }} />
      <Stack.Screen name="ProflieInfo" component={ProfileInfoScreen} options={{ headerTitle: 'My Card Info' }} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} options={{ headerTitle: 'Notification Settings' }} />
      <Stack.Screen name="Legal" component={Legal} options={{ headerTitle: 'Legal' }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name="Help" component={Help} options={{ headerTitle: 'Help' }} />
      <Stack.Screen name="Mylist" component={Mylist} options={{ headerTitle: 'My List' }} />
      <Stack.Screen name="AccountStatus" component={AccountStatus} options={{ header: (props) => null }} />
      <Stack.Screen name="Faq" component={Faq} options={{ headerTitle: 'FAQs' }} />
      <Stack.Screen name="FaqCategoryDetail" component={FaqCategoryDetail} options={{ headerTitle: '' }} />
      <Stack.Screen name="About" component={About} options={{ headerTitle: 'About Us' }} />
      <Stack.Screen name="ReferFriend" component={ReferFriend} options={{ header: (props) => null }} />
      <Stack.Screen name="Feedback" component={Feedback} options={{ headerTitle: 'Feedback' }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTitle: 'Change Password' }} />
      <Stack.Screen name="PasswordUpdated" component={PasswordUpdated} options={{ header: (props) => null }} />
      <Stack.Screen name="MessageSent" component={MessageSent} options={{ header: (props) => null }} />
      <Stack.Screen name="SecuredAccount" component={SecuredAccount} options={{ headerTitle: 'Fund Your Secure Account' }} />
      <Stack.Screen name="SecuredFundSent" component={SecuredFundSent} options={{ header: (props) => null }} />
      <Stack.Screen name="SecuredFundReceived" component={SecuredFundReceived} options={{ header: (props) => null }} />
      <Stack.Screen name="EquifaxEidConfirm" component={EquifaxEidConfirm} options={{ header: (props) => null }} />
      <Stack.Screen name="EquifaxEidFailed" component={EquifaxEidFailed} options={{ header: (props) => null }} />
      <Stack.Screen name="ResponseQuestions" component={ResponseQuestions} options={{ header: (props) => null }} />
      <Stack.Screen name="Pending" component={Pending} options={{ header: (props) => null }} />
      <Stack.Screen name="PostIdPending" component={PostIdPending} options={{ header: (props) => null }} />
      <Stack.Screen name="IdComplete" component={IdComplete} options={{ header: (props) => null }} />
      <Stack.Screen name="IdExpired" component={IdExpired} options={{ header: (props) => null }} />
      <Stack.Screen name="FundReturnPending" component={FundReturnPending} options={{ header: (props) => null }} />
      <Stack.Screen name="FundReturnCompleted" component={FundReturnCompleted} options={{ header: (props) => null }} />
      <Stack.Screen name="FundReturedExpired" component={FundReturedExpired} options={{ header: (props) => null }} />
      <Stack.Screen name="LinkCard" component={LinkCard} options={{ headerTitle: 'Link Plstk Card' }} />
      <Stack.Screen name="ActivateCard" component={ActivateCard} options={{ headerTitle: 'Activate Plastk Card' }} />
      <Stack.Screen name="CardActivated" component={CardActivated} options={{ header: (props) => null }} />
      <Stack.Screen name="CardActivatedError" component={CardActivatedError} options={{ header: (props) => null }} />
      <Stack.Screen name="CardActivatedWithFeatures" component={CardActivatedWithFeatures} options={{ header: (props) => null }} />
      <Stack.Screen name="TermsOfServiceCanadaPost" component={TermsOfServiceCanadaPost} options={{ headerTitle: 'Terms Of Service' }} />
      <Stack.Screen name="PlastkCard" component={PlastkCardMain} options={{ header: (props) => null }} />
      <Stack.Screen name="TransactionList" component={TransactionListScreen} options={{ headerTitle: 'Current Transactions' }} />
      <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} options={{ headerTitle: 'Transaction Detail' }} />
      <Stack.Screen name="CardStatementScreen" component={CardStatementScreen} options={{ headerTitle: 'Card Statements' }} />
      <Stack.Screen name="AllStatementsScreen" component={AllStatementsScreen} options={{ headerTitle: 'All Statements' }} />
      <Stack.Screen name="MoveMoney" component={MoveMoney} options={{ headerTitle: 'Move Money' }} />
      <Stack.Screen name="ConvertPointsToCash" component={ConvertPointsToCash} options={{ headerTitle: 'Convert Points To Cash' }} />
      <Stack.Screen name="SendMoneyTransfer" component={SendMoneyTransfer} options={{ headerTitle: 'Send Money Transfer' }} />
      <Stack.Screen name="RequestMoneyTransfer" component={RequestMoneyTransfer} options={{ headerTitle: 'Request Money Transfer' }} />
      <Stack.Screen name="SetPin" component={SetPin} options={{ headerTitle: 'Set Code' }} />
      <Stack.Screen name="ChangePinCode" component={ChangePinCode} options={{ headerTitle: ' Change Code' }} />
      <Stack.Screen name="SetFingerprint" component={SetFingerprint} options={{ headerTitle: 'Set Fingerprint' }} />
      <Stack.Screen name="VerifyPaymentScreen" component={VerifyPaymentScreen} options={{ headerTitle: 'Verify Your Payment' }} />
      <Stack.Screen name='VerifyPaymentSuccess' component={VerifyPaymentSuccess} options={{ header: (props) => null }} />
      <Stack.Screen name='MyCredit' component={MyCredit} options={{ header: (props) => null }} />
      <Stack.Screen name='CreditInsights' component={CreditInsights} options={{ header: (props) => null }} />
      <Stack.Screen name='CreditWatch' component={CreditWatch} options={{ headerTitle: 'Credit Watch' }} />
      <Stack.Screen name='Benchmarks' component={Benchmarks} options={{ headerTitle: 'Your Benchmarks' }} />
      <Stack.Screen name='CreditView' component={CreditView} options={{ headerTitle: 'Credit View' }} />
      <Stack.Screen name='CreditEducation' component={CreditEducation} options={{ headerTitle: 'Credit Education' }} />
      <Stack.Screen name='BlogDetailScreen' component={BlogDetailScreen} options={{ headerTitle: '' }} />
      <Stack.Screen name='RequestCreditSegment' component={RequestCreditSegment} options={{ headerTitle: 'Request Credit Limit Increase' }} />
      <Stack.Screen name='RequestCreditIncreaeSuccess' component={RequestCreditIncreaeSuccess} options={{ headerTitle: 'Request Submitted Successfully' }} />
      <Stack.Screen name='ChangeAddress' component={ChangeAddress} options={{ headerTitle: 'Verify Information' }} />
      <Stack.Screen name='EquifaxVerification' component={equifaxVerification} options={{ headerTitle: 'eID Verification' }} />
      <Stack.Screen name='eidVerificationFailure' component={eidVerificationFailure} options={{ header: (props) => null }} />
      <Stack.Screen name='eidVerificationSuccess' component={eidVerificationSuccess} options={{ header: (props) => null }} />
      <Stack.Screen name='eidDisclaimer' component={EidDisclaimer} options={{ headerTitle: 'Get verified by Equifax' }} />
      <Stack.Screen name="FCSBlogsDetails" component={FCSBlogsDetails} options={{ headerTitle: null }} />
      <Stack.Screen name="PdfViewer" component={PdfViewer} options={{ header: (props) => null }} />
    </Stack.Navigator>
  )
}
