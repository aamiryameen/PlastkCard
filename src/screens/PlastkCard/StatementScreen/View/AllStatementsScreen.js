import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { normalizeFont, normalizeX, normalizeY, } from '../../../../utils/Utils';
import Text from '../../../../component/common/Text';
import { ligh_green, mulish_bold, } from '../../../../utils/Constants';
import CustomLoader from '../../../../component/common/CustomLoader';
import Modal from '../../../../component/common/Modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PDFStatements = (props) => {

  const myTheme = useTheme();

  const isLoading = useSelector((state) => state.allStatementsReducer.isLoading,);
  const isError = useSelector((state) => state.allStatementsReducer.isError);
  const response = useSelector((state) => state.allStatementsReducer.pdfStatementResponse);


  const ItemView = (items, index) => {

    const onPress = () => props.navigation.navigate('PdfViewer', { itemID: items.item._id });

    return (
      <TouchableOpacity style={styles.statementBtnWrapper} onPress={onPress} activeOpacity={1}>

        <LinearGradient colors={[
          myTheme.colors.PROFILE_SCREEN_START_BUTTON,
          myTheme.colors.PROFILE_SCREEN_END_BUTTON,
        ]}
          style={styles.statementBtn}
          key={index}
        >

          <View style={{ margin: hp('1%'), marginLeft: wp('2%') }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(13) }}> {Moment(items.item.statementBeginDate).format('MMM DD, YYYY')}
            </Text>
          </View>

          <View style={{ justifyContent: "center", flexDirection: 'row', marginLeft: wp('3%'), borderBottomWidth: 1, width: wp('2.5%'), borderBottomColor: myTheme.colors.LABEL_COLOR }} />

          <View style={{ margin: hp('1%'), flex: 0.9, marginLeft: wp('6%') }}>
            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(13) }}>{Moment(items.item.statementEndDate).format('MMM DD, YYYY')} </Text>
          </View>

          <AntDesign
            name={'right'}
            color={ligh_green}
            size={normalizeFont(18, true)}
          />

        </LinearGradient>

      </TouchableOpacity>
    );
  };

  const handleResponse = () => {

    if (response) {

      if (response !== '') {

        if (isError) {

          return (<Modal responseMessage={response.message} modalType={'error'} onPress={() => props.navigation.goBack()} />)
        }

        else if (response.items.length === 0) {

          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: mulish_bold, color: myTheme.colors.LABEL_COLOR }}>No Data Available</Text>
            </View>
          );
        }

        else {
          return (
            <FlatList
              data={response.items}
              contentContainerStyle={{ padding: 5 }}
              keyExtractor={(_, index) => index.toString()}
              renderItem={ItemView}
              style={{ marginTop: hp('2%') }}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={itemSeparatorComponent}
            />
          );
        }
      }
    }
  }

  const itemSeparatorComponent = () => {
    return (
      <View style={{ height: normalizeY(10), width: '100%' }} />
    );
  };

  return (

    <View style={styles.container}>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontFamily: mulish_bold, marginTop: hp('2%'), fontSize: normalizeFont(17), color: myTheme.colors.LABEL_COLOR }}>Statement Period</Text>
      </View>

      {handleResponse()}

      {isLoading && <CustomLoader />}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeX(12),
  },
  statementBtnWrapper: {
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5
  },
  statementBtn: {
    flexDirection: 'row',
    height: hp('9%'),
    alignItems: 'center',
    borderRadius: 12,
    elevation: 5
  },
  startDate: {
    fontFamily: mulish_bold,
  },
});

export default PDFStatements;