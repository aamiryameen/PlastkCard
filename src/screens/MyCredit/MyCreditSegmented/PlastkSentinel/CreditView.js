
import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ligh_green, mulish_bold, mulish_medium, EQUIFAX_DISCLAIMER_MESSAGE } from '../../../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../component/common/Text'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import DialogModal from '../../../../component/common/DialogModal';


export default Benchmarks = () => {

    const myTheme = useTheme();
    const [showDisclaimerModal, shouldSHowDisclaimerModal] = useState(false)

    const handleDisclaimerModal = () => {
        if (showDisclaimerModal) {
            return (<DialogModal message={EQUIFAX_DISCLAIMER_MESSAGE} modalType='info' buttons={['OK']}
                positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
        }

    }

    const positiveButtonPressed = () => {

        shouldSHowDisclaimerModal(false)
    }


    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}  >
                <View style={styles.body}>
                    <View style={{ flexDirection: 'row', marginLeft: normalizeY(13) }}>

                        <View style={styles.dateContainer}>
                            <Text style={{ ...styles.asOfText, color: myTheme.colors.LABEL_COLOR, }}>As of </Text>
                            <Text style={{ ...styles.asOfText, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(5) }}>July 1st,2020 </Text>
                        </View>
                        <Image source={require('../../../../assets/images/equifax.png')} style={styles.equifaxImage} resizeMode='contain' />
                    </View>
                    <LinearGradient colors={[myTheme.colors.PROFILE_SCREEN_START_BUTTON, myTheme.colors.PROFILE_SCREEN_END_BUTTON]} style={{ ...styles.boxStyle }}>
                        <Text style={{ ...styles.changesText, color: myTheme.colors.LABEL_COLOR }}>{`Important Updates:`}</Text>

                        <View style={styles.textContainer}>

                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>Plastk Secure Visa Card</Text>
                                <Text style={{ ...styles.amountTextStyle, color: myTheme.colors.LABEL_COLOR, }}>Past Due: $0.00</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>Plastk Secure Visa Card</Text>
                                <Text style={{ ...styles.amountTextStyle, color: myTheme.colors.LABEL_COLOR, }}>Past Due: $0.00</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>Plastk Secure Visa Card</Text>
                                <Text style={{ ...styles.amountTextStyle, color: myTheme.colors.LABEL_COLOR, }}>Past Due: $0.00</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>Plastk Secure Visa Card</Text>
                                <Text style={{ ...styles.amountTextStyle, color: myTheme.colors.LABEL_COLOR, }}>Past Due: $0.00</Text>
                            </View>

                        </View>
                    </LinearGradient>
                    <Text style={{ ...styles.resolvingCredit, color: myTheme.colors.LABEL_COLOR, }}>Revolving Credits</Text>
                    <View style={styles.visaCardContainer}>

                        <View style={{ flex: 0.94 }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>Plastk Secure Visa Card</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>$1,000</Text>
                            <AntDesign
                                name="right"
                                color={ligh_green}
                                size={normalizeFont(17)}
                            />
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", marginLeft: normalizeX(22), marginTop: normalizeY(7) }}>

                        <View style={{ flex: 0.94 }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>Other Visa</Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>$1,000</Text>
                            <AntDesign
                                name="right"
                                color={ligh_green}
                                size={normalizeFont(17)}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginLeft: normalizeX(22), marginTop: normalizeY(7) }}>
                        <View style={{ flex: 0.94 }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, }}>Not as good MasterCard</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>$1,000</Text>
                            <AntDesign
                                name="right"
                                color={ligh_green}
                                size={normalizeFont(17)}
                            />
                        </View>
                    </View>
                    <Text style={{ ...styles.resolvingCredit, color: myTheme.colors.LABEL_COLOR, }}>Installments</Text>
                    <View style={{ flexDirection: "row", marginLeft: normalizeX(22), marginTop: normalizeY(7) }}>
                        <View style={{ flex: 0.94 }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, }}>B2B Bank</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>$1,000</Text>
                            <AntDesign
                                name="right"
                                color={ligh_green}
                                size={normalizeFont(17)}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginLeft: normalizeX(22), marginTop: normalizeY(7) }}>
                        <View style={{ flex: 0.94 }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, }}>Auto Loan</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>$1,000</Text>
                            <AntDesign
                                name="right"
                                color={ligh_green}
                                size={normalizeFont(17)}
                            />
                        </View>
                    </View>
                    <Text style={{ ...styles.resolvingCredit, color: myTheme.colors.LABEL_COLOR, }}>Mortgages</Text>
                    <View style={{ flexDirection: "row", marginLeft: normalizeX(22), marginTop: normalizeY(7) }}>
                        <View style={{ flex: 0.94 }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, }}>Mortgage</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR }}>$1,000</Text>
                            <AntDesign
                                name="right"
                                color={ligh_green}
                                size={normalizeFont(17)}
                            />
                        </View>
                    </View>
                    <Text style={{ ...styles.resolvingCredit, color: myTheme.colors.LABEL_COLOR, }}>Collections</Text>
                    <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(30), marginTop: normalizeY(7) }}>Nothing to Report Here!</Text>
                    <View style={{ marginTop: normalizeY(10), flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(15) }}>For any concerns regarding your Equifax Credit Report<TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(8) }}> 1 2</Text>
                        </TouchableOpacity>,</Text>

                    </View>
                    <View style={{ marginTop: normalizeY(10), flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ ...styles.textStyles, color: myTheme.colors.LABEL_COLOR, marginLeft: normalizeX(15) }}>Please call Equifax <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>
                            <Text style={{ color: myTheme.colors.LABEL_COLOR, fontSize: normalizeFont(8) }}> 1 </Text>
                        </TouchableOpacity></Text>
                        
                        <Text style={{ color: myTheme.colors.LABEL_COLOR }}> at 1-800-865-3908</Text>
                    </View>
                </View>
            </ScrollView>

            {handleDisclaimerModal()}

        </LinearGradient>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(8),
        marginTop: normalizeY(10),
        marginBottom: normalizeY(10)
    },
    asOfText: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(14)
    },
    compareText: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12),
        marginTop: normalizeY(15)
    },
    boxStyle: {
        height: 200,
        width: "93%",
        marginTop: normalizeY(20),
        marginLeft: normalizeX(10),
        borderRadius: 16,
        elevation: 5
    },
    changesText: {
        fontSize: normalizeFont(15),
        fontFamily: mulish_bold,
        margin: 20
    },
    textContainer: {
        marginHorizontal: 20,
    },
    textStyles: {
        justifyContent: "flex-start",
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12)
    },
    amountTextStyle: {
        justifyContent: "flex-end",
        fontFamily: mulish_medium,
        fontSize: normalizeFont(10)
    },
    resolvingCredit: {
        fontFamily: mulish_bold,
        fontSize: normalizeFont(16),
        marginTop: normalizeY(20),
        marginLeft: normalizeX(15)
    },
    equifaxImage: {
        height: 60,
        width: 70,
        marginLeft: normalizeX(30),
        alignItems: "flex-end"
    },
    dateContainer: {
        flex: 0.94,
        flexDirection: "row",
        marginTop: normalizeY(20)
    },
    visaCardContainer: {
        flexDirection: "row",
        marginLeft: normalizeX(22),
        marginTop: normalizeY(20)
    }

});

