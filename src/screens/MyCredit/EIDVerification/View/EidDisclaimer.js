import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import Text from '../../../../component/common/Text'
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../../component/common/Button'
import CustomLoader from '../../../../component/common/CustomLoader'
import { useDispatch, useSelector } from 'react-redux'
import { acceptEquifaxDisclaimerAction, resetEquifaxDisclaimer } from '../Actions/EquifaxActions';
import { getIsFreeUser } from '../../../../utils/Constants';


export default EidDisclaimer = (props) => {

    const dispatch = useDispatch()

    const myTheme = useTheme();

    const isLoading = useSelector(state => state.equifaxReducer.isLoading)
    const response = useSelector(state => state.equifaxReducer.equifaxDisclaimerResponse)


    const handleResponse = () => {
        if (response) {

            if (response.success) {

                logFireBaseEvent( getIsFreeUser() ? 'fcs_eid_disclaimer_accepted' : 'eid_disclaimer_accepted')
                setTimeout(() => {
                    props.navigation.navigate('ChangeAddress', { equifax_status: props.route.params.equifax_status })
                }, 150);

                dispatch(resetEquifaxDisclaimer())

            } else {

            }

        }
    }

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DASHBOARD_END_GRADIENT]} style={styles.container}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />

            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: normalizeY(20)}}>
                <View>

                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>When you click on the "Start Verification Process" button below, a form will be presented requesting your name, address, Driver's Licence number, and other information, including the option to include your social insurance number, which will help us identify you.</Text>

                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>After which we will be asking you a few questions to confirm your identity.</Text>

                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>We will be comparing the information provided to information contained in your consumer report, which Equifax Canada Co., the leading Canadian consumer credit reporting company, will obtain on our behalf.</Text>

                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>Equifax Canada Co. will only use the information in your consumer report for the purpose of validating your identity and no other. If we are unable to validate your identity through the online process, you will be directed to an alternative, off-line process.</Text>

                    <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>By proceeding with this online process, you agree to the use of your credit report for the purpose of validation of your identity. You will get access to your credit score and/or report along with other unique products or services based your credit profile.</Text>

                </View>

                <View style={{ justifyContent: 'flex-end', marginVertical: normalizeY(40) }}>

                    <Button title='Start Verification Process' onPress={() => dispatch(acceptEquifaxDisclaimerAction())} />

                </View>

                {isLoading &&
                    <CustomLoader />
                }

                {handleResponse()}

            </ScrollView>
        </LinearGradient>
    )

}


const styles = StyleSheet.create({
    textStyle: {
        fontSize: normalizeFont(14),
        textAlign: 'justify',
        marginTop: normalizeY(12)

    },
    container: {
        flex: 1,
        paddingHorizontal: normalizeX(15),
        paddingTop: normalizeY(10),
    }
})