import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { normalizeFont, normalizeX, normalizeY } from '../../utils/Utils';
import NotchView from './NotchView';
import { colorWhiteffffff, WHITE } from '../../utils/Constants';
import theme from '../../utils/theme'


export default class Header extends PureComponent {

  render() {
    const { title, onPress, myThemeStyle } = this.props

    return (
      <>
        <NotchView />
        <View style={[styles.headerContainer, { backgroundColor: myThemeStyle.colors.DARK_GRADIENT_FIRST_COLOR }]}>
          <TouchableOpacity style={[styles.backArrow, { backgroundColor: myThemeStyle.colors.BACK_ARROW_BACKGROUND_COLOR }]} onPress={onPress}>
            <Ionicons
              color={myThemeStyle.colors.LABEL_COLOR}
              name="chevron-back"
              size={normalizeFont(24, true)}
            />
          </TouchableOpacity>
          <Text bolder style={[styles.headerText, { color: myThemeStyle.colors.LABEL_COLOR }]}>{title}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: normalizeY(55),
    alignItems: 'center',
  },
  backArrow: {
    width: normalizeY(35),
    height: normalizeY(35),
    borderRadius: 10,
    marginLeft: normalizeX(15),
    alignItems: "center",
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,

  },
  headerText: {
    marginLeft: normalizeX(12),
    fontSize: normalizeFont(14),
    // backgroundColor: 'red'

  }
})
