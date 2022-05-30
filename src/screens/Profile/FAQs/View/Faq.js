import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {normalizeFont, normalizeX, normalizeY} from '../../../../utils/Utils';
import AccordionComponent from '../../../../component/common/AccordionExpandingView';

import {useSelector, useDispatch} from 'react-redux';
import {
  getAllFAQSAction,
  resetFaqsAction,
  searchFAQSAction,
  resetFAQSByCategory,
} from '../Actions/FaqActions';
import CustomLoader from '../../../../component/common/CustomLoader';
import Text from '../../../../component/common/Text';
import TextInput from '../../../../component/common/TextInput';
import {GENERIC_ERROR, mulish_bold} from '../../../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Snackbar from 'react-native-snackbar';

export default Faq = (props) => {
  const myTheme = useTheme();

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const isLoading = useSelector((state) => state.faqReducer.isLoading);
  const isError = useSelector((state) => state.faqReducer.isError);
  const response = useSelector((state) => state.faqReducer.response);
  const searchResponse = useSelector(
    (state) => state.faqReducer.searchResponse,
  );

  useEffect(() => {
    return () => {
      dispatch(resetFaqsAction());
      Snackbar.dismiss();
    };
  }, []);

  useEffect(() => {
    if (searchText !== '' && searchText !== null && searchText !== undefined) {
      dispatch(searchFAQSAction(searchText));
    } else {
      setTimeout(() => {
        dispatch(getAllFAQSAction());
      }, 1000);
    }
  }, [searchText]);

  const getResponseView = () => {
    if (isError) {
      Snackbar.show({
        text: GENERIC_ERROR,
        duration: Snackbar.LENGTH_INDEFINITE,
        textColor: 'white',
        numberOfLines: 4,
        backgroundColor: 'red',
        action: {
          text: 'X',
          textColor: 'white',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    } else {
      if (response !== '') {
        return response.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() =>
                props.navigation.navigate('FaqCategoryDetail', {
                  categoryName: item.category,
                })
              }>
              <LinearGradient
                colors={[
                  myTheme.colors.CARD_GRADIENT_FIRST_COLOR,
                  myTheme.colors.CARD_GRADIENT_SECOND_COLOR,
                ]}
                style={styles.listItemContainerStyle}>
                <Text
                  style={{
                    color: myTheme.colors.LABEL_COLOR,
                    fontWeight: '700',
                    textAlign: 'center',
                    fontSize: normalizeFont(14),
                  }}>
                  {item.category}
                </Text>

                <AntDesign
                  style={{fontFamily: mulish_bold}}
                  name="right"
                  color="#a1c452"
                  size={20}
                  fontFamily={mulish_bold}
                />
              </LinearGradient>
            </TouchableOpacity>
          );
        });
      } else if (searchResponse !== '' && searchText !== '') {
        if (searchResponse.data.items.length === 0) {
          return (
            <View
              style={{
                marginTop: normalizeY(20),
                marginHorizontal: normalizeX(2),
              }}>
              <Text
                style={{
                  color: myTheme.colors.LABEL_COLOR,
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: normalizeFont(14),
                }}>
                No Results Available
              </Text>
            </View>
          );
        } else {
          return (
            <View
              style={{
                marginTop: normalizeY(10),
                marginHorizontal: normalizeX(2),
                padding:2,
              }}>
              <AccordionComponent searchResponse={searchResponse.data.items} />
            </View>
          );
        }
      } else {
        return null;
      }
    }
  };

  return (
    <LinearGradient
      colors={[
        myTheme.colors.DARK_GRADIENT_FIRST_COLOR,
        myTheme.colors.DARK_GRADIENT_SECOND_COLOR,
      ]}
      style={{flex: 1}}>
      <StatusBar
        barStyle={myTheme.colors.STATUS_BAR_STYLE}
        backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <Text
          style={[
            styles.text,
            {
              fontFamily: mulish_bold,
              fontSize: normalizeFont(18),
              color: myTheme.colors.LABEL_COLOR,
            },
          ]}>
          You Asked, We Answered
        </Text>

        <View style={{marginVertical: normalizeY(10)}}>
          <TextInput
            theme={myTheme}
            placeholder="Looking for Something?"
            placeholderTextColor={myTheme.colors.LABEL_COLOR}
            onChangeText={(text) => setSearchText(text)}
            style={{
              width: '100%',
              color: myTheme.colors.LABEL_COLOR,
              fontSize: normalizeFont(15),
              marginLeft: normalizeX(10),
            }}
          />
        </View>

        {getResponseView()}
      </ScrollView>

      {isLoading && <CustomLoader />}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  push_notification_container: {
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    marginHorizontal: normalizeX(15),
    marginBottom: normalizeY(20),
    
  },
  work_container: {
    borderRadius: 10,
    elevation: 5,
    paddingTop: normalizeY(40),
    paddingBottom: normalizeY(40),
    justifyContent: 'center',
    marginTop: normalizeY(20),
  },

  placeholder_container: {
    marginTop: normalizeY(30),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
  },
  listItemContainerStyle: {
    flex: 1,
    paddingHorizontal: normalizeX(15),
    marginVertical: normalizeY(8),
    paddingVertical: normalizeY(12),
    marginHorizontal: normalizeX(2),
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
