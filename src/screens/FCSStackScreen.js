import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import {
  useTheme,
} from '@react-navigation/native';



import Header from '../component/common/Header'
import FCSDashBoard from './FreeCreditScore/FCSDashBoard/FCSDashBoard'
import FCSAddress from './FreeCreditScore/FCSSignUpInfo/View/FCSAddress'
import FCSFinancialInfo from './FreeCreditScore/FCSSignUpInfo/View/FCSFinancialInfo'
import FCSBlogsDetails from './FreeCreditScore/FCSBlogs/View/FCSBlogsDetails'
import ChangeAddress from './Profile/ChangeAddress/View/changeAddress'
import equifaxVerification from './MyCredit/EIDVerification/View/EquifaxVerification'
import eidVerificationFailure from './MyCredit/EIDVerification/View/EidVerificationFailure'
import eidVerificationSuccess from './MyCredit/EIDVerification/View/EidVerificationSuccess'
import EidDisclaimer from './MyCredit/EIDVerification/View/EidDisclaimer'


import CmsContent from '../screens/Profile/CMSContent/View/CMSView'
import SetPin from './Profile/SetPin'
import SetFingerprint from './Profile/SetFingerprint'
import ChangePinCode from './Profile/ChangePinCode'
import Settings from './Profile/Settings'
import Legal from './Profile/Legal'
import Help from './Profile/Help'
import Faq from './Profile/FAQs/View/Faq'
import FCSProfileScreen from './Profile/FCSProfileScreen'
import ProfileInfoScreen from './Profile/ProfileInfoScreen'
import FCSGetCardScreen from './FreeCreditScore/FCSGetPlastkCard/View/FCSGetCardView'


const Stack = createStackNavigator();

export default FCSStackScreen = () => {

  const appTheme = useTheme()

  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: ({ scene, navigation }) => <Header onPress={navigation.goBack} title={scene.descriptor.options.headerTitle} myThemeStyle={appTheme} />
      }} initialRouteName="FCSDashBoard" >

      <Stack.Screen name="FCSDashBoard" component={FCSDashBoard} options={{ headerTitle: '' }} />
      <Stack.Screen name="FCSAddress" component={FCSAddress} options={{ headerTitle: 'Sign Up' }} />
      <Stack.Screen name="FCSFinancialInfo" component={FCSFinancialInfo} options={{ headerTitle: 'Sign Up' }} />
      <Stack.Screen name="FCSBlogsDetails" component={FCSBlogsDetails} options={{ headerTitle: null }} />

      <Stack.Screen name='ChangeAddress' component={ChangeAddress} options={{ headerTitle: 'Verify Information' }} />
      <Stack.Screen name='EquifaxVerification' component={equifaxVerification} options={{ headerTitle: 'eID Verification' }} />
      <Stack.Screen name='eidVerificationFailure' component={eidVerificationFailure} options={{ header: (props) => null }}  />
      <Stack.Screen name='eidVerificationSuccess' component={eidVerificationSuccess} options={{ header: (props) => null }}  />
      <Stack.Screen name='eidDisclaimer' component={EidDisclaimer} options={{ headerTitle: 'Get verified by Equifax' }}  />




      <Stack.Screen name="CmsContent" component={CmsContent} options={{ headerTitle: '', animationEnabled: false }} />
      <Stack.Screen name="SetPin" component={SetPin} options={{ headerTitle: 'Set Code' }} />
      <Stack.Screen name="ChangePinCode" component={ChangePinCode} options={{ headerTitle: ' Change Code' }} />
      <Stack.Screen name="SetFingerprint" component={SetFingerprint} options={{ headerTitle: 'Set Fingerprint' }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name="Help" component={Help} options={{ headerTitle: 'Help' }} />
      <Stack.Screen name="Legal" component={Legal} options={{ headerTitle: 'Legal' }} />
      <Stack.Screen name="Faq" component={Faq} options={{ headerTitle: 'FAQs' }} />
      <Stack.Screen name="FCSProfile" component={FCSProfileScreen} options={{ headerTitle: 'Profile' }} />

      <Stack.Screen name="ProflieInfo" component={ProfileInfoScreen} options={{ headerTitle: 'My Info' }} />

      <Stack.Screen name="FCSGetCardScreen" component={FCSGetCardScreen} options={{ headerTitle: 'Get Plastk Card' }} />


    </Stack.Navigator>
  )
}
