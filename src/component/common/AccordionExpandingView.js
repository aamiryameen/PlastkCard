import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {mulish_bold, mulish_regular} from '../../utils/Constants';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {normalizeFont, normalizeX} from '../../utils/Utils';
import HTML from 'react-native-render-html';

export default AccordionComponent = (props) => {
  const [activeSections, setActiveSections] = useState([]);

  const myTheme = useTheme();

  const _renderSectionTitle = (section) => {
     return (
      <View style={{padding: 8}}>{/* <Text>{section.content}</Text> */}</View>
    );
  };

  const _renderHeader = (section, index) => {
    return (
      <LinearGradient
        colors={[
          myTheme.colors.CARD_GRADIENT_FIRST_COLOR,
          myTheme.colors.CARD_GRADIENT_SECOND_COLOR,
        ]}
        style={[styles.headerSection]}>
        <Text style={[styles.text, {color: myTheme.colors.LABEL_COLOR}]}>
          {section.question}
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingRight: normalizeX(10),
          }}>
          <AntDesign
            style={{fontFamily: mulish_bold}}
            name={
              activeSections.length > 0 && activeSections[0] === index
                ? 'up'
                : 'down'
            }
            color="#a1c452"
            size={20}
            fontFamily={mulish_bold}
          />
        </View>
      </LinearGradient>
    );
  };

  const _renderContent = (section) => {


    return (
      <LinearGradient
        colors={[
          myTheme.colors.CARD_GRADIENT_FIRST_COLOR,
          myTheme.colors.CARD_GRADIENT_SECOND_COLOR,
        ]}
        style={[
          styles.content,
          {borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR},
        ]}>
        <HTML baseFontStyle={{ color: myTheme.colors.LABEL_COLOR }} source={{html: section.answer}} contentWidth={'90%'} />
      </LinearGradient>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      underlayColor="transparent"
      sections={props.searchResponse}
      activeSections={activeSections}
      renderSectionTitle={_renderSectionTitle}
      renderHeader={(header, index) => _renderHeader(header, index)}
      renderContent={_renderContent}
      onChange={_updateSections}
    />

  );
};

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    paddingVertical: 23,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.1,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },

  text: {
    fontSize: normalizeFont(13),
    fontFamily: mulish_regular,
    marginLeft: normalizeX(10),
    width: '80%',
  },
  content: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    elevation: 5,
    margin: 1,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
});
