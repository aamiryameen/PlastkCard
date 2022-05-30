import { StyleSheet } from 'react-native';
import { mulish_bold } from '../../utils/Constants';
import { normalizeFont, normalizeX, normalizeY } from "../../utils/Utils";

const signInStyles = StyleSheet.create({

    welcome_text: {
        fontSize: normalizeFont(18, true),
    },


    fingerprint_signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#000"
    },


    finger_button: {
        alignItems: 'center',
        marginTop: normalizeY(50)
    },

})


export default signInStyles;