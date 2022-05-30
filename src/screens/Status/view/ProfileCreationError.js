import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { normalizeFont, normalizeX, normalizeY } from "../../../utils/Utils";
import ForgotPasswordSentStyle from '../../ForgotPassword/ForgotPasswordSentStyle';
import theme from '../../../utils/theme';
import Text from '../../../component/common/Text';
import { wentWrong } from '../../../assets';

export default ForgotPasswordSent = (props) => {

  return (
    <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}
      style={[ForgotPasswordSentStyle.container, { backgroundColor: theme.BACKGROUND_COLOR }]}>
      < StatusBar
        barStyle={theme.STATUS_BAR_STYLE}
        backgroundColor={theme.GRADIENT_FIRST_COLOR}
      />

      <View style={styles.imageContainer}>
        <Image source={wentWrong} resizeMode='cover' style={styles.image} />
      </View>
      <View style={{ flex: 0.3 }}></View>
      <View style={styles.fundRequestedTextContainer}>
        <Text style={styles.fundRequestedText}>Profile creation error</Text>
        <Text style={styles.moneyRequestText}>We could not create your profile.
        please verify your interac code and try again. If the error persists, contact
Plastk at help@plastk.com</Text>
      </View>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({

  imageContainer: {
    flex: 1.4,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: normalizeY(30),
    backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR,
    elevation: 0.6
  },
  fundRequestedTextContainer: {
    alignItems: "center",
    flex: 1
  },
  fundRequestedText: {
    color: theme.LABEL_COLOR,
    fontSize: normalizeFont(20)
  },
  moneyRequestText: {
    color: theme.LABEL_COLOR,
    fontSize: normalizeFont(13),
    marginTop: normalizeY(20)
  },
  image: {
    height: 180,
    width: 180,
  }
})


