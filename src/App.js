import React, { Component } from 'react';
import SplashScreen from './screens/Splash/View/SplashScreen';
import { Provider } from 'react-redux'
import { store } from './Redux/Store/Store'
import { LogBox } from 'react-native'

export default class App extends Component {

  render() {

    LogBox.ignoreAllLogs();

    return (
      <Provider store={store}>
        <SplashScreen />
      </Provider>
    )
  }
}