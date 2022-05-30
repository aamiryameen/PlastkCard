
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { normalizeY, normalizeX, normalizeFont } from '../../../utils/Utils'
import { useTheme } from '@react-navigation/native';
import { getIsFreeUser, isIOS, mulish_bold, mulish_regular, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/Constants';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const UpgradeSentinel = () => {

    const [activeSlide, setActiveSlide] = useState(0)
    const myTheme = useTheme();

    const response = getIsFreeUser() ? useSelector(state => state.fcsDashBoardReducer.response) : useSelector(state => state.accountStatusReducer.response)

    const itemsOfCreditReoprts = [

        {
            label: "Recommendations", url: require('../../../assets/images/french_fries2.png'), title: "Actions That Impact MyCredit Score"
            , description: 'Try not to run your balances up to your credit limit. Keeping your account balances below 75% of your available credit may also help your score.'
        },
        {
            label: "Recommendations", url: require('../../../assets/images/french_fries2.png'), title: "Actions That May Improve MyCredit Score",
            description: 'Pay all of your bills on time. Paying late, or having your account sent to a collection agency has a negative impact on your credit score.'
        },
        {
            label: "Recommendations", url: require('../../../assets/images/french_fries2.png'), title: "Actions That May Hurt MyCredit Score",
            description: 'Applying for credit too frequently in a short amount of time'
        },

    ]

    const ItemView = ({ item }) => {

        return (

            <View style={{ marginTop: 10 }}>


                <View style={{ alignItems: 'center' }}>
                    <Text numberOfLines={2} style={{ color: "#fff", fontSize: 20, fontFamily: mulish_bold, }} >{item.label}</Text>
                    <View style={{ backgroundColor: "#fff", height: 200, width: '90%', marginTop: normalizeY(7), borderRadius: 10 }}>
                        <Image source={require('../../../assets/images/write.png')} style={{ height: 50, width: "18%", marginTop: 20, marginLeft: 20, }} resizeMode="contain" />
                        <Text numberOfLines={2} style={{ color: '#000', fontSize: 15, fontFamily: mulish_bold, marginLeft: 10, marginTop: normalizeY(10) }}>{item.title}</Text>
                        <Text numberOfLines={4} style={{ color: '#696871', fontSize: 12, fontFamily: mulish_regular, marginHorizontal: 10, marginTop: normalizeY(5) }}>{item.description}</Text>
                    </View>

                </View>


            </View>

        )
    }

    return (

        <View style={{ marginTop: hp('5%'), }}>

            <ImageBackground source={require('../../../assets/images/credit_report.png')} imageStyle={{ borderRadius: 16 }} style={{ height: 330, width: '100%', marginTop: normalizeY(5), alignItems: 'center' }} >
                <View style={{}}>

                    <Carousel
                        data={isIOS ? itemsOfCreditReoprts.reverse() : itemsOfCreditReoprts}
                        renderItem={(item) => ItemView(item)}
                        layout={'default'}
                        firstItem={isIOS ? 0 : itemsOfCreditReoprts.length}
                        loop={false}
                        sliderWidth={SCREEN_WIDTH}
                        itemWidth={SCREEN_WIDTH - 40}
                        containerCustomStyle={{}}
                        contentContainerCustomStyle={{ paddingVertical: 10, }}
                        layoutCardOffset={11}
                        onSnapToItem={(index) => setActiveSlide(index)}
                    />

                    <Pagination
                        dotsLength={itemsOfCreditReoprts.length}
                        activeDotIndex={activeSlide}
                        dotStyle={{
                            width: 5,
                            height: 5,
                            borderRadius: 5,
                            marginHorizontal: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.92)'
                        }}
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />

                </View>
            </ImageBackground>

            {(response.user.equifax_status === 'Not Verified' || response.user.equifax_status === 'Processing' || response.user.equifax_status === 'Rejected')
                &&
                <View style={styles.overLayStyle}>

                    <Text numberOfLines={3} style={{ textAlign: 'center', fontWeight: '700', fontSize: normalizeFont(15), marginHorizontal: normalizeX(10) }}>Get your Credit Score to access this section</Text>


                </View>

            }

        </View>


    )
}

const styles = StyleSheet.create({
    listItemContainerStyle: {
        marginLeft: normalizeX(10),
        height: normalizeY(60),
        borderRadius: 16,
        width: '100%',
        marginTop: normalizeY(10),
        elevation: 3,

        shadowOpacity: 0.2,
        marginHorizontal: normalizeX(10),
        shadowOffset: { width: 0, height: 0 },
    },
    overLayStyle: {
        backgroundColor: '#bbbbbb',
        position: 'absolute',
        flex: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0.95,
        borderRadius: 16,
        elevation: 5,
        justifyContent: 'center',
        alignContent: 'center',
        overflow: 'hidden',
    },
})

export default UpgradeSentinel




