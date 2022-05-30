


import React from 'react';
import RootStack from '../../screens/RootStackScreen'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent'
import {
   useTheme
} from '@react-navigation/native';
import theme from '../../utils/theme'

const Drawer = createDrawerNavigator();


export default AppDrawer = () => {





  return (

    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: theme.GRADIENT_SECOND_COLOR,
        width: 270,
      }}
      drawerContentOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#fff"
      }}
      drawerContent={props => <CustomDrawerContent  {...props} />}>
      <Drawer.Screen name="RootStack" component={RootStack} />
    </Drawer.Navigator>
  )
}


