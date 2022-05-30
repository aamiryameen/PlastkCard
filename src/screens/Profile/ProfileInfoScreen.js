import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeFont, normalizeX, normalizeY} from '../../utils/Utils';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Text from '../../component/common/Text';
import {useTheme} from '@react-navigation/native';
import {
  getIsFreeUser,
  mulish_medium,
  mulish_regular,
} from '../../utils/Constants';
import {profile} from '@assets';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default ProfileInfoScreen = (props) => {
  const response = getIsFreeUser()
    ? useSelector((state) => state.fcsDashBoardReducer.response)
    : useSelector((state) => state.accountStatusReducer.response);

  const myTheme = useTheme();

  const copyToClipBoard = () => {
    Clipboard.setString(response.user.directCreditId);
    Toast.showWithGravity(
      'Direct payment ID copied to clipboard',
      Toast.SHORT,
      Toast.BOTTOM,
    );
  };

  const getPictureOrAvatar = () => {
    if (getIsFreeUser()) {
      return null;
    } else {
      if (
        response &&
        response.user &&
        response.user.hasOwnProperty('picture_url')
      ) {
        return (
          <Avatar.Image size={110} source={{uri: response.user.picture_url}} />
        );
      } else {
        if (response && response.user && response.user.gender === 'M')
          return (
            <Avatar.Image
              size={110}
              source={require('../../assets/images/male.png')}
              backgroundColor="black"
            />
          );
        else
          return (
            <Avatar.Image
              size={110}
              source={require('../../assets/images/female.png')}
            />
          );
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

      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: normalizeY(5)}}>
          {getPictureOrAvatar()}
        </View>

        <View style={styles.body}>
          <Text
            style={[
              styles.placeholder,
              {color: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            First Name
          </Text>
          <View
            style={[
              styles.placeholderContainer,
              {
                borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR,
                marginTop: normalizeY(20),
              },
            ]}>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.first_name : ''}
            </Text>
          </View>

          <Text
            style={[
              styles.placeholder,
              {color: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            Last Name
          </Text>
          <View
            style={[
              styles.placeholderContainer,
              {borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.last_name : ''}
            </Text>
          </View>

          <Text
            style={[
              styles.placeholder,
              {color: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            Email
          </Text>
          <View
            style={[
              styles.placeholderContainer,
              {borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.email : ''}
            </Text>
          </View>

          <Text
            style={[
              styles.placeholder,
              {color: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            Phone
          </Text>
          <View
            style={[
              styles.placeholderContainer,
              {borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.phone_number : ''}
            </Text>
          </View>

          <Text
            style={[
              styles.placeholder,
              {color: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            Address
          </Text>
          <View
            style={[
              styles.placeholderContainer,
              {borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR},
            ]}>
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <Text
                style={[
                  styles.placeholderText,
                  {color: myTheme.colors.LABEL_COLOR},
                ]}>
                {response && response.user ? response.user.suite_number : ''}
              </Text>
              <Text
                style={[
                  styles.placeholderText,
                  {
                    color: myTheme.colors.LABEL_COLOR,
                    marginLeft: normalizeX(6),
                  },
                ]}>
                {response && response.user
                  ? response.user.street_address
                  : '' + '.'}
              </Text>
            </View>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.city : '' + ','}
            </Text>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.province : ''}
            </Text>
            <Text
              style={[
                styles.placeholderText,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {response && response.user ? response.user.postal_code : ''}
            </Text>
          </View>

          {!getIsFreeUser() && (
            <View>
              <Text
                style={[
                  styles.placeholder,
                  {color: myTheme.colors.TEXTINPUT_LABEL_COLOR},
                ]}>
                Direct Payment ID
              </Text>
              <TouchableOpacity
                onPress={copyToClipBoard}
                style={[
                  styles.placeholderContainer,
                  {borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR},
                ]}>
                <Text
                  style={[
                    styles.placeholderText,
                    {color: myTheme.colors.LABEL_COLOR},
                  ]}>
                  {response && response.user
                    ? response.user.directCreditId
                    : ''}
                </Text>
                <MaterialIcons
                  name={'content-copy'}
                  color={myTheme.colors.LABEL_COLOR}
                  size={normalizeFont(20, true)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fingerprint_signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  body: {
    marginHorizontal: normalizeX(10),
    marginBottom: normalizeY(20),
  },
  placeholderContainer: {
    marginLeft: normalizeX(10),
    borderBottomWidth: 0.8,
    width: '90%',
    marginTop: normalizeY(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontFamily: mulish_medium,
    fontSize: normalizeFont(12),
    marginLeft: normalizeX(10),
    marginTop: normalizeY(20),
  },
  placeholderText: {
    fontFamily: mulish_regular,
    fontSize: normalizeFont(16),
    marginBottom: 1,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '90%',
    marginLeft: normalizeX(10),
    borderRadius: 10,
    elevation: 5,
    marginTop: normalizeY(20),
  },
  passwordText: {
    alignItems: 'flex-start',
    marginHorizontal: normalizeX(5),
    flex: 0.95,
    fontSize: normalizeFont(15),
    fontWeight: '600',
    fontFamily: mulish_regular,
    marginLeft: normalizeX(20),
  },
  iconStyle: {
    alignItems: 'flex-start',
    marginTop: normalizeY(1),
  },
});
