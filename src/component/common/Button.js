import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../utils/theme'
import { normalizeY, normalizeFont, normalizeX } from '../../utils/Utils';
import Text from './Text';
import { colorWhiteffffff, ligh_green, Moderateyellow, WHITE } from '../../utils/Constants';

export default class Button extends PureComponent {
  render() {
    const { title, style, onPress, titleStyle, appTheme, entypoIcon, materialIconsIcon, foundationIcon, iconStyle, fontistoIcon, fontAwesome5Icon, ionIconsIcon, disabled } = this.props;
    const iconSize = normalizeFont(15);
    return (
      <TouchableOpacity onPress={onPress} style={[styles.btnContainer, style]} disabled={disabled}>
        <View style={styles.iconView}>
          {fontAwesome5Icon && <FontAwesome5
            name={fontAwesome5Icon}
            style={styles.icon}
            color={Moderateyellow}
            size={iconSize}
          />}
          {materialIconsIcon && <MaterialIcons
            name={materialIconsIcon}
            style={styles.icon}
            color={Moderateyellow}
            size={iconSize}
          />}
          {entypoIcon && <Entypo
            name={entypoIcon}
            style={styles.icon}
            color={Moderateyellow}
            size={iconSize}
          />}
          {ionIconsIcon && <Ionicons
            name={ionIconsIcon}
            style={styles.icon}
            color={Moderateyellow}
            size={iconSize}
          />}
          {fontistoIcon && <Fontisto
            name={fontistoIcon}
            style={styles.icon}
            color={Moderateyellow}
            size={iconSize}
          />}
          {foundationIcon && <Foundation
            name={foundationIcon}
            style={styles.icon}
            color={Moderateyellow}
            size={iconSize}
          />}
        </View>
        <Text style={[styles.btnText, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    height: normalizeY(45) > 60 ? 60 : normalizeY(45),
    backgroundColor:  ligh_green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 }

  },
  btnText: {
    color: WHITE,
  },
  iconView: {
    // marginRight: 6
  },
  icon: {
    marginLeft: normalizeX(0)
  }
})
