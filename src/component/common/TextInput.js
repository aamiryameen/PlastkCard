import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';
import { normalizeFont, normalizeX, normalizeY } from "../../utils/Utils";
import OptionalText from './Text';
import { mulish_regular, ligh_green } from '../../utils/Constants';

export default class TextInput extends PureComponent {

 
  render() {
    const { icon, iconSize,theme, fontawesome, placeholder,ionicons,antDesign,downIcon ,keyboardType, placeholderText,autoCapitalize, onChangeText, width,onPress,containerStyle, secureTextEntry, materialCommunityIcons, optional, defaultValue, isEditable, maxLength } = this.props;

    let editable = isEditable === undefined ? true : isEditable

    let maxLen = maxLength === undefined ? 100 : maxLength
        
    return (
      <View style={[styles.inputContainer, containerStyle]}>
        <View style={styles.textContainer}>
          <Text style={[styles.placeholderText,{color: theme.colors.TEXTINPUT_LABEL_COLOR}]}>{placeholder}</Text>
          <View style={{ flex: 1, alignItems: "flex-end", marginRight: normalizeX(10), paddingRight: normalizeX(10) }}>
            <OptionalText style={styles.OptionalText}>{optional}</OptionalText>
          </View>
        </View>
        <View style={styles.iconInputContainer}>
          {icon && <MaterialIcons
            name={icon}
            color= {theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}
          {fontawesome && <FontAwesome
            name={fontawesome}
            color= {theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}
          {materialCommunityIcons && <MaterialCommunityIcons
            name={materialCommunityIcons}
            color= {theme.colors.LABEL_COLOR}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}
          <RNTextInput
            {...this.props}
            placeholder={placeholderText}
          placeholderTextColor={theme.colors.LABEL_COLOR }
            style={[styles.input, { width, color: theme.colors.LABEL_COLOR  }]}
            autoCapitalize={autoCapitalize || "none"}
            onChangeText={onChangeText}
            secureTextEntry={ secureTextEntry  }
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            editable={editable}
            maxLength={maxLen}
          />
        {downIcon && <AntDesign
            name={downIcon}
            color= {ligh_green}
            size={iconSize || normalizeFont(16, true)}
            style={styles.icon}
          />}

          <TouchableOpacity onPress ={onPress} >
          {
        secureTextEntry   ? 
        <Ionicons
        name={ionicons}
            color="#e6e6e6"
            size={20}
        />
        :
        <AntDesign
        name={antDesign}
            color="#e6e6e6"
            size={20}
        />
      }
          </TouchableOpacity>

            
                                     
                                      
                                
               
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
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
    color: 'grey',
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