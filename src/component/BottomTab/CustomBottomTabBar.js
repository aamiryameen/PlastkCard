import React from 'react';

import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { normalizeY } from '../../utils/Utils';
import { hasNotch } from 'react-native-device-info';
import { getIsDarkModeEnabled } from '../../utils/Constants';
import { EventRegister } from 'react-native-event-listeners'
import {useDispatch} from 'react-redux'
import { fetchGRSUrlAction } from '../../screens/GRS/Actions/GRSActions';



export default CustomBottomTabBar = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()

    return (
        <View style={{ width: Dimensions.get('window').width, height: hasNotch() ? 75 : 55, backgroundColor: myTheme.colors.BOTTOM_TAB_COLOR }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={() => { props.navigation.navigate('DashBoard'); EventRegister.emit('footerButtonPressed', 'card') }}>
                    <Image style={{ width: 25, height: 25 }} resizeMode='contain' source={props.selectedScreen === 'dashBoard' ? require('../../assets/images/home_selected.png') : (getIsDarkModeEnabled() ? require('../../assets/images/home_unselected_dark.png') : require('../../assets/images/home_unselected.png'))} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={() => { dispatch(fetchGRSUrlAction()) }}>
                    <Image style={{ width: 25, height: 25 }} resizeMode='contain' source={props.selectedScreen === 'GRS' ? require('../../assets/images/grs_selected.png') : (getIsDarkModeEnabled() ? require('../../assets/images/grs_dark_unselected.png') : require('../../assets/images/grs_light_unselected.png'))} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={() => { props.navigation.navigate('MyCredit') }} >

                    <Image style={{ width: 25, height: 25 }} resizeMode='contain' source={props.selectedScreen === 'myCredit' ? require('../../assets/images/myCredit_selected.png') : (getIsDarkModeEnabled() ? require('../../assets/images/myCredit_unselected_dark.png') : require('../../assets/images/myCredit_unselected_light.png'))} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={() => props.navigation.navigate('PlastkCard')}>
                    <Image style={{ width: 25, height: 25 }} resizeMode='contain' source={props.selectedScreen === 'plastkCard' ? require('../../assets/images/credit_card_selected.png') : (getIsDarkModeEnabled() ? require('../../assets/images/credit_card_unselected_dark.png') : require('../../assets/images/credit_card_unselected.png'))} />
                </TouchableOpacity>
            </View>
        </View>
    )
}