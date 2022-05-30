import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Text from '../../../../component/common/Text';
import {normalizeFont, normalizeX, normalizeY} from '../../../../utils/Utils';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  getIsDarkModeEnabled,
  mulish_regular,
} from '../../../../utils/Constants';
import {useSelector, useDispatch} from 'react-redux';
import Moment from 'moment';
import {
  fetchMyCardInfoAction,
  fetchPointsInfoAction,
} from '../../../Home/MyCard/Actions/MyCardActions';
import {
  fetchPDFStatementsAction,
  resetPdfStatements,
} from '../Actions/AllStatementsActions';
import Clipboard from '@react-native-community/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const currencyFormatter = require('currency-formatter');

export default CardStatementScreen = (props) => {
  const myTheme = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const lastPaymentDate = useSelector(
    (state) => state.myCardReducer.lastPaymentDate,
  );
  const minPayment = useSelector((state) => state.myCardReducer.minPayment);
  const amountDue = useSelector((state) => state.myCardReducer.amountDue);
  const statementEndDate = useSelector(
    (state) => state.myCardReducer.statementEndDate,
  );

  const response = useSelector(
    (state) => state.allStatementsReducer.pdfStatementResponse,
  );
  const isError = useSelector((state) => state.allStatementsReducer.isError);

  const statusResponse = useSelector(
    (state) => state.accountStatusReducer.response,
  );

  useEffect(() => {
    dispatch(fetchPDFStatementsAction());

    return () => {
      dispatch(resetPdfStatements());
    };
  }, []);

  const copyToClipBoard = () => {
    Clipboard.setString(statusResponse.user.directCreditId);
    Toast.showWithGravity('Direct payment ID copied to clipboard', Toast.SHORT, Toast.BOTTOM);
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchMyCardInfoAction());
    dispatch(fetchPointsInfoAction());

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleResponse = () => {
    if (response) {
      if (response !== '') {
        if (isError) {
          // return (<Modal responseMessage={response.message} modalType={'error'} onPress={() => props.navigation.goBack()} />)
        } else if (response.items.length === 0) {
          return null;
        } else {
          const onPress = () =>
            props.navigation.navigate('PdfViewer', {
              itemID: response.items[0]._id,
            });

          return (
            <TouchableOpacity onPress={onPress} activeOpacity={1}>
              <ImageBackground
                source={
                  getIsDarkModeEnabled()
                    ? require('../../../../assets/images/next_arrow_light.png')
                    : require('../../../../assets/images/next_arrow_dark.png')
                }
                resizeMode="contain"
                style={{width: normalizeX(25), height: normalizeX(25)}}
              />
            </TouchableOpacity>
          );
        }
      }
    }
  };

  return (
    <LinearGradient
      colors={[
        myTheme.colors.DARK_GRADIENT_FIRST_COLOR,
        myTheme.colors.DARK_GRADIENT_SECOND_COLOR,
      ]}
      style={styles.container}>
      <StatusBar
        barStyle={myTheme.colors.STATUS_BAR_STYLE}
        backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          style={styles.allStatementsBtnWrapper}
          onPress={() => props.navigation.navigate('AllStatementsScreen')}
          activeOpacity={1}>
          <LinearGradient
            colors={[
              myTheme.colors.CARD_GRADIENT_FIRST_COLOR,
              myTheme.colors.CARD_GRADIENT_SECOND_COLOR,
            ]}
            style={styles.allStatementsBtn}>
            <Image
              source={require('../../../../assets/images/statement_icon.png')}
              resizeMode="contain"
              style={{width: normalizeX(50), height: normalizeX(50)}}
            />
            <Text
              style={[
                styles.buttonTextStyle,
                {
                  color: myTheme.colors.LABEL_COLOR,
                  textAlign: 'center',
                  marginLeft: normalizeX(10),
                },
              ]}>
              View all Statements
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                source={
                  getIsDarkModeEnabled()
                    ? require('../../../../assets/images/next_arrow_light.png')
                    : require('../../../../assets/images/next_arrow_dark.png')
                }
                resizeMode="contain"
                style={{width: normalizeX(30), height: normalizeX(30)}}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{flexDirection: 'column', marginTop: normalizeY(30)}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.headerTextStyle,
                  {color: myTheme.colors.LABEL_COLOR},
                ]}>
                Current Statement
              </Text>
            </View>

            <View style={{justifyContent: 'center'}}>{handleResponse()}</View>
          </View>

          <Text
            style={[
              styles.titleTextStyle,
              {color: myTheme.colors.LABEL_COLOR, marginTop: normalizeY(20)},
            ]}>
            Statement Date
          </Text>
          <Text
            style={[
              styles.valueTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            {statementEndDate === ''
              ? '-'
              : Moment(statementEndDate).format('MMM DD, YYYY')}
          </Text>

          <View
            style={{
              backgroundColor: '#dcdcdc',
              width: '100%',
              height: normalizeY(1),
            }}
          />

          <Text
            style={[
              styles.titleTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            Payment Due Date
          </Text>
          <Text
            style={[
              styles.valueTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            {lastPaymentDate === ''
              ? '-'
              : Moment(lastPaymentDate).format('MMM DD, YYYY')}
          </Text>

          <View
            style={{
              backgroundColor: '#dcdcdc',
              width: '100%',
              height: normalizeY(1),
            }}
          />

          <Text
            style={[
              styles.titleTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            Minimum Payment
          </Text>
          <Text
            style={[
              styles.valueTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            {currencyFormatter.format(minPayment, {code: 'CAD'})}
          </Text>

          <View
            style={{
              backgroundColor: '#dcdcdc',
              width: '100%',
              height: normalizeY(1),
            }}
          />

          <Text
            style={[
              styles.titleTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            Statement Balance
          </Text>
          <Text
            style={[
              styles.valueTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            {currencyFormatter.format(amountDue, {code: 'CAD'})}
          </Text>

          <View
            style={{
              backgroundColor: '#dcdcdc',
              width: '100%',
              height: normalizeY(1),
            }}
          />

          <Text
            style={[
              styles.titleTextStyle,
              {color: myTheme.colors.LABEL_COLOR},
            ]}>
            Direct Payment ID
          </Text>
          <TouchableOpacity
            style={styles.copyToClipBoard}
            onPress={copyToClipBoard}>
            <Text
              style={[
                styles.valueTextStyle,
                {color: myTheme.colors.LABEL_COLOR},
              ]}>
              {statusResponse && statusResponse.user
                ? statusResponse.user.directCreditId
                : ''}
            </Text>
            <MaterialIcons
              name={'content-copy'}
              color={myTheme.colors.LABEL_COLOR}
              size={normalizeFont(20, true)}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#dcdcdc',
              width: '100%',
              height: normalizeY(1),
            }}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeY(15),
  },
  allStatementsBtnWrapper: {
    marginTop: normalizeY(15),
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
  allStatementsBtn: {
    borderRadius: 16,
    elevation: 3,
    marginHorizontal: normalizeX(3),
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalizeX(10),
  },
  headerTextStyle: {
    fontWeight: '700',
    fontFamily: mulish_regular,
    fontSize: normalizeFont(18),
  },
  titleTextStyle: {
    fontWeight: '600',
    fontFamily: mulish_regular,
    fontSize: normalizeFont(12),
    marginTop: normalizeY(20),
  },
  valueTextStyle: {
    fontWeight: '400',
    fontFamily: mulish_regular,
    fontSize: normalizeFont(16),
    marginTop: normalizeY(8),
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: normalizeFont(15),
  },
  copyToClipBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
