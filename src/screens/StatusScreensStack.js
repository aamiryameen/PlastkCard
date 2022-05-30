import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import {
  useTheme,
} from '@react-navigation/native';


import AccountStatus from './Status/view/AccountStatus'

import Header from '../component/common/Header'
import InteracCodeScreen from './InteracCodeScreen/View/InteracCodeScreen'
import CmsContent from '../screens/Profile/CMSContent/View/CMSView'



const Stack = createStackNavigator();

export default StatusScreensStack = () => {


  const appTheme = useTheme()

  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: ({ scene, navigation }) => <Header onPress={navigation.goBack} title={scene.descriptor.options.headerTitle} myThemeStyle={appTheme} />
      }} initialRouteName="AccountStatus" >

      <Stack.Screen name="AccountStatus" component={AccountStatus} options={{ header: (props) => null }} />
      <Stack.Screen name="InteracCodeScreen" component={InteracCodeScreen} options={{ headerTitle: 'Deposit Confirmation' }} />
      <Stack.Screen name="CmsContent" component={CmsContent} options={{ headerTitle: '', animationEnabled: false }} />

    </Stack.Navigator>
  )
}