//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../component/common/Text';
import Octicons from 'react-native-vector-icons/Octicons';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import { normalizeY, normalizeFont, normalizeX } from '../../utils/Utils';
import { ligh_green, Moderateyellow, mulish_bold, mulish_regular, WHITE } from '../../utils/Constants';

const CreditInsights = (props) => {


    const myTheme = useTheme();

    return (
        <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={styles.container}>
            <View style={{ height: 250, width: '100%' }}>


                <Text style={{ ...styles.creditText, color: myTheme.colors.LABEL_COLOR }}>Credit Insights</Text>
                <View style={{ flexDirection: "row", marginHorizontal: normalizeX(10), marginTop: normalizeY(-3) }}>

                    <View style={{ flex: 0.5 }}>
                        <Image source={require('../../assets/images/lamp.png')} style={{ height: 160, width: "100%" }} resizeMode="contain" />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", marginTop: normalizeY(10), marginLeft: normalizeX(10) }}>
                        <Octicons
                            name="primitive-dot"
                            color={ligh_green}
                            size={18}
                        />

                        <View style={{ marginRight: normalizeX(10), marginLeft: normalizeX(5) }}>
                            <Text style={{ fontSize: normalizeFont(13), fontFamily: mulish_bold, color: myTheme.colors.LABEL_COLOR, }}>{`Pay all of your bills on time.`}</Text>
                            <Text style={{ fontSize: normalizeFont(12), fontFamily: mulish_regular, color: myTheme.colors.LABEL_COLOR, marginTop: 1 }}>Paying late, or having your</Text>
                            <Text style={{ fontSize: normalizeFont(12), fontFamily: mulish_regular, color: myTheme.colors.LABEL_COLOR, marginTop: 1 }}>account sent to a collection </Text>
                            <Text style={{ fontSize: normalizeFont(12), fontFamily: mulish_regular, color: myTheme.colors.LABEL_COLOR, marginTop: 1 }}>agency has a negative impact</Text>
                            <Text style={{ fontSize: normalizeFont(12), fontFamily: mulish_regular, color: myTheme.colors.LABEL_COLOR, marginTop: 1 }}>on your credit score</Text>
                            <Text style={{
                                fontSize: normalizeFont(12), fontFamily: mulish_regular, color: ligh_green, marginTop: 8, textDecorationLine: "underline",
                                textDecorationColor: ligh_green,
                            }}>Read more</Text>
                        </View>
                    </View>

                </View>
            </View>
        </LinearGradient>
    );
};


const styles = StyleSheet.create({

    container: {
        height: 272,
        width: '100%',
        elevation: 5,
        marginTop: normalizeY(10),
        borderRadius: 16
    },
    creditText: {
        fontSize: normalizeFont(17),
        fontFamily: mulish_bold,
        margin: 20
    }

});


export default CreditInsights;
