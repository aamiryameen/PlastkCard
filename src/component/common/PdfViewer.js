import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import Pdf from 'react-native-pdf';
import { getBaseUrl } from '../../utils/WebService';
import { GENERIC_ERROR, getAuthenticationToken, ligh_green } from '../../utils/Constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../utils/Utils';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Snackbar from 'react-native-snackbar';
import CustomLoader from './CustomLoader'
import NotchView from './NotchView'

const PdfViewer = (props) => {

  const myTheme = useTheme();

  const [loading, setLoading] = useState(false)

  const { itemID } = props.route.params;
  const uri = getBaseUrl() + 'cards/pdf-statement/' + itemID;
  const headers = { Authorization: 'Bearer ' + getAuthenticationToken() };

  const emailPressed = async () => {
    try {
      let response = ''

      setLoading(true)

      await fetch(getBaseUrl() + 'cards/email-statement/' + itemID, {

        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthenticationToken()
        },
      }
      ).then(data => {
        response = data

      }).catch((error) => {
        console.error('Error:', error);
      });

      setLoading(false)

      let jsonResp = ''

      jsonResp = await response.json()

      if (response.status === 200 && jsonResp.success) {

        logFireBaseEvent('statement_emailed')

        Snackbar.show({
          text: 'A copy of this statement has been sent to your email.',
          duration: Snackbar.LENGTH_INDEFINITE,
          textColor: 'white',
          numberOfLines: 4,
          backgroundColor: ligh_green,
          action: {
            text: 'X',
            textColor: 'white',
            onPress: () => { Snackbar.dismiss() },
          },
        });
      } else {
        Snackbar.show({
          text: GENERIC_ERROR,
          duration: Snackbar.LENGTH_INDEFINITE,
          textColor: 'white',
          numberOfLines: 4,
          backgroundColor: 'red',
          action: {
            text: 'X',
            textColor: 'white',
            onPress: () => { Snackbar.dismiss() },
          },
        });

      }
    } catch (error) {
      Snackbar.show({
        text: GENERIC_ERROR,
        duration: Snackbar.LENGTH_INDEFINITE,
        textColor: 'white',
        numberOfLines: 4,
        backgroundColor: 'red',
        action: {
          text: 'X',
          textColor: 'white',
          onPress: () => { Snackbar.dismiss() },
        },
      });
    }
  }


  useEffect(() => {
    logFireBaseEvent('statement_opened')

    return () => {
      Snackbar.dismiss()
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>

      <NotchView />

      <View style={{ flex: 0.1 }}>

        <View style={[styles.headerContainer, { backgroundColor: myTheme.colors.DARK_GRADIENT_FIRST_COLOR }]}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[styles.backArrow, { backgroundColor: myTheme.colors.BACK_ARROW_BACKGROUND_COLOR }]} onPress={() => props.navigation.goBack()}>
              <Ionicons
                color={myTheme.colors.LABEL_COLOR}
                name="chevron-back"
                size={normalizeFont(24, true)}
              />
            </TouchableOpacity>
            <Text bolder style={[styles.headerText, { color: myTheme.colors.LABEL_COLOR }]}>Statement</Text>
          </View>
          <View style={{ marginRight: normalizeY(10) }}>

            <MaterialCommunityIcons
              name='email-send'
              color={ligh_green}
              size={normalizeFont(25, true)}
              onPress={() => emailPressed()}

            />

          </View>
        </View>

      </View>
      <Pdf
        source={{ uri, headers }}
        style={{ flex: 0.9 }}
      />

      {loading && <CustomLoader />}

    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: normalizeY(55),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backArrow: {
    width: normalizeY(35),
    height: normalizeY(35),
    borderRadius: 10,
    marginLeft: normalizeX(15),
    alignItems: "center",
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  headerText: {
    marginLeft: normalizeX(12),
    fontSize: normalizeFont(14),
    // backgroundColor: 'red',

  }
});

export default PdfViewer;