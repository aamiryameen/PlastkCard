import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';
import { normalizeFont, normalizeX, normalizeY } from "../../utils/Utils";
import OptionalText from './Text';

import TextInputMask from 'react-native-text-input-mask';
import { mulish_regular } from '../../utils/Constants';
import theme from '../../utils/theme';


export default class MaskedTextInput extends PureComponent {

  render() {
    const { icon, iconSize, iconColor, theme, fontawesome, placeholder, keyboardType, autoCapitalize, onChangeText, width, containerStyle, secureTextEntry, materialCommunityIcons, optional, mask, isEditable } = this.props;
    return (
      <View style={[styles.inputContainer, containerStyle]}>
        <View style={styles.textContainer}>
          <Text style={[styles.placeholderText, , { color: theme.colors.TEXTINPUT_LABEL_COLOR }]}>{placeholder}</Text>
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: normalizeX(10), paddingRight: normalizeX(10) }}>
            <OptionalText style={styles.OptionalText}>{optional}</OptionalText>
          </View>
        </View>
        <View style={styles.iconInputContainer}>
          {icon && <MaterialIcons
            name={icon}
            color={theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}
          {fontawesome && <FontAwesome
            name={fontawesome}
            color={theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}
          {materialCommunityIcons && <MaterialCommunityIcons
            name={materialCommunityIcons}
            color={theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}
          <TextInputMask
            {...this.props}
            placeholder={undefined}
            style={[styles.input, { width, color: theme.colors.LABEL_COLOR }]}
            autoCapitalize={autoCapitalize || "none"}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            mask={mask}
            editable={isEditable}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.SEGMENTED_BORDER_COLOR,
    // backgroundColor: 'red',
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  input: {
    flex: 1,
    height: normalizeY(40) > 50 ? 50 : normalizeY(40),
    fontSize: normalizeFont(12.5),
    fontFamily: mulish_regular,

    // backgroundColor: 'red'
  },
  icon: {
    marginRight: 5,
  },
  placeholderText: {
    fontSize: 12,
    color: theme.TEXTINPUT_LABEL_COLOR
  },
  textContainer: {
    flexDirection: "row"
  },
  OptionalText: {
    color: "#a1c452",
    fontFamily: mulish_regular,
    fontSize: 11
  }
})