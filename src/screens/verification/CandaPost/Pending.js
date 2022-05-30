import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Switch,
    KeyboardAvoidingView,
    Image,
    BackHandler, Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native'
import signUpScreenStyles from '../../SignUp/SignUpStyle'
import { normalizeX, normalizeY } from "../../../utils/Utils";
import theme from "../../../utils/theme";
import SvgUri from 'react-native-svg-uri';
import Button from '../../../component/common/Button'
import Dash from 'react-native-dash';
import { colorWhiteffffff, ligh_green, mulish_bold } from "../../../utils/Constants";
// import styles from "../../../component/styles/headerComponentStyles";
export default  Pending = (props)=> {
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
        <LinearGradient   colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}  
        style={styles.container}>
        <StatusBar
        barStyle={theme.STATUS_BAR_STYLE}
        backgroundColor={theme.GRADIENT_FIRST_COLOR}/>
        <View style={{flex:0.1}}></View>
        <View style={styles.barcode_container}>
        <Image source={require("../../../assets/images/barcode.png")} style={styles.barcode}/>
    <Text style={styles.barcode_text}>1234567890</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <Dash dashColor="#A1C452" style={{width:"76%", height:2,borderColor:"#A1C452",flexDirection:"row",marginLeft:normalizeX(43)}}/>
        </View>
        <View style={styles.post_container}>
        <Image source={require("../../../assets/images/canada_post.png")} style={[styles.barcode,{borderRadius:10}]}/>
        </View>
    <View style={{flex:0.03}}></View>
        <View style={{flex:0.15,alignItems:"center",marginTop:normalizeY(20),paddingTop:normalizeY(10)}}>
        <Text style={{color:theme.LABEL_COLOR,fontSize:18,fontFamily:mulish_bold}}>
        {`Go to the closest Canada Post 
    to you for free verification. `}
        </Text>
        </View>
        <View style={styles.days_left_container}>
        <View style={{flex:0.9}}>
        <Text style={styles.days_left_text}>Days Left</Text>
        </View>
      <View style={{justifyContent:"flex-end",padding:20,paddingHorizontal:normalizeX(30),
      backgroundColor:colorWhiteffffff,borderRadius:10,elevation:5}}>
      <Text style={{color: ligh_green,fontSize:17,fontFamily: mulish_bold}}>7</Text>
      </View>
        </View>
        <View style={{flex:0.07}}></View>
        <View style={[signUpScreenStyles.button,{marginTop:5,elevation:10}]}>
        <Button style={{marginTop: 10,width:"90%"}} title="Ok!"/>
  
    </View>
      </LinearGradient>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    barcode_container:{
        flex:0.26,
        backgroundColor:theme.BACK_ARROW_BACKGROUND_COLOR,
        borderRadius:20,
        marginHorizontal:normalizeX(20),
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        alignItems:"center",
        
     
    },
        post_container:{
            flex:0.2,
            backgroundColor:theme.BACK_ARROW_BACKGROUND_COLOR,
            borderRadius:20,
            marginHorizontal:normalizeX(20),
            borderTopRightRadius:30,
            borderTopLeftRadius:30,
            alignItems:"center",
           
        },
    barcode:{
        height:80,width:200,backgroundColor:"white",marginTop:normalizeY(20)
    },
    barcode_text:{
        color:theme.LABEL_COLOR,
        marginTop:normalizeY(10),
        paddingTop:normalizeY(10),
        fontSize:17,
        fontFamily:mulish_bold
    },
    days_left_container:{
        flex:0.14,
        backgroundColor:theme.BACK_ARROW_BACKGROUND_COLOR,
        marginHorizontal:normalizeX(20),
        borderRadius:20,
        flexDirection:"row",
        alignItems:"center",
       
    },
    days_left_text:{
        color:theme.LABEL_COLOR,
        marginLeft:normalizeX(10),
        paddingLeft:normalizeX(10),
        fontSize:19,
        fontFamily:mulish_bold
    
    }
})