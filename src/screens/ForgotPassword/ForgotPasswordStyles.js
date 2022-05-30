import { StyleSheet } from 'react-native'
import { colorWhiteffffff, whit } from '../../utils/Constants';
import { normalizeX, normalizeY } from "../../utils/Utils";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        paddingHorizontal: normalizeX(15)
    },
    header: {
        width: "100%",
        height: 65,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "space-around"
    },
    text_inputcontainer_style: {
        flexDirection: "row", marginTop: normalizeY(10), marginHorizontal: normalizeX(20),
    },
    border_text_style: {
        borderWidth: 0.2, borderColor: "grey", marginHorizontal: normalizeX(1), marginTop: normalizeY(-6)
    },
    icons_style:
        // marginTop:15,
        { marginTop: normalizeY(18) },
    backArrow: {
        width: "12%", height: 40, elevation: 3, justifyContent: "center",
        alignItems: "center", backgroundColor: colorWhiteffffff, marginLeft: normalizeX(20),
        borderRadius: 13,
        borderWidth: 0.,
        borderColor: whit
    },
    headerText: {
        color: "#171717",
        fontSize: 17,
        marginLeft: normalizeX(20),
        fontFamily: "Mulish-Bold",
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: normalizeX(20),
        paddingVertical: normalizeY(30)
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#8f92a1',
        fontSize: 12,
        fontFamily: "Mulish-Regular",
        fontWeight: "400",
        marginTop: normalizeY(15),
        paddingTop: normalizeY(15)
    },
    name_style: {
        marginHorizontal: normalizeX(10),
        color: '#8f92a1',
        fontSize: 14,
        fontFamily: "Mulish-Regular",
    },
    email_borderstyle: {
        borderWidth: 0.1,
        borderColor: "grey",
        marginHorizontal: 1,
        marginTop: normalizeY(-6)
    },
    password_textinpu: {
        marginHorizontal: normalizeX(10),
        color: '#e53935',
        fontSize: 14,
        fontFamily: "Mulish-Regular",
    },

    password_text_footer: {
        color: '#e53935',
        fontSize: 12,
        fontFamily: "Mulish-Regular",
    },
    password_match: {
        color: '#e53935',
        fontSize: 13,
        fontFamily: "Mulish-Regular",
        marginTop: normalizeY(10),
        paddingTop: normalizeY(5)
    },
    action: {
        flexDirection: 'row',
        marginTop: normalizeY(15),
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    textinput_style: {
        marginTop: normalizeY(4),
        fontSize: 14,
        width: "90%"
    },
    button: {
        alignItems: 'center',
        marginTop: normalizeY(50)
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#a1c452"
    },
    textSign: {
        fontSize: 18,
        // fontWeight: 'bold',
        fontFamily: "Mulish-Bold"
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: normalizeY(20)
    },
    color_textPrivate: {
        color: '#e53935'
    },
    terms_condition: {
        color: '#000',
        fontSize: 12,
        fontFamily: "Mulish-Bold",
        // fontWeight:"700",
        marginLeft: normalizeX(9),
        marginTop: normalizeY(5)
    },
    terms_condition_second: {
        color: '#000',
        fontSize: 18,
        fontFamily: "Mulish-Bold",
        // fontWeight:"700",
        marginLeft: normalizeX(9),
        marginTop: normalizeY(5)
    },
    note: {
        color: '#000',
        fontSize: 12,
        fontFamily: "Mulish-Bold",
        // fontWeight:"700",
        marginLeft: normalizeX(24),
        marginTop: normalizeY(5),
        paddingLeft: normalizeX(10)
    },
    errorStyle: {
        color: "#DC143C",
        fontSize: 11,
        marginTop: 2
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default styles;