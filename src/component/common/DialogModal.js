import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    StatusBar
} from "react-native";

import { getIsDarkModeEnabled, mulish_bold } from '../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../utils/Utils';
import Button from './Button';
import Text from './Text';
import { useTheme } from '@react-navigation/native';




export default DialogModal = (props) => {


    const myTheme = useTheme();
    const [isVisible, setVisible] = useState(true)


    const getButtons = () => {
        if (props.modalType === 'info') {
            return (
                <View style={styles.buttonsContainer}>
                    <Button style={{ width: '30%' }} title={props.buttons[0]} onPress={() => {
                        props.positiveButtonPressed();

                        if (props.hideOnClick) {
                            setVisible(false)
                        }
                    }} />
                </View>
            )

        }
        else if (props.modalType === 'interactive') {
            return (

                <View style={styles.buttonsContainer}>

                    <Button style={{ width: '30%' }} title={props.buttons[0]} onPress={() => {
                        props.positiveButtonPressed();

                        if (props.hideOnClick) {
                            setVisible(false)
                        }
                    }} />
                    <Button style={{ width: '30%' }} title={props.buttons[1]} onPress={() => {
                        props.negativeButtonPressed();
                        if (props.hideOnClick) {
                            setVisible(false)
                        }
                    }} />
                </View>
            )
        }
    }

    return (
        <View  >

            <StatusBar
                barStyle={myTheme.colors.STATUS_BAR_STYLE}
                backgroundColor={getIsDarkModeEnabled() ? '#000000' : '#000000cc'}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
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

                    <View style={[styles.centeredView, { backgroundColor: myTheme.colors.DIALOG_MODAL_BACKGROUND, opacity: 1 }]}>

                        <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{props.message}</Text>

                        {getButtons()}

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
        paddingHorizontal: normalizeX(15),
        marginHorizontal: normalizeX(10),
        opacity: 1,
    },

    textStyle: {
        textAlign: 'justify',
        fontFamily: mulish_bold,
        marginTop: normalizeY(10),
        fontSize: normalizeFont(15),
    },

    buttonsContainer: {
        justifyContent: 'space-around',
        marginTop: normalizeY(20),
        flexDirection: 'row',
    },

});

