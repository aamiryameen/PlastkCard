
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ligh_green, mulish_bold, mulish_medium, mulish_regular, getIsDarkModeEnabled } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../component/common/Text'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';




const CreditWatch = () => {

    const myTheme = useTheme();

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <View style={styles.body}>


                <View style={styles.dateImageContainer}>

                    <Text style={{ ...styles.dateText, color: myTheme.colors.LABEL_COLOR }}>As of July 3, 2020</Text>

                    <Image source={require('../../../../assets/images/equifax.png')} style={{ height: 30, width: 80, marginTop: normalizeY(-5) }} />
                </View>

                <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={{ ...styles.boxStyle }}>

                    <Text style={{ ...styles.changesText, color: myTheme.colors.LABEL_COLOR }}>{`Important Changes
(in the last 30 days):`}</Text>

                    <View style={styles.textContainer}>

                        <View style={{ flexDirection: "row" }}>

                            <Text style={{ justifyContent: "flex-start", color: myTheme.colors.LABEL_COLOR, flex: 1, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>Inquiry - Auto Loan (866)222-3456</Text>
                            <Text style={{ justifyContent: "flex-end", color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>July 22, 2020</Text>

                        </View>

                        <View style={{ flexDirection: "row", marginTop: normalizeY(5) }}>

                            <Text style={{ justifyContent: "flex-start", color: myTheme.colors.LABEL_COLOR, flex: 1, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>Name Change</Text>
                            <Text style={{ justifyContent: "flex-end", color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>July 22, 2020</Text>

                        </View>

                        <View style={{ flexDirection: "row", marginTop: normalizeY(5) }}>

                            <Text style={{ justifyContent: "flex-start", color: myTheme.colors.LABEL_COLOR, flex: 1, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>Address Change</Text>
                            <Text style={{ justifyContent: "flex-end", color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>July 22, 2020</Text>

                        </View>

                        <View style={{ flexDirection: "row", marginTop: normalizeY(5) }}>

                            <Text style={{ justifyContent: "flex-start", color: myTheme.colors.LABEL_COLOR, flex: 1, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>Collections Account</Text>
                            <Text style={{ justifyContent: "flex-end", color: myTheme.colors.LABEL_COLOR, fontFamily: mulish_medium, fontSize: normalizeFont(12) }}>July 22, 2020</Text>

                        </View>



                    </View>




                </LinearGradient>


                <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={{ ...styles.boxStyle }}>

                    <Text style={{ ...styles.changesText, color: myTheme.colors.LABEL_COLOR }}>{`Information`}</Text>

                    <View style={styles.textContainer}>

                        <View style={{ flexDirection: "row" }}>

                            <Text style={{ justifyContent: "flex-start", color: myTheme.colors.LABEL_COLOR, flex: 1 }}>Inquiry - Auto Loan (866)222-3456</Text>
                            <Text style={{ justifyContent: "flex-end", color: myTheme.colors.LABEL_COLOR }}>July 22, 2020</Text>

                        </View>


                    </View>



                </LinearGradient>

            </View>


        </LinearGradient>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(5),
        marginTop: normalizeY(10)
    },
    dateImageContainer: {
        flexDirection: 'row',
        marginLeft: normalizeX(20),
        marginTop: normalizeY(20)

    },
    dateText: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        flex: 0.9,
        fontFamily: mulish_bold,
        fontSize: normalizeFont(14)
    },
    boxStyle: {
        paddingBottom: 15,
        width: "85%",
        marginTop: normalizeY(20),
        marginLeft: normalizeX(20),
        borderRadius: 16,
        elevation: 5
    },
    changesText: {
        fontSize: normalizeFont(14),
        fontFamily: mulish_bold,
        margin: 20
    },
    textContainer: {
        marginHorizontal: 20,


    }
});


export default CreditWatch;
