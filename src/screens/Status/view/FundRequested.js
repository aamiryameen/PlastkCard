import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { mulish_bold, mulish_regular, ligh_green, isIOS, getIsDarkModeEnabled } from '../../../utils/Constants';
import { normalizeX, normalizeY, normalizeFont, openLink, logFireBaseEvent, } from "../../../utils/Utils";
import Button from '../../../component/common/Button';
import { useTheme } from '@react-navigation/native';
import Text from '../../../component/common/Text';
import StatusHeader from './StatusHeader';
import StepsComponent from './StepsComponent';
import { messageSent } from '../../../assets';
import { bankLogo } from '../../../utils/Helpers/bankLogos'
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import NotchView from "../../../component/common/NotchView";

export default FundRequested = (props) => {

  const myTheme = useTheme();

  const openEmail = (link) => {
    openLink(link);
  }


  const getpackageName = (item) => {

    if (isIOS) {
      openLink(item.imageUrl)
    }

    else {

      IntentLauncher.isAppInstalled(item.packageName)
        .then((result) => {
          IntentLauncher.startAppByPackageName(item.packageName)
            .then((result) => {
              //  console.log('startAppByPackageName started and pkg is installed');
            })
            .catch((error) => console.warn('startAppByPackageName: could not open', error));

        })
        .catch((error) => {
          openLink(item.imageUrl)
          //   console.log("pkg not installed")
        })

    }
  }
  useEffect(() => {

    logFireBaseEvent('funds_requested_screen')
  }, [])


  const getBankLogos = () => {

    return bankLogo.map((items, index) => {

      return (

        <TouchableOpacity key={index} onPress={() => getpackageName(items)} key={index} style={styles.logoContainer}>
          <Image source={getIsDarkModeEnabled() ? items.image_dark : items.image_light} resizeMode="contain" style={{ height: normalizeY(100), width: normalizeX(100), }} key={index} />
        </TouchableOpacity>

      )

    })

  }

  return (

    <View style={styles.bodyView}>
      <StatusHeader />
      <View style={{ height: 260, width: "90%", margin: 20, marginTop: normalizeY(10), borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: myTheme.colors.BACKGROUND_COLOR, elevation: 6, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 0 } }}>
        <Image source={require("../../../assets/images/funds-requested-filled.png")} style={styles.image} />
      </View>
      <View style={styles.body}>

        <View style={{ marginLeft: normalizeX(10) }}>
          <StepsComponent current={0} />
        </View>
        <Text style={[styles.fundRequestedText, { color: myTheme.colors.DARK_TEXT_COLOR }]}>Security Funds Requested</Text>

        <View style={{ marginTop: normalizeY(6), marginHorizontal: normalizeX(8), }}>
          <Text style={[styles.moneyRequestText, { color: myTheme.colors.DARK_TEXT_COLOR }]}>Please send your security deposit to <Text style={{ color: ligh_green, fontFamily: mulish_regular, fontSize: normalizeFont(12) }} onPress={() => openEmail('mailto:securityfunds@plastk.ca')}>securityfunds@plastk.ca</Text> through Interac etransfer.</Text>
          <Text style={[styles.moneyRequestText, { color: myTheme.colors.DARK_TEXT_COLOR }]}>{'Once sent, enter your Interac Reference Number below'}</Text>

        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

          {getBankLogos()}

        </ScrollView>

        <View style={{ marginTop: normalizeY(5), marginLeft: normalizeX(10) }} >
          <Button style={{ width: "91%", borderRadius: 10, marginHorizontal: normalizeX(8) }} onPress={() => { props.props.navigate('InteracCodeScreen', { myThemeStyle: myTheme }) }} title="Enter Interac reference Number" />
        </View>

        <View style={{ marginTop: normalizeY(5), marginHorizontal: normalizeX(8), }}>
          <Text style={[styles.moneyRequestText, { color: myTheme.colors.DARK_TEXT_COLOR }]}>{'*The e-transfer should be recognized as an auto-deposit for "Plastk Financial & Rewards Inc" however if a password is required for the e-transfer please make it "plastk" *'}</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    marginBottom: normalizeY(10)
  },
  imageContainer: {
    justifyContent: "center",
    elevation: 0.2,
    marginHorizontal: normalizeX(14),
  },
  fundRequestedTextContainer: {
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  bottomButtonsView: {
    marginTop: normalizeY(15),
    justifyContent: 'space-evenly',
  },

  logoContainer: {
    marginHorizontal: normalizeX(3),
    height: 120,
    width: 130,
    justifyContent: "center",
    alignItems: "center"
  }
})
