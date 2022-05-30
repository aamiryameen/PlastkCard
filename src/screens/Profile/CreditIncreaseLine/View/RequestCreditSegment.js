import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Text from "../../../../component/common/Text";
import RequestCredit from './RequestCredit'
import RequestCreditHistory from './RequestCreditHistory'
import { mulish_regular, ligh_green } from "../../../../utils/Constants";
import { normalizeFont, normalizeX, normalizeY } from "../../../../utils/Utils"
import { useDispatch } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo';
import DialogModal from '../../../../component/common/DialogModal';
import { resetRequestCreditIncreaseCompleteAction } from "../Actions/CreditIncreaseLineActions";


export default RequestCreditIncrease = (props) => {


    const [showInfoModal, setShouldShowInfoModal] = useState(false)
    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)

    const myTheme = useTheme();

    const showSelectedScreen = () => {
        if (tabSelectedIndex === 0) {
            return (<RequestCredit navigation={props.navigation} />)
        }
        else if (tabSelectedIndex === 1) {
            return (<RequestCreditHistory />)
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
      
        return function cleanUp() {
            dispatch(resetRequestCreditIncreaseCompleteAction())
        }
     

    }, [])

const positiveButtonPressed = () => {
    if(showInfoModal){
        setShouldShowInfoModal(false)
    }
    
}

    const handleModal = () => {

        if (showInfoModal) {
            let msg = '1- Send your Security Funds to securityfunds@plastk.ca \n2- Verify your security funds here with your Interac e-Transfer Number. Once completed expect to have your increase approved with in 2 hours.'
            return (<DialogModal message={msg} modalType='info' buttons={['OK']}
                positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
        }
    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={styles.gradientContainerStyle}>
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />
            <View style={{ alignItems: "flex-end", marginRight: normalizeX(10), marginTop: 0, }}>
                <Entypo
                    name='help-with-circle'
                    color={ligh_green}
                    size={30}
                    onPress={() => setShouldShowInfoModal(!showInfoModal)}

                />
            </View>
            <View style={{ alignItems: "center", marginTop: normalizeY(20) }}>

                <View style={[styles.widgetContainerStyle]}>

                    <TouchableOpacity onPress={() => setTabSelectedIndex(0)}>

                        <View style={[styles.pinWidgetStyle, { backgroundColor: tabSelectedIndex === 0 ? '#fecf31' : 'transparent' }]}>
                            <Text style={{ color: tabSelectedIndex === 0 ? "#fff" : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>Credit Limit</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTabSelectedIndex(1)}>

                        <View style={[styles.fingerPrintWidgetStyle, { backgroundColor: tabSelectedIndex === 1 ? '#fecf31' : 'transparent' }]}>
                            <Text style={{ color: tabSelectedIndex === 1 ? "#fff" : myTheme.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(14) }}>History</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            {showSelectedScreen()}
            {handleModal()}
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    bottomButtonsView: {
        marginTop: normalizeY(15),
        flex: 0.3
    },
    gradientContainerStyle: {
        flex: 1,
        paddingHorizontal: normalizeX(10),
        paddingTop: normalizeY(10),
    },
    widgetContainerStyle: {
        borderWidth: 1,
        borderColor: '#dfe1e9',
        borderRadius: 16,
        flexDirection: 'row',
        height: normalizeY(60),
        paddingHorizontal: normalizeX(10),
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '95%'
    },
    pinWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        marginLeft: normalizeX(10),
        alignItems: 'center',
        justifyContent: "center",
        width: '85%'
    },
    fingerPrintWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginLeft: normalizeX(8)
    }

})

