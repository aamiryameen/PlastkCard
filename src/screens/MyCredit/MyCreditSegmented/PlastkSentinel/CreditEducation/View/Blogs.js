import React, { useEffect, useState } from 'react'
import { fetchHubSpotBlogsAction, resetHubSpotBlogsAction } from '../Action/CreditEducationActions';
import { useSelector, useDispatch } from 'react-redux'
import { getIsDarkModeEnabled, getManufacturer, isAndroid, mulish_bold, mulish_regular } from '../../../../../../utils/Constants';
import { useTheme } from '@react-navigation/native';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { normalizeX, normalizeY, normalizeFont, openLink } from '../../../../../../utils/Utils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../../../component/common/Text'

export default Blogs = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()

    const response = useSelector(state => state.creditEducationReducer.response)
    const isError = useSelector(state => state.creditEducationReducer.isError)

    useEffect(() => {

        dispatch(fetchHubSpotBlogsAction())

        return function cleanUp() {
            dispatch(resetHubSpotBlogsAction())
        }

    }, [])

    const handleHubSpotBlogsResponse = () => {

        if (response) {


            return (
                <FlatList
                    data={response.objects}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    listEmptyComponent={listEmptyComponent}
                    style={{ marginBottom: normalizeY(250) }}

                />
            )
        }

    }

    const blogClicked = (item) => {

        if (isAndroid && getManufacturer() === 'Google') {
            openLink(item.absolute_url)

        } else {
            props.navigation.navigate('BlogDetailScreen', { data: item })
        }
    }

    const ItemView = ({ item }) => {

        return (

            <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]}
                style={styles.listItemContainerStyle}>

                <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => blogClicked(item)}>

                    <Image source={{ uri: item.featured_image }} resizeMode='stretch' style={{ width: normalizeX(50), height: normalizeY(50), borderRadius: 50 }} />

                    <Text numberOfLines={2} style={[styles.transactionDescriptionStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.label}</Text>



                </TouchableOpacity>
            </LinearGradient>

        );
    };


    const listEmptyComponent = () => {

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.noHistoryAvailableStyle, { color: myTheme.colors.LABEL_COLOR }]}>No Articles Available</Text>
            </View>
        )

    }

    return (
        <View stye={{ marginTop: normalizeY(10) }}>
            {handleHubSpotBlogsResponse()}
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
        flex: 1,
        marginVertical: normalizeY(8),
        height: normalizeY(70),
        borderRadius: 16,
        elevation: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
    },
    touchableOpacityStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: normalizeX(5),
    },

    transactionDescriptionStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(12),
        marginLeft: normalizeX(10),
        marginRight: normalizeX(20),
        fontWeight: '700',
    },

});