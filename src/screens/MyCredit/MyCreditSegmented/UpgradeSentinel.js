
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { normalizeFont, normalizeY, normalizeX, openLink } from '../../../utils/Utils'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { colorOrange, mulish_bold, mulish_medium } from '../../../utils/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UpgradeSentinel = () => {

    const myTheme = useTheme();

    return (
        <View style={{marginTop: normalizeY(-40), marginHorizontal: normalizeX(5),marginVertical: normalizeY(10)}}>
        <View style={{ position: 'relative', top:61, zIndex:1, left: 105, }}>
        <Image   source={require('../../../assets/images/cell_phone.png')} style={{ height: normalizeY(210), width: '100%', marginTop: normalizeY(5),  }} resizeMode="contain" />
    </View>
        <View  style={styles.containerBox}>
<View style={{ flex: 1, flexDirection: 'row', }}>
    <View style={{ flex: 0.78, marginTop: normalizeY(20), marginLeft: normalizeX(10) }}>
        <Text numberOfLines={2} style={{ width: '100%', fontFamily: mulish_bold, color: "#fff", fontSize: normalizeX(9) }}>Want to see your full Credit Report?</Text>
        <Text style={{ color: "#FECF31", fontFamily: mulish_bold, fontSize: normalizeFont(14), marginTop: normalizeY(5) }}>Upgrade to Plastk Sentinel </Text>
    
        <TouchableOpacity onPress={() => openLink('https://plastk.ca/plastk-sentinel')} style={{ backgroundColor: "#FECF31", height: normalizeY(40), width: "90%", justifyContent: "center", alignItems: 'center', borderRadius: 10, marginTop: normalizeY(10) }}>
            <Text style={{ color: "#fff", fontFamily: mulish_medium }}>Learn More</Text>
        </TouchableOpacity>
    </View>


</View>


</View>
            
        </View>
    )
}

export default UpgradeSentinel

const styles = StyleSheet.create({
    containerBox: {
        backgroundColor: "#242B3E",
        height: 200,
        width: '100%',
        marginTop: normalizeY(15),
        flexDirection: 'row',
        borderRadius: normalizeFont(16),


    }

})
