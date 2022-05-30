import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, Image,TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {mulish_bold, mulish_regular} from '../../../utils/Constants';
import {
  normalizeX,
  normalizeY,
  normalizeFont,
  openLink,
  logFireBaseEvent,
} from '../../../utils/Utils';
import {useTheme} from '@react-navigation/native';
import Text from '../../../component/common/Text';
import StepsComponent from './StepsComponent';
import StatusHeader from './StatusHeader';
import {fundsSent} from '../../../assets';
import NotchView from '../../../component/common/NotchView';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default FundRequested = (props) => {
  const myTheme = useTheme();

  useEffect(() => {
    logFireBaseEvent('profile_created_screen');
  }, []);
  const copyToClipBoard = () => {
    Clipboard.setString(props.response.user.directCreditId);
    Toast.showWithGravity(
      'Direct payment ID copied to clipboard',
      Toast.SHORT,
      Toast.BOTTOM,
    );
  };
  return (
    <View style={styles.bodyView}>
      <StatusHeader />

      <View
        style={{
          height: 260,
          width: '90%',
          margin: 20,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: myTheme.colors.BACKGROUND_COLOR,
          elevation: 6,
          shadowOpacity: 0.2,
          shadowOffset: {width: 0, height: 0},
        }}>
        <Image
          source={require('../../../assets/images/profile-created-filled.png')}
          style={styles.image}
        />
      </View>

      <View style={{marginLeft: normalizeX(10)}}>
        <StepsComponent current={2} />
      </View>

      <Text
        style={[
          styles.fundRequestedText,
          {color: myTheme.colors.DARK_TEXT_COLOR},
        ]}>
        Profile Created
      </Text>

      <View style={{marginTop: normalizeY(6), marginHorizontal: normalizeX(8)}}>
        <Text
          style={[
            styles.moneyRequestText,
            {color: myTheme.colors.DARK_TEXT_COLOR},
          ]}>
          {
            'We are working on getting your Plastk Secured Credit Card issued as fast as we can, please check back in 24 hours for an update.'
          }
        </Text>
        <Text
          style={[
            styles.moneyRequestText,
            {color: myTheme.colors.DARK_TEXT_COLOR, marginTop: normalizeY(5)},
          ]}>
          To make payments to your account. Please register your Direct Payment
          ID (DPiD) as the Interac e-Transfer payee. The DPiD is unique to your
          account and will post your payment within 30 mins.
        </Text>

        <Text
          style={[
            styles.moneyRequestText,
            {
              color: myTheme.colors.DARK_TEXT_COLOR,
              fontFamily: mulish_regular,
              marginLeft: normalizeX(10),
              marginTop: normalizeY(5),
              textDecorationLine: 'underline',
            },
          ]}>
          Direct Payment ID
        </Text>
        <TouchableOpacity
          style={styles.copyToClipBoard}
          onPress={copyToClipBoard}>
          <Text
            style={[
              styles.moneyRequestText,
              {
                color: myTheme.colors.DARK_TEXT_COLOR,
                fontFamily: mulish_bold,
                marginLeft: normalizeX(10),
                marginTop: normalizeY(5),
              },
            ]}>
            {props.response.user.directCreditId}
          </Text>
          <MaterialIcons
            name={'content-copy'}
            color={myTheme.colors.LABEL_COLOR}
            size={normalizeFont(20, true)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    elevation: 0.2,
    marginHorizontal: normalizeX(14),
  },
  fundRequestedTextContainer: {
    flex: 1,
    paddingVertical: normalizeY(12),
    marginHorizontal: normalizeX(8),
  },
  fundRequestedText: {
    fontFamily: mulish_bold,
    fontSize: normalizeFont(22, true),
    marginHorizontal: normalizeX(8),
    textAlign: 'center',
    marginTop: normalizeY(10),
  },
  moneyRequestText: {
    fontSize: normalizeFont(14),
    fontFamily: mulish_regular,
    marginTop: normalizeY(7),
    marginHorizontal: normalizeX(8),
  },
  stepTitle: {
    fontFamily: mulish_bold,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButtonsView: {
    flex: 1,
    marginTop: normalizeY(15),
    justifyContent: 'space-evenly',
  },
  copyToClipBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
