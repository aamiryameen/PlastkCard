import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
  import React, { useEffect, useState } from 'react';
  import { View, StyleSheet, TouchableOpacity } from 'react-native';
  import {
    Avatar,
    Title,
    Caption,
    Text,
  } from 'react-native-paper';
  import { useTheme } from '@react-navigation/native';
  import {  mulish_bold, mulish_regular } from '../../utils/Constants';
  import LinearGradient from 'react-native-linear-gradient';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { useSelector, useDispatch } from 'react-redux'
  import { logoutAppAction } from '../../screens/Splash/Action/SplashAction'
  import { normalizeFont, normalizeY, normalizeX } from '../../utils/Utils';
  import GradientButton from '../common/GradientButton';
  
  
  
  
  
  export default FCSDrawerContent = (props) => {
  
    const dispatch = useDispatch()
    const response = useSelector(state => state.fcsDashBoardReducer.response)
    const myTheme = useTheme();
  
  
    return (
      <LinearGradient colors={[myTheme.colors.DRWAER_FIRST_COLOR, myTheme.colors.DRWAER_SECOND_COLOR]}
        style={{ flex: 1 }}>
  
  
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'column', marginTop: 15, alignItems: "center", paddingTop: 20 }}>
               
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                  <Title style={[styles.title, { color: myTheme.colors.LABEL_COLOR }]}>{ (response ? (response.user.first_name + " " + response.user.last_name) : '')}</Title>
                  <Caption style={[styles.caption, { color: myTheme.colors.LABEL_COLOR }]}>{response ? response.user.email : ''}</Caption>
                </View>
              </View>
              <View style={styles.btn_item_container}>
                <View style={styles.btn_container} >
                  <GradientButton title="Home" titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles} onPress={() => props.navigation.navigate("FCSDashBoard")} />
  
                </View>
                <View style={styles.btn_container} >
                  <GradientButton title="Profile" titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles} onPress={() => props.navigation.navigate("FCSProfile")} />
  
                </View>
  
                <View style={styles.btn_container}>
                  <GradientButton title="Settings" onPress={() => props.navigation.navigate("Settings")} titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles} />
  
                </View>
               {/*  <View style={styles.btn_container}>
                  <GradientButton title="Feedback" onPress={() => props.navigation.navigate("Feedback")} titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles} />
  
                </View> */}
  
                <View style={styles.btn_container}>
                  <GradientButton title="Help" titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles}
                    onPress={() => props.navigation.navigate("Help")}
                  />
                </View>
  
                {/* <View style={styles.btn_container}>
                  <GradientButton title="Legal" titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles}
                    onPress={() => props.navigation.navigate("Legal")} />
  
                </View> */}
  
                <View style={styles.btn_container}>
                  <GradientButton title="About Us" titleStyle={{ color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_bold }} style={styles.gradientBtnStyles}
                    onPress={() => props.navigation.navigate("CmsContent", { slugName: "aboutus" })} />
  
                </View>
  
  
                <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON,]} style={styles.logoutBtnGradient} >
                  <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(logoutAppAction())}>
                    <Text style={styles.logoutText}>Log out</Text>
                    <View style={styles.logoutIconContainer}>
                      <MaterialCommunityIcons
                        name="logout"
                        color="#fe5c31"
                        size={22}
                      />
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
  
              </View>
  
  
            </View>
  
          </View>
        </DrawerContentScrollView>
  
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
  
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      fontFamily: mulish_bold
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      marginLeft: 0,
      fontFamily: mulish_regular
  
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    btn_item_container: {
      marginTop: 30,
      marginVertical: normalizeY(17)
    },
    btn_style: {
      height: 50, width: "85%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
  
    },
    btn_container: {
      alignItems: "center",
      marginTop: normalizeY(10),
    },
    text: {
      fontFamily: mulish_bold,
      fontSize: normalizeFont(12)
  
    },
    logoutText: {
      fontFamily: mulish_bold,
      fontSize: normalizeFont(13),
      color: "#fe5c31",
      alignItems: "flex-start",
      flex: 1,
      marginLeft: normalizeX(15)
    },
    logoutIconContainer: {
      alignItems: "flex-end",
      paddingRight: normalizeX(20),
    },
    logoutBtnGradient: {
      elevation: 3,
      marginLeft: normalizeX(17),
      borderRadius: 16,
      width: "85%",
      height: 50,
      marginTop: normalizeY(50),
    },
    logoutButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    },
    gradientBtnStyles: {
      width: "85%",
      height: 50,
      elevation: 3
    },
    profileContainer: {
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 0 },
      alignItems: "center",
      marginTop: normalizeY(10)
    },
    switchContainer: {
      justifyContent: "flex-end",
      flex: 1,
      alignItems: "flex-end",
      paddingRight: normalizeX(10)
    },
    darkModeText: {
      fontFamily: mulish_bold,
      fontSize: normalizeFont(12),
      textAlign: 'center'
  
    },
    style: {
      flexDirection: "row",
      width: "85%",
      height: normalizeY(50),
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: normalizeX(30),
    },
  
  });
  