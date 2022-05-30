import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { normalizeY, normalizeFont, normalizeX } from '../../utils/Utils';
import Text from './Text';
import { ligh_green, Moderateyellow, WHITE } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@react-navigation/native';



export default GradientButton = (props) => {

  const { title, style, onPress, titleStyle, entypoIcon, materialIconsIcon, foundationIcon, iconStyle, fontistoIcon, fontAwesome5Icon, ionIconsIcon,buttonStyle } = props;
  const iconSize = normalizeFont(23, true);
  const myTheme = useTheme();


  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.button, buttonStyle]}>
      <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={[styles.btnContainer, style]}>

      { fontAwesome5Icon && <FontAwesome5
          name={fontAwesome5Icon}
          color={Moderateyellow}
          size={iconSize}
        />
      }
        {materialIconsIcon && <MaterialIcons
          name={materialIconsIcon}

          color={Moderateyellow}
          size={iconSize}
        />}
        {entypoIcon && <Entypo
          name={entypoIcon}

          color={Moderateyellow}
          size={iconSize}
        />}
        {ionIconsIcon && <Ionicons
          name={ionIconsIcon}

          color={Moderateyellow}
          size={iconSize}
        />}
        {fontistoIcon && <Fontisto
          name={fontistoIcon}

          color={Moderateyellow}
          size={iconSize}
        />}
        {foundationIcon && <Foundation
          name={foundationIcon}
          color={Moderateyellow}
          size={iconSize}
        />}

        <Text style={[styles.btnText, titleStyle]}>{title}</Text>


      </LinearGradient>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    height: normalizeY(45) > 60 ? 60 : normalizeY(45),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
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
    marginLeft: normalizeX(0),
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  
  }
})
