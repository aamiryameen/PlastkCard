import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { WHITE, isIOS } from '../../utils/Constants';
import { useTheme } from '@react-navigation/native';

const NotchView = () => {

  const myTheme = useTheme();

  return (
    isIOS ?
      <View style={[styles.notchView, { backgroundColor: myTheme.colors.NOTCH_COLOR }]} /> :
      null
  );
}

const styles = StyleSheet.create({
  notchView: {
    width: '100%',
    height: hasNotch() ? 35 : 20,
  }
})
export default NotchView;