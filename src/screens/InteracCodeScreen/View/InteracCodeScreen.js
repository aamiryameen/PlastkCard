import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";
import { normalizeFont, normalizeX, normalizeY } from "../../../utils/Utils";
import LinearGradient from 'react-native-linear-gradient';
import InteracScreen from './InteracScreen';
import HistoryScreen from './HistoryScreen';
import { fetchAccountStatusInteracScreen, resetCompleteStateInteracCodeScreenAction, userResponseReceivedAction } from '../Actions/InteracCodesActions';
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import Text from '../../../component/common/Text'
import { getIsDarkModeEnabled, mulish_regular } from '../../../utils/Constants';
import { logo, logoDark, logoLight } from '../../../assets';
import CustomLoader from '../../../component/common/CustomLoader';


export default InteracCodeScreen = (props) => {

    const myThemeStyle = useTheme();
    const [isHistoryAvailable, setHistoryAvailable] = useState(false)
    const [tabSelectedIndex, setTabSelectedIndex] = useState(0)

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.interacCodesReducer.isLoading)
    const userResponse = useSelector(state => state.interacCodesReducer.userResponse)
    const userResponseReceived = useSelector(state => state.interacCodesReducer.userResponseReceived)

    useEffect(() => {

        dispatch(fetchAccountStatusInteracScreen())

        return function cleanUp() {
            dispatch(resetCompleteStateInteracCodeScreenAction())
        }
    }, [])


    const handleResponse = () => {

        if (userResponse && !userResponseReceived) {
            let codes = userResponse.user.interac_reference_number;

            dispatch(userResponseReceivedAction())
            if (codes && codes.length != 0 && codes[0].length != 0) {
                setHistoryAvailable(true)
            }
            else {
                setHistoryAvailable(false)
            }
        }
    }


    return (
        <LinearGradient colors={[myThemeStyle.colors.DARK_GRADIENT_FIRST_COLOR, myThemeStyle.colors.DARK_GRADIENT_SECOND_COLOR]}
            style={{ flex: 1, }}>


            <View style={{ flex: 1, marginHorizontal: normalizeX(10) }}>

                {isHistoryAvailable ?
                    <View style={[styles.widgetContainerStyle]}>


                        <TouchableOpacity onPress={() => setTabSelectedIndex(0)}>

                            <View style={[styles.pinWidgetStyle, { backgroundColor: tabSelectedIndex === 0 ? '#fecf31' : 'transparent' }]}>

                                <Text style={{ color: tabSelectedIndex === 0 ? "#fff" : myThemeStyle.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(12), fontWeight: '700' }}>Interac Reference Number</Text>

                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity onPress={() => setTabSelectedIndex(1)}>

                            <View style={[styles.fingerPrintWidgetStyle, { backgroundColor: tabSelectedIndex === 1 ? '#fecf31' : 'transparent' }]}>

                                <Text style={{ color: tabSelectedIndex === 1 ? "#fff" : myThemeStyle.colors.LABEL_COLOR, fontFamily: mulish_regular, fontSize: normalizeFont(12), fontWeight: '700' }}>History</Text>


                            </View>

                        </TouchableOpacity>



                    </View>

                    :
                    <View style={{ alignItems: "center", marginTop: normalizeY(10), marginBottom: normalizeY(20) }}>
                        <Image source={getIsDarkModeEnabled() ? logoDark : logoLight} style={{ height: normalizeY(45), width: '100%', resizeMode: 'contain' }} />
                    </View>

                }

                {tabSelectedIndex === 0 ?
                    <InteracScreen isHistoryAvailable={isHistoryAvailable} navigation={props.navigation} />
                    :
                    <HistoryScreen userResponse={userResponse} />
                }




                {handleResponse()}

            </View>


            {isLoading &&
                <CustomLoader />
            }
        </LinearGradient>
    );
}



const styles = StyleSheet.create({

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
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
        marginBottom: normalizeY(10)
    },
    pinWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        marginLeft: normalizeX(10),
        alignItems: 'center',
        justifyContent: "center",
        width: '80%'
    },
    fingerPrintWidgetStyle: {
        flexDirection: 'row',
        borderRadius: 10,
        height: normalizeY(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%'
    }

})
