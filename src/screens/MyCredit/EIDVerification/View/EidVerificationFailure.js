import React, { useRef, useEffect } from 'react'

import { View, StyleSheet, Image, StatusBar, ScrollView } from 'react-native'
import Text from '../../../../component/common/Text'
import Button from '../../../../component/common/Button'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import { useDispatch } from 'react-redux'
import { getAccountStatusAction } from '../../../Status/action/StatusAction';
import { getIsFreeUser } from '../../../../utils/Constants';
import { fcsGetStatusAction } from '../../../FreeCreditScore/FCSDashBoard/Actions/FCSDashBoardActions';

export default EidVerificationFailure = (props) => {

    const myTheme = useTheme();

    const isBackOverRiddenRef = useRef(false)
    const dispatch = useDispatch()



    const okPressed = () => {
        if (getIsFreeUser())
            props.navigation.navigate('FCSDashBoard')
        else
            props.navigation.navigate('MyCredit')
    }

    useEffect(() => {

        if (getIsFreeUser())
            dispatch(fcsGetStatusAction())
        else
            dispatch(getAccountStatusAction())

        props.navigation.addListener('beforeRemove', (e) => {

            if (isBackOverRiddenRef.current === false) {

                isBackOverRiddenRef.current = true
                e.preventDefault();

                if (getIsFreeUser())
                    props.navigation.navigate('FCSDashBoard')
                else
                    props.navigation.navigate('MyCredit')
            }

        })
    }, [])

    return (
        <LinearGradient colors={[myTheme.colors.DASHBOARD_START_GRADIENT, myTheme.colors.DASHBOARD_END_GRADIENT]} style={styles.container}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DASHBOARD_START_GRADIENT} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}
                    style={{ alignItems: 'center', elevation: 3, borderRadius: 20, height: normalizeY(250), width: '100%' }}>

                    <Image resizeMode='contain' source={require('../../../../assets/images/eidVerificationFailed.png')} style={{ width: normalizeX(230), height: normalizeY(230) }} />

                </LinearGradient>


                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center', fontWeight: '700', marginTop: normalizeY(15), fontSize: normalizeFont(20, true) }}>Your verification is not complete</Text>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'justify', marginTop: normalizeY(15), fontSize: normalizeFont(14) }}>We're sorry... your request to access *Plastk My Credit * cannot be granted at this time. This decision is based, in whole or in part, on information provided by Equifax Canada Co. Equifax did not make this decision to deny you access to MyCredit and is unable to provide you with the specific reasons why you were not granted access to My Credit.</Text>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'justify', marginTop: normalizeY(15), fontSize: normalizeFont(14) }}>However, under applicable Canadian Federal and/or provincial Credit reporting legislation, you have the right to receive a free copy of your Consumer Report from Equifax.</Text>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'justify', marginTop: normalizeY(15), fontSize: normalizeFont(14) }}>You also have the right to dispute the accuracy or completeness of the information contained in that Consumer Report. You may obtain your Consumer Report in one of these ways: Call Equifax at 1-800-465-7166 to initiate your request.</Text>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'justify', marginTop: normalizeY(15), fontSize: normalizeFont(14) }}>*Please be aware that for quality assurance purposes, your phone call with Equifax may be monitored and/or recorded. Mail or fax (514-355-8502) your request to Equifax Canada Co., P.O. Box 190, Jean Talon Station, Montreal, QC H1S 2Z2. *</Text>

                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'justify', marginTop: normalizeY(15), fontSize: normalizeFont(14) }}> You will need to include the following information in your letter: name, address, former address (if you have been at your current address less than two years), date of birth, the date you used the Plastk Financial & rewards Inc system, as the name of the company that referred you to Equifax. You may include your social insurance number.</Text>

                <View style={{ marginVertical: normalizeY(20) }}>

                    <Button title="OK!" onPress={() => okPressed()} />

                </View>

            </ScrollView>




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