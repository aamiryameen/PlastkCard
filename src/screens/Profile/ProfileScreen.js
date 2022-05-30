import React, { useEffect, useState } from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { Title, Caption } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { logoutAppAction } from '../../screens/Splash/Action/SplashAction'
import { getDataFromUserDefaults, logFireBaseEvent, normalizeFont, normalizeX, normalizeY, } from "../../utils/Utils";
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Text from '../../component/common/Text'
import { colorBlack, getIsDarkModeEnabled, isAndroid, IS_FINGER_PRINT_LOGIN_REGISTERED, IS_PIN_CODE_LOGIN_REGISTERED, ligh_green, mulish_bold, } from "../../utils/Constants";
import GradientButton from "../../component/common/GradientButton";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { resetProfileScreen, updateProfilePictureAction } from "./ProfileActions/ProfileActions";
import CustomLoader from '../../component/common/CustomLoader'
import Modal from '../../component/common/Modal'
import { getAccountStatusAction, resetAccountStatusScreen } from "../Status/action/StatusAction";
import BottomTab from '../../component/BottomTab/CustomBottomTabBar'
import Dialog from '../../component/common/Dialog'

export default ProfileScreen = (props) => {

  const myTheme = useTheme();

  const dispatch = useDispatch()

  const [isFingerPrintLoginRegistered, setIsFingerPrintRegistered] = useState(true)
  const [isPINLoginRegistered, setIsPINRegistered] = useState(true)

  const [showDialogModal, setShowDialogModal] = useState(false)

  const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(true)

  const response = useSelector(state => state.accountStatusReducer.response)

  const isLoading = useSelector(state => state.profileReducer.isLoading)
  const profileResponse = useSelector(state => state.profileReducer.response)

  useEffect(() => {

    FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => {
        setIsFingerPrintSupported(true)
      })
      .catch(error => {
        if (error.name === 'FingerprintScannerNotSupported' || error.name === 'FingerprintScannerNotAvailable') {
          setIsFingerPrintSupported(false)
        }
      });

    (async () => {

      setIsFingerPrintRegistered(await getDataFromUserDefaults(IS_FINGER_PRINT_LOGIN_REGISTERED))

      setIsPINRegistered(await getDataFromUserDefaults(IS_PIN_CODE_LOGIN_REGISTERED))
    })()

  }, [])

  const cameraSelected = () => {
    if (isAndroid)
      setShowDialogModal(false)

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      dispatch(updateProfilePictureAction(image.path, image.mime))
    }).catch(e => {
      console.log(e);
    });

  }

  const gallerySelected = () => {
    if (isAndroid)
      setShowDialogModal(false)

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      dispatch(updateProfilePictureAction(image.path, image.mime))
    }).catch(e => {
      console.log(e)
    });

  }

  const showOptionsModal = () => {
    if (showDialogModal) {
      return (<Dialog message={'Select Profile Picture'} buttons={['camera', 'images']}
        cameraSelected={cameraSelected} gallerySelected={gallerySelected} onPress={() => setShowDialogModal(false)} />)
    }
  }

  const handleProfileResponse = () => {

    if (profileResponse) {

      if (profileResponse.error) {
        return (
          <Modal responseMessage={profileResponse.message} modalType="error" onPress={() => dispatch(resetProfileScreen())} />
        )
      } else {

        logFireBaseEvent('profile_picture_updated')
        dispatch(resetProfileScreen())

        setTimeout(() => {

          dispatch(getAccountStatusAction())

        }, 150);
      }

    }

  }


  const getPictureOrAvatar = () => {

    if (response && response.user && response.user.hasOwnProperty('picture_url')) {
      return (
        <Avatar.Image size={80} source={{ uri: response.user.picture_url }} />
      )
    } else {

      if (response && response.user && response.user.gender === "M")
        return (<Avatar.Image size={80} source={require('../../assets/images/male.png')} backgroundColor="black" />)
      else
        return (<Avatar.Image size={80} source={require('../../assets/images/female.png')} />)

    }
  }

  return (

    <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
      style={styles.container}>

      <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: normalizeY(40) }}>

        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={() => setShowDialogModal(true)}>
            {getPictureOrAvatar()}

            <View style={[styles.cameraIconStyle, { backgroundColor: getIsDarkModeEnabled() ? '#404968' : '#fff' }]}>
              <Ionicons
                name={'camera-outline'}

                color={ligh_green}
                size={normalizeFont(20)}
              />
            </View>

          </TouchableOpacity>


          <View style={styles.nameContainer}>
            <Title style={[styles.name, { color: myTheme.colors.LABEL_COLOR }]}>{(response && response.user) ? response.user.first_name : '' + " " + (response && response.user) ? response.user.last_name : ''}</Title>
            <Text style={[styles.captionStyle, { color: myTheme.colors.LABEL_COLOR }]}>{(response && response.user) ? response.user.email : ''}</Text>
          </View>
        </View>

        <View style={styles.body}>

          <View style={{ ...styles.profileContainer, marginTop: 0 }}>
            <GradientButton onPress={() => props.navigation.navigate("ProflieInfo")}
              style={styles.style} fontAwesome5Icon="user-alt" titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
              title="My Card Info" />
          </View>

          <View style={{ ...styles.profileContainer, marginTop: normalizeY(10) }}>
            <GradientButton onPress={() => props.navigation.navigate("ChangePassword")}
              style={styles.style} titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
              title="Change Password" entypoIcon="lock" />
          </View>
          {/* <View style={{ ...styles.profileContainer, marginTop: normalizeY(10) }}>
            <GradientButton onPress={() => props.navigation.navigate("ChangeAddress")}
              style={styles.style} titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
              title="Change Address" materialIconsIcon='location-on' />
          </View> */}

          {(isPINLoginRegistered === undefined) ?

            <View style={styles.profileContainer}>
              <GradientButton titleStyle={styles.titleStyle} onPress={() => props.navigation.navigate("SetPin")}
                style={[styles.style,]} materialIconsIcon="lock-outline" titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
                title="Set Code" />
            </View> :
            <View style={styles.profileContainer}>
              <GradientButton titleStyle={styles.titleStyle} onPress={() => props.navigation.navigate("ChangePinCode")}
                style={[styles.style,]} entypoIcon="lock" titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
                title="Change Code" />
            </View>
          }

          {(isFingerPrintLoginRegistered === undefined && isFingerPrintSupported)
            ?
            <View style={styles.profileContainer}>
              <GradientButton titleStyle={styles.titleStyle} onPress={() => props.navigation.navigate("SetFingerprint")}
                style={[styles.style,]} ionIconsIcon="finger-print-sharp" titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
                title="Set Fingerprint" />
            </View>
            :
            null
          }

          <View style={{ ...styles.profileContainer, marginTop: normalizeY(10) }}>
            <GradientButton onPress={() => props.navigation.navigate("RequestCreditSegment")}
              style={{ ...styles.style, height: normalizeY(50) }} titleStyle={[styles.textTitleStyle, { color: myTheme.colors.LABEL_COLOR }]}
              title="Credit Limit Increase" fontAwesome5Icon="comment-dollar" />
          </View>
          <View style={{ ...styles.profileContainer, marginTop: normalizeY(20), width: '100%', marginBottom: 10 }}>
            <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON,]} style={styles.logoutBtnGradient} >
              <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(logoutAppAction())}>
                <Text style={styles.logoutText}>Log out</Text>
                <View style={styles.logoutIconContainer}>
                  <MaterialCommunityIcons
                    name="logout"
                    color="#fe5c31"
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>


        </View>


        {showOptionsModal()}
        {handleProfileResponse()}

        {
          isLoading &&
          <CustomLoader />
        }

      </ScrollView>


      <BottomTab navigation={props.navigation} />
    </LinearGradient >
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    opacity: 1
  },
  name: {
    fontFamily: mulish_bold,
    color: colorBlack,
    fontSize: normalizeFont(13)
  },
  nameContainer: {
    paddingLeft: normalizeX(10),
    marginTop: normalizeX(5)

  },
  textTitleStyle: {
    fontSize: normalizeFont(13),
    marginLeft: normalizeX(30),
    fontFamily: mulish_bold,
  },
  linearGradient: {
    flex: 1,
  },
  style: {
    flexDirection: "row",
    height: normalizeY(50),
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: normalizeX(30),
  },
  profileImageContainer: {
    marginTop: normalizeY(20),
    marginLeft: normalizeX(30),
    flexDirection: "row"
  },
  captionStyle: {
    color: "#000",
    fontSize: 14,
    marginTop: (-5)
  },
  body: {
    marginTop: normalizeY(30),
    width: '80%',
    alignContent: 'center',
    marginLeft: normalizeX(30),
    flex: 1

  },
  profileContainer: {
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    marginTop: normalizeY(10)
  },
  titleStyle: {
    paddingLeft: normalizeX(20),
    marginLeft: normalizeX(20),
    fontFamily: mulish_bold,
    fontSize: normalizeFont(16),
    color: "#000"
  },
  darkModeText: {
    paddingLeft: normalizeX(0),
    marginLeft: normalizeX(25),
    fontFamily: mulish_bold,
    fontSize: normalizeFont(13),

  },
  switchContainer: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "flex-end",
    paddingRight: normalizeX(10)
  },
  logoutText: {
    fontFamily: mulish_bold,
    fontSize: normalizeFont(13),
    color: "#fe5c31",
    alignItems: "flex-start",
    flex: 1,
    marginLeft: normalizeX(20)
  },
  logoutIconContainer: {
    alignItems: "flex-end",
    paddingRight: normalizeX(20),
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  logoutBtnGradient: {
    elevation: 4,
    borderRadius: 16,
    height: 60,
    marginTop: normalizeY(15),
  },
  cameraIconStyle: {
    borderRadius: 50,
    width: normalizeFont(30, true),
    height: normalizeFont(30, true),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 55,
    top: 55
  }
})

