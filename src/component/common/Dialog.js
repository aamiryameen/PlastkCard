import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    StatusBar,
    TouchableOpacity
} from "react-native";

import { getIsDarkModeEnabled, ligh_green, mulish_bold } from '../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../utils/Utils';
import Text from './Text';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';



export default DialogModal = (props) => {


    const myTheme = useTheme();
    const [isVisible, setVisible] = useState(true)
    const [closeButtton, setCloseButton] = useState(true)

    const getButtons = () => {

        return (

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={{ ...styles.iconContainer, marginRight: normalizeX(17) }} onPress={() => props.cameraSelected()}>
                    <Entypo color={ligh_green} size={30} name={props.buttons[0]} />
                    <Text style={styles.label}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => props.gallerySelected()}>
                    <Entypo size={30} color={ligh_green} name={props.buttons[1]} />
                    <Text style={styles.label}>Gallery</Text>
                </TouchableOpacity>
            </View>
        )

    }

    return (
        <View>

            <StatusBar
                barStyle={myTheme.colors.STATUS_BAR_STYLE}
                backgroundColor={getIsDarkModeEnabled() ? '#000000' : '#000000cc'}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={closeButtton}
                onRequestClose={() => {

                }}>
                   <View style={{position: 'relative', flex: 1, justifyContent: 'center',
                        alignContent: 'center',}}>

<View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#000000',
                        opacity: 0.5,
                    }} />



                    <View  style={{...styles.centeredView, backgroundColor: myTheme.colors.DIALOG_MODAL_BACKGROUND, opacity: 1}}>
                        <View style={{ ...styles.container, }}>

                            <View style={styles.message}>
                                <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{props.message}</Text>
                            </View>

                            <View style={styles.closeIcon}>
                                <AntDesign
                                    name="close"
                                    color={ligh_green}
                                    size={20}
                                    onPress={() => { setCloseButton(!closeButtton) }, props.onPress} />
                            </View>

                        </View>
                        <View style={{ marginTop: -12 }}>
                            {getButtons()}
                        </View>

                    </View>

                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    centeredView: {
        flexDirection: "column",
        borderRadius: 10,
        paddingVertical: normalizeY(20),
        marginHorizontal: normalizeX(20),
        flex: 0.27
    },
    textStyle: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(15),
    },
    buttonsContainer: {
        justifyContent: 'center',
        marginTop: normalizeY(20),
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignItems: "flex-end"
    },
    container: {
        flexDirection: 'row',
        marginLeft: normalizeX(20),
        marginTop: normalizeY(-10),
        flex: 0.9
    },
    message: {
        flex: 0.88,
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        height: 71,
        width: 71, borderWidth: 1,
        borderColor: ligh_green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        flex: 0.1
    },
    label: {
        color: ligh_green,
        fontSize: normalizeFont(11)
    }
});

