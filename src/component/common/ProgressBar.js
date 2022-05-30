

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../component/common/Text'
import { useTheme } from '@react-navigation/native';
import { ligh_green, mulish_bold, mulish_medium, mulish_regular, getIsDarkModeEnabled } from '../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../utils/Utils';

export default ProgressBar = (props) => {

    const myTheme = useTheme();

    const { title, completed, bgColor, foreground_color } = props;

    return (
        <View style={styles.container}>



            <View style={{ marginTop: normalizeY(20), marginHorizontal: normalizeX(10), marginLeft: normalizeX(10) }}>

                <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1 }}>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR }} >{title}</Text>
                    </View>

                    <Text style={{ color: myTheme.colors.LABEL_COLOR }}>{`${completed}`}</Text>

                </View>


                <View style={{ backgroundColor: bgColor, width: "100%", height: 10, borderRadius: 71, marginTop: normalizeY(20) }}>

                    <View style={{ backgroundColor: foreground_color, width: completed, height: 10, borderRadius: 71 }}>
                    </View>
                </View>


            </View>







        </View>
    );
};


const styles = StyleSheet.create({
    container: {


    },
    boxStyle: {
        height: 250,
        width: "95%",
        marginTop: normalizeY(20),
        marginLeft: normalizeX(8),
        borderRadius: 16,
        elevation: 5
    },
});



