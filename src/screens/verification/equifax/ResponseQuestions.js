import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import signUpScreenStyles from '../../SignUp/SignUpStyle';
import { normalizeX, normalizeY } from "../../../utils/Utils";
import ForgotPasswordSentStyle from '../../ForgotPassword/ForgotPasswordSentStyle';
import theme from "../../../utils/theme";
import Button from '../../../component/common/Button';
import SvgUri from 'react-native-svg-uri';
import { mulish_bold } from "../../../utils/Constants";

const ResponseQuestions = (props) => {

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go Main Screen?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => props.navigation.navigate("Demo") }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]} style={styles.cotainer}>
      <View style={{ flex: 0.1 }}></View>
      <View style={{ alignItems: "center", marginTop: normalizeY(20), paddingTop: normalizeY(10), flex: 0.2 }}>
        <Text style={styles.question}> {`Q1. What Financial 
  Institution provided 
  your Mortgage?`}
        </Text>
      </View>
      <View style={{ flex: 0.4 }}>
        <View style={ForgotPasswordSentStyle.resend_bt_container}>
          <Button style={ForgotPasswordSentStyle.resend_btn}
            titleStyle={{ color: "#000" }}
            title="1.TD Canada Trust" />
        </View>
        <View style={ForgotPasswordSentStyle.resend_bt_container}>
          <Button style={ForgotPasswordSentStyle.signIn}
            titleStyle={[signUpScreenStyles.textSign, {
              color: '#fff'
            }]} title="2. Royal Bank" />

        </View>
        <View style={ForgotPasswordSentStyle.resend_bt_container}>
          <Button style={ForgotPasswordSentStyle.resend_btn}
            titleStyle={{ color: "#000" }}
            title="3. Scotia Bank" />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: normalizeY(10), flex: 0.1 }}>
        <SvgUri source={require("../../../assets/images/progressbar.svg")} resizeMode='cover' width="120" height="120" />
      </View>
      <View style={{ alignItems: "flex-end", marginRight: normalizeX(10), paddingRight: normalizeX(10) }}>
        <Ionicons
          name="chevron-forward"
          color="#F2C94C"
          size={30}
        />
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
  },
  question: {
    marginTop: normalizeY(10),
    fontSize: 18,
    color: theme.LABEL_COLOR,
    fontFamily: mulish_bold
  }
})

export default ResponseQuestions;