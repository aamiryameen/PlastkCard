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
    BackHandler, Alert
} from 'react-native';
import headerComponentStyles from '../../../component/styles/headerComponentStyles'
import signUpScreenStyles from '../../SignUp/SignUpStyle'
import theme from "../../../utils/theme";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { normalizeX, normalizeY } from "../../../utils/Utils";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../component/common/Button'
import { mulish_regular } from "../../../utils/Constants";

export default TermsOfService = (props) => {

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
        <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}   style={[signUpScreenStyles.container, { backgroundColor: theme.BACKGROUND_COLOR ,}]}>
               < StatusBar
                barStyle={theme.STATUS_BAR_STYLE}
                backgroundColor={theme.GRADIENT_FIRST_COLOR}
            /> 
              
                <LinearGradient colors={[theme.GRADIENT_FIRST_COLOR, theme.GRADIENT_SECOND_COLOR]}    style={[headerComponentStyles.header, { backgroundColor: theme.BACKGROUND_COLOR,marginTop:normalizeY(30)}]}>
                    <View style={[headerComponentStyles.backArrow, { backgroundColor: theme.BACK_ARROW_BACKGROUND_COLOR }]}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("SignIn")}>
                            <Ionicons
                                name="chevron-back"
                                color={theme.LABEL_COLOR}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={[headerComponentStyles.headerText, { color: theme.LABEL_COLOR }]}>Terms Of Service</Text>
                </LinearGradient>
       

<View style={{flex:0.85,paddingHorizontal:normalizeX(20),paddingTop:normalizeY(30),paddingBottom: normalizeY(20) ,borderRadius:10}}> 
<ScrollView indicatorStyle ="white" style={{borderRadius:10 }}>
  
    <Text style={{fontFamily:mulish_regular,fontSize:16,color:theme.LABEL_COLOR,margin:10}}>{`Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Risus
risus mauris cursus donec urna
tristique dictum volutpat. Metus,
tempus ut quisque in tincidunt
tristique nisi mi. Sed et vel nunc
nullam maecenas. Nec at nunc lacus
massa gravida mus et.

Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Risus
risus mauris cursus donec urna
tristique dictum volutpat. Metus,
tempus ut quisque in tincidunt
tristique nisi mi. Sed et vel nunc
nullam maecenas. Nec at nunc lacus
massa gravida mus et.

Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Aliquam,
suspendisse risus, turpis sed turpis
urna neque. Dictumst purus diam
venenatis pretium adipiscing turpis
risus donec consectetur. Augue sit
enim a, commodo ac tincidunt quis
risus pellentesque. Fusce vel feugiat
rhoncus malesuada. Est venenatis sit
egestas ullamcorper.`}</Text>
</ScrollView>
</View>
<View style={[signUpScreenStyles.button, { marginTop: 5, width:"90%", paddingTop: 0 }]}>
<Button style={{marginTop: 10}} title="Acknowledge!"/>
                        
                    </View>
            </LinearGradient>
    )
}