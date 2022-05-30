import React, { useEffect, useState } from 'react'
import { fetchFCSHubSpotBlogsAction, resetHubSpotFCSBlogsAction } from '../Actions/FSCBlogsActions';
import { useSelector, useDispatch } from 'react-redux'
import { getIsDarkModeEnabled, getManufacturer, isAndroid, mulish_bold, mulish_regular, SCREEN_WIDTH } from '../../../../utils/Constants';
import { useTheme } from '@react-navigation/native';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { normalizeX, normalizeY, normalizeFont, openLink } from '../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../component/common/Text'
import Carousel, { Pagination } from 'react-native-snap-carousel';


export default FCSBlogs = (props) => {

    const myTheme = useTheme();
    const [activeSlide, setActiveSlide] = useState(0)
    const dispatch = useDispatch()

    const response = useSelector(state => state.fcsBlogsRedcuer.response)
    const isLoading = useSelector(state => state.fcsBlogsRedcuer.isLoading)
    const isError = useSelector(state => state.fcsBlogsRedcuer.isError)
    const blogList = useSelector(state => state.fcsBlogsRedcuer.blogList)


    useEffect(() => {

        dispatch(fetchFCSHubSpotBlogsAction())

        return function cleanUp() {
            dispatch(resetHubSpotFCSBlogsAction())
        }

    }, [])


    const handleFcsBlogsResponse = () => {

        if (response) {

            if (isError) {

                return (
                    <View>
                        <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center', marginVertical: normalizeY(20), fontWeight: '700', fontSize: normalizeFont(14) }}>Unable to fetch Plastk Blogs</Text>
                    </View>
                )

            } else {

                return (

                    <View style={{}}>

                        <Carousel
                            data={blogList}
                            renderItem={(item) => ItemView(item)}
                            layout={'default'}
                            firstItem={blogList.length}
                            loop={false}
                            sliderWidth={SCREEN_WIDTH}
                            itemWidth={SCREEN_WIDTH - 40}
                            containerCustomStyle={{ marginHorizontal: -normalizeX(10) }}
                            contentContainerCustomStyle={{ paddingVertical: 10 }}
                            layoutCardOffset={11}
                            onSnapToItem={(index) => { setActiveSlide(index) }}
                        />

                        <Pagination
                            dotsLength={blogList.length}
                            activeDotIndex={activeSlide}
                            dotStyle={{
                                width: 5,
                                height: 5,
                                borderRadius: 5,
                                marginHorizontal: 3,
                                backgroundColor: getIsDarkModeEnabled() ? 'rgba(255, 255, 255, 0.92)' : 'rgba(0, 0, 0, 0.92)'
                            }}
                            inactiveDotStyle={{
                                // Define styles for inactive dots here
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />

                    </View>
                )
            }
        }

    }

    const blogClicked = (item) => {

        if (isAndroid && getManufacturer() === 'Google') {
            openLink(item.absolute_url)

        } else {
            props.navigation.navigate('FCSBlogsDetails', { data: item })
        }
    }

    const ItemView = ({ item }) => {

        return (

            <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}
                style={styles.listItemContainerStyle}>

                <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => blogClicked(item)}>

                    <Image source={{ uri: item.featured_image }} resizeMode='stretch' style={{ width: normalizeX(250), height: normalizeY(180), marginTop: normalizeY(10) }} />

                    <Text numberOfLines={2} style={[styles.transactionDescriptionStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.label}</Text>

                </TouchableOpacity>
            </LinearGradient>



        )
    }

    return (
        <View stye={{ marginTop: normalizeY(10) }}>

            <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center', marginTop: normalizeY(20), fontWeight: '700', fontSize: normalizeFont(16) }}>Plastk Blogs</Text>
            {handleFcsBlogsResponse()}
            {isLoading &&

                <ActivityIndicator size="large" color="#00ff00" />
            }
        </View>
    )

}


const styles = StyleSheet.create({

    noHistoryAvailableStyle: {
        textAlign: 'center',
        fontSize: normalizeFont(20),
        fontFamily: mulish_regular
    },
    listItemContainerStyle: {
        height: normalizeY(260),
        borderRadius: 16,
        width: '100%',
        marginTop: normalizeY(10),
        elevation: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
    },
    touchableOpacityStyle: {
        alignItems: 'center',
        overflow: 'hidden',
    },
    transactionDescriptionStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(12),
        marginLeft: normalizeX(10),
        marginRight: normalizeX(20),
        fontWeight: '700',
        marginTop: normalizeY(10)
    },

});