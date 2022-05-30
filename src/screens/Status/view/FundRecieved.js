import React, { useEffect } from "react";

import {
  View,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { mulish_bold, mulish_regular, colorWhiteffffff } from '../../../utils/Constants';
import { normalizeX, normalizeY, normalizeFont, openLink, logFireBaseEvent, } from "../../../utils/Utils";
import { useTheme } from '@react-navigation/native';
import Text from '../../../component/common/Text';
import StatusHeader from './StatusHeader';
import StepsComponent from './StepsComponent';
import { fundsRequested } from '../../../assets';
import NotchView from "../../../component/common/NotchView";

export default FundRequested = (props) => {

  const myTheme = useTheme();

  const openEmail = (link) => {
    openLink(link);
  }

  useEffect(() => {

    logFireBaseEvent('funds_received_screen')
  }, [])

  return (
    <View style={styles.bodyView}>
      <StatusHeader />

      <View style={{ height: 260, width: "90%", margin: 20, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: myTheme.colors.BACKGROUND_COLOR, elevation: 6, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 0 } }}>
        <Image source={require("../../../assets/images/funds-received-filled.png")} style={styles.image} />
      </View>
      <View style={{ marginLeft: normalizeX(10) }}>
        <StepsComponent current={1} />
      </View>

      <Text style={[styles.fundRequestedText, { color: myTheme.colors.DARK_TEXT_COLOR, }]}>Funds Received</Text>

      <View style={{ marginTop: normalizeY(6), marginHorizontal: normalizeX(8), }}>
        <Text style={[styles.moneyRequestText, { marginTop: 2, color: myTheme.colors.DARK_TEXT_COLOR }]}>{`We are now actively creating your account, we will send you an updated email with your customer number. There is nothing else for you to do except activate your card once you receive it. You will receive your Plastk Secured Credit Card within 10 to 15 business days.`}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
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
    textAlign: "center",
    marginTop: normalizeY(10)

  },
  moneyRequestText: {
    fontSize: normalizeFont(14),
    fontFamily: mulish_regular,

    marginTop: normalizeY(7),
    marginHorizontal: normalizeX(8),
  },
  stepTitle: {
    fontFamily: mulish_bold
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colorWhiteffffff
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  bottomButtonsView: {
    flex: 1,
    marginTop: normalizeY(15),
    justifyContent: 'space-evenly',

  }
})


