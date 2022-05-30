import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

import { normalizeX, normalizeY, normalizeFont } from "../../../utils/Utils";
import theme from '../../../utils/theme'
import { mulish_bold, mulish_regular, GREY, RED, DARK_GREY, colorWhiteffffff, mulish_medium, ligh_green } from '../../../utils/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Text from '../../../component/common/Text'
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Steps, WingBlank, } from '@ant-design/react-native';
import { useDispatch } from 'react-redux'
import { logoutAppAction } from '../../Splash/Action/SplashAction'
import { useTheme } from '@react-navigation/native';
import NotchView from "../../../component/common/NotchView";

export default ForgotPasswordSent = (props) => {

  const myTheme = useTheme();
  const [steps, setSteps] = useState(
    [
      { title: 'Funds Requested' },
      { title: 'Fund Received' },
      { title: 'Profile Created' },
      { title: 'Card Issued' },
      { title: 'Activate Your Card' }

    ]
  )

  const dispatch = useDispatch()


  return (

    <View style={{ backgroundColor: myTheme.colors.DARK_GRADIENT_FIRST_COLOR }} >
      <NotchView />
      <View style={[styles.headerContainer]}>
        <TouchableOpacity style={styles.textIconContainer} onPress={() => dispatch(logoutAppAction())}>
          <Text style={[styles.logoutText, { color: myTheme.colors.LOGOUT_COLOR }]}>Logout</Text>
          <AntDesign
            name="logout"
            color={myTheme.colors.LOGOUT_COLOR}
            size={18}
            onPress={() => dispatch(logoutAppAction())}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({

  headerContainer: {
    alignItems: "flex-end",
  },
  logoContainer: {
    flex: 0.94
  },
  nameContainer: {
    justifyContent: "center",
    marginTop: normalizeY(10)
  },
  logo: {
    height: 30,
    width: 80,
    margin: 20
  },
  textIconContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginRight: 20
  },
  logoutText: {
    color: RED,
    marginRight: normalizeX(5),
    marginBottom: normalizeX(7),
    fontSize: 17,
    fontFamily: mulish_regular,
    marginTop: normalizeY(-4)
  },
  namContainer: {
    marginTop: normalizeY(12),
    height: normalizeY(40),
    backgroundColor: "red",
    justifyContent: "center",
    marginTop: normalizeY(20)
  },
  setpStyle: {
    marginTop: normalizeY(18),

  },
  stepStartingStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndexStyle: {
    fontSize: 11,
    marginLeft: 3,
    marginTop: -1
  },
  stepTitle: {
    fontSize: normalizeFont(12),

  },
  stepsContainer: {

    marginTop: normalizeY(10),
    marginHorizontal: normalizeX(14),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
})


