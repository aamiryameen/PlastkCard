import React, {useRef, useEffect, useState} from 'react'

import { View, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native'
import Text from '../../../../component/common/Text'
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { logFireBaseEvent, normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import {useDispatch} from 'react-redux'
import { getAccountStatusAction } from '../../../Status/action/StatusAction';
import { fetchCreditFileAction } from '../Actions/EquifaxActions';
import DialogModal from '../../../../component/common/DialogModal';
import { EQUIFAX_DISCLAIMER_MESSAGE, getIsFreeUser } from '../../../../utils/Constants';
import { fcsGetStatusAction } from '../../../FreeCreditScore/FCSDashBoard/Actions/FCSDashBoardActions';


export default EidVerificationSuccess = (props) => {

    const myTheme = useTheme();

    const isBackOverRiddenRef = useRef(false)

    const dispatch = useDispatch()

    const [showDisclaimerModal, shouldSHowDisclaimerModal] = useState(false)


    const okPressed = () => {
        if(getIsFreeUser())
        props.navigation.navigate('FCSDashBoard')
    else
        props.navigation.navigate('MyCredit')
    }

    const handleDisclaimerModal = () => {
        if (showDisclaimerModal) {
            return (<DialogModal message={EQUIFAX_DISCLAIMER_MESSAGE} modalType='info' buttons={['OK']}
                positiveButtonPressed={positiveButtonPressed} hideOnClick={true} />)
        }

    }

    const positiveButtonPressed = () => {
        shouldSHowDisclaimerModal(false)
    }

    useEffect(() => {

        if(getIsFreeUser()) {
            logFireBaseEvent('fcs_eid_verification_success')
            dispatch(fcsGetStatusAction())
        }
            
        else {
            logFireBaseEvent('eid_verification_success')
            dispatch(getAccountStatusAction())
        }
        
        dispatch(fetchCreditFileAction())

        props.navigation.addListener('beforeRemove', (e) => {

            if(isBackOverRiddenRef.current === false) {

                isBackOverRiddenRef.current = true
                e.preventDefault();

                if(getIsFreeUser())
                    props.navigation.navigate('FCSDashBoard')
                else
                    props.navigation.navigate('MyCredit')
            }
        })
    }, [])

    return (
        <LinearGradient colors={[myTheme.colors.DASHBOARD_START_GRADIENT, myTheme.colors.DASHBOARD_END_GRADIENT]} style={styles.container}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DASHBOARD_START_GRADIENT} />

            <View style={{flex: 0.8}}>
                <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}
                    style={{ alignItems: 'center', elevation: 3, borderRadius: 20, height: normalizeY(250), width: '100%' }}>

                    <Image resizeMode='contain' source={require('../../../../assets/images//eidVerificationSuccess.png')} style={{ width: normalizeX(230), height: normalizeY(230) }} />

                </LinearGradient>


                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center', fontWeight: '700', marginTop: normalizeY(15), fontSize: normalizeFont(20, true) }}>You have been verified</Text>

                <TouchableOpacity onPress={() => shouldSHowDisclaimerModal(true)}>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'justify', marginTop: normalizeY(30), fontSize: normalizeFont(14) }}>Your verification process has been completed with Equifax¹ eIDverifier®. You will now have access to your free Equifax Credit score¹.</Text>

                </TouchableOpacity>

            </View>

            <View style={{ justifyContent: 'flex-end', flex: 0.2, marginBottom: normalizeY(20) }}>

                <Button title="OK!" onPress={() => okPressed()} />

            </View>

            {handleDisclaimerModal()}


        </LinearGradient>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalizeX(15),
        paddingTop: normalizeY(10),
    }
})