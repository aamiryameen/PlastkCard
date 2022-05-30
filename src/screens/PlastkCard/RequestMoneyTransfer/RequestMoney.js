//import liraries
import React, { useRef } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeFont, normalizeX, normalizeY } from "../../../utils/Utils";
import { useTheme } from '@react-navigation/native'
import Text from '../../../component/common/Text'
import Feather from 'react-native-vector-icons/Feather';
import Picker from "../../../component/common/Picker";
var currencyFormatter = require('currency-formatter');
import Button from '../../../component/common/Button'
import { mulish_bold, mulish_medium, mulish_regular, ligh_green } from "../../../utils/Constants";


const items = [
    { label: "Mail Offer", value: "Mail Offer" },
    { label: "Friends or Family", value: "Friends or Family" },
    { label: "Email Offer Plastk", value: "Email Offer Plastk" },
    { label: "Search Engine", value: "Search Engine" },
    { label: "Online Banner Ad or Video", value: "Online Banner Ad or Video" },
    { label: "Facebook Ad or Video", value: "Facebook Ad or Video" },
    { label: "Credit Card Comparisons", value: "Credit Card Comparisons" },
    { label: "Other", value: "Other" },
];

const notifyItems = [
    { label: "Email", value: "Email" },
    { label: "Message", value: "Message" }

]

const foodItems = [
    { label: "Pizza", value: "Pizza" },
    { label: "Chicken Roast", value: "Chicken Roast" }

]

const SendMoney = (props) => {

    const aboutUs = useRef('')
    const notify = useRef('')
    const foods = useRef('')
    const message = useRef('')

    const myTheme = useTheme();

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}  keyboardShouldPersistTaps={'handled'}>

                <View style={styles.body}>
                    <Text style={[styles.interacText, { color: myTheme.colors.LABEL_COLOR }]} >Interac e-Transfer</Text>



                    <View style={{ flexDirection: "row", marginTop: normalizeY(20), }} >
                        <Picker containerStyle={{
                            marginLeft: 5, width: "75%", borderBottomWidth: 0.2,
                            borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR
                        }}
                            theme={myTheme} downIcon="down" values={items} placeholder='From' onChange={(val) => aboutUs.current = val} />
                        <View style={styles.plusIconContainer}>
                            <Feather
                                style={{ fontFamily: mulish_bold }}
                                name="plus"
                                color="#fff"
                                size={20}
                                fontFamily={mulish_bold}
                            />
                        </View>
                    </View>

                    <View style={[styles.textInputContainer, { borderBottomColor: '#DCDCDC' }]}>
                        <Text style={[styles.pointsValue, { color: myTheme.colors.LABEL_COLOR, }]}>Amount</Text>
                        <TextInput placeholder={currencyFormatter.format(1000000, { code: 'CAD' })} placeholderTextColor={myTheme.colors.LABEL_COLOR}
                            style={[styles.textInputStyle, { color: myTheme.colors.LABEL_COLOR, }]}
                        />
                    </View>







                    <View style={[styles.messageContainer, { borderBottomColor: '#DCDCDC', paddingBottom: 0 }]}>
                        <View style={styles.messageTitle}>
                            <View style={[styles.message, { flex: 0.99 }]}>
                                <Text style={{ color: myTheme.colors.TEXTINPUT_LABEL_COLOR, fontSize: normalizeFont(12) }}>Request Details</Text>
                            </View>
                            <Text style={{ color: ligh_green }}>Optional</Text>

                        </View>

                        <TextInput placeholder="Type request details here " placeholderTextColor={myTheme.colors.TEXTINPUT_PLACEHOLDER} style={{ color: myTheme.colors.LABEL_COLOR, paddingBottom: 0 }} />

                    </View>






                    <Picker containerStyle={{
                        marginLeft: 5, width: "90%", borderBottomWidth: 0.8,
                        borderBottomColor: myTheme.colors.TEXTINPUT_LABEL_COLOR, marginTop: 21
                    }}
                        theme={myTheme} values={notifyItems} placeholder='Notify by' onChange={(val) => notify.current = val} />






                    <View style={[styles.messageContainer, { borderBottomColor: '#DCDCDC', }]}>
                        <View style={styles.messageTitle}>
                            <View style={[styles.message, { flex: 0.99 }]}>
                                <Text style={{ color: myTheme.colors.LABEL_COLOR }}>Message</Text>
                            </View>
                            <Text style={{ color: ligh_green }}>Optional</Text>

                        </View>

                        <TextInput placeholder="Hi" placeholderTextColor={myTheme.colors.LABEL_COLOR}
                            style={{ color: myTheme.colors.LABEL_COLOR, paddingBottom: 0 }} />

                    </View>

                    <View style={[styles.textInputContainer, { borderBottomColor: '#DCDCDC' }]}>
                        <Text style={[styles.pointsValue, { color: myTheme.colors.LABEL_COLOR, }]}>Your Autodeposit Plastk Account Email</Text>
                        <TextInput placeholder='aamir@plastk.ca' placeholderTextColor={myTheme.colors.LABEL_COLOR}
                            style={[styles.textInputStyle, { color: myTheme.colors.LABEL_COLOR, }]}
                        />
                    </View>

                    <Button title="SEND MONEY" style={styles.button} />


                </View>

            </ScrollView>

        </LinearGradient>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(10),
        marginBottom: 20
    },
    placeholder: {
        fontFamily: mulish_medium,
        marginLeft: normalizeX(4),
        marginTop: normalizeY(20),
        fontSize: normalizeFont(12)
    },
    textInputStyle: {
        paddingBottom: 3,
        fontSize: normalizeFont(14),


    },
    interacText: {
        marginTop: normalizeY(20),
        fontFamily: mulish_bold,
        fontSize: 18,
        fontStyle: "normal",
        marginLeft: normalizeX(4),
    },
    placeholderContainer: {
        marginLeft: normalizeX(4),
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: "90%",
        marginTop: normalizeY(8),
        paddingBottom: 7
    },
    placeholderText: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(14),
    },
    textInputContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: "90%",
        marginLeft: normalizeX(4),
        marginTop: normalizeY(20)
    },
    pointsValue: {
        fontFamily: mulish_medium,
        fontSize: normalizeFont(12)
    },
    pickerContainer: {
        flexDirection: "row",
        marginLeft: 4,
        marginTop: normalizeY(15)
    },
    plusIconContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#FECF31',
        marginTop: 20,
        marginLeft: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    messageContainer: {
        borderBottomWidth: 0.3,
        marginTop: 10,
        width: '90%',
        marginLeft: 6,
        paddingBottom: 15

    },
    messageTitle: {
        flexDirection: 'row',
        marginTop: 15
    },
    button: {
        width: '90%',
        marginTop: 30,
        marginLeft: 7
    }
});


export default SendMoney;
