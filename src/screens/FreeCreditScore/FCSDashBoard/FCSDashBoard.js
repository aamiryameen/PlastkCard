import React, { useEffect } from 'react'

import { View, StyleSheet, StatusBar, Text, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import FCSPersonalInfo from '../FCSSignUpInfo/View/FCSPersonalInfo'
import FCSCreditScreen from '../FCSCreditScreen/View/FCSCreditScreen'
import { fcsGetStatusAction } from './Actions/FCSDashBoardActions';
import { logFireBaseEvent } from '../../../utils/Utils';
import { setIsFreeUser } from '../../../utils/Constants';
import NotchView from '../../../component/common/NotchView';
import FCSTnC from './FCSTnC';



export default FCSDashboard = (props) => {

    const dispatch = useDispatch()
    const myTheme = useTheme()

    const isLoading = useSelector(state => state.fcsDashBoardReducer.isLoading)
    const response = useSelector(state => state.fcsDashBoardReducer.response)



    useEffect(() => {

        logFireBaseEvent('fcs_login')

        setIsFreeUser(true)

        props.navigation.setOptions({ headerShown: false })
        dispatch(fcsGetStatusAction())

    }, [])


    const handleResponse = () => {

       

        if (response) {

            if (response.success) {

                if (response.status) {

                    if(!response.user.hasOwnProperty('tnc_plastk') || response.user.tnc_plastk === '') {

                        return (

                            <View style={{flex : 1}}>
                                <NotchView />
                                <FCSTnC navigation={props.navigation} />
                            </View>
    
                        )

                    } else {
                        return (

                            <View style={{flex : 1}}>
                                <NotchView />
                                <FCSCreditScreen navigation={props.navigation} />
                            </View>
    
                        )
                    }
                   
                } else {

                    return (
                    <View style={{flex : 1}}>
                         <NotchView />
                        <FCSPersonalInfo navigation={props.navigation} />
                    </View>)
                }
            } else {
            }


        } else {
        }
    }

    return (
        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container} >
            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.DARK_GRADIENT_FIRST_COLOR} />


            {isLoading &&
                <CustomLoader />
            }
            {handleResponse()}

        </LinearGradient>
    );

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})