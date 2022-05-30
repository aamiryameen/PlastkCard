


import React from 'react';
import FCSStackScreen from '../../screens/FCSStackScreen'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import FCSCustomDrawerContent from './FCSCustomDrawerContent'
import {
   useTheme
} from '@react-navigation/native';
import theme from '../../utils/theme'

const Drawer = createDrawerNavigator();


export default FCSAppDrawer = () => {





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
      drawerContent={props => <FCSCustomDrawerContent  {...props} />}>
      <Drawer.Screen name="FCSStackScreen" component={FCSStackScreen} />
    </Drawer.Navigator>
  )
}


