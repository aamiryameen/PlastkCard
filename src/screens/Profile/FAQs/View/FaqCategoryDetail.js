import React, { useEffect } from 'react'

import { View, StyleSheet, ScrollView, StatusBar } from 'react-native'

import CustomLoader from '../../../../component/common/CustomLoader'

import { useSelector, useDispatch } from 'react-redux'
import AccordionComponent from '../../../../component/common/AccordionExpandingView'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native'
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils'

import Snackbar from 'react-native-snackbar';
import { GENERIC_ERROR } from '../../../../utils/Constants'
import { getFAQSByCategory, resetFAQSByCategory } from '../Actions/FaqActions'


export default FaqCategoryDetail = (props) => {

    const myTheme = useTheme()

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.faqReducer.categoryLoading)
    const isError = useSelector(state => state.faqReducer.categoryError)
    const searchResponse = useSelector(state => state.faqReducer.categoryResponse)

    useEffect(() => {

        props.navigation.setOptions({ headerTitle: props.route.params.categoryName });



        dispatch(getFAQSByCategory(props.route.params.categoryName))

        return () => {
            dispatch(resetFAQSByCategory())
        }

    }, [])

    const getResponseView = () => {
        if (isError) {

            Snackbar.show({
                text: GENERIC_ERROR,
                duration: Snackbar.LENGTH_INDEFINITE,
                textColor: 'white',
                numberOfLines: 4,
                backgroundColor: 'red',
                action: {
                    text: 'X',
                    textColor: 'white',
                    onPress: () => { Snackbar.dismiss() },
                },
            });

        } else {
            if (searchResponse !== '') {

                try {

                    if (searchResponse[0].faqs.items.length === 0) {
                        return (
                            <View style={{ marginTop: normalizeY(15), marginHorizontal: normalizeX(2) }}>
                                <Text style={{ color: myTheme.colors.LABEL_COLOR, textAlign: 'center' }}>No Data Available</Text>
                            </View>
                        )
                    } else {

                        return (
                            <View style={{ marginTop: normalizeY(15), marginHorizontal: normalizeX(2),paddingBottom:2}}>
                                <AccordionComponent searchResponse={searchResponse[0].faqs.items} />
                            </View>
                        )
                    }
                }

                catch (error) {

                    Snackbar.show({
                        text: GENERIC_ERROR,
                        duration: Snackbar.LENGTH_INDEFINITE,
                        textColor: 'white',
                        numberOfLines: 4,
                        backgroundColor: 'red',
                        action: {
                            text: 'X',
                            textColor: 'white',
                            onPress: () => { Snackbar.dismiss() },
                        },
                    });
        
                }

            }

        }
    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={{ flex: 1 }}>

            <StatusBar barStyle={myTheme.colors.STATUS_BAR_STYLE} backgroundColor={myTheme.colors.GRADIENT_FIRST_COLOR} />


            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

                {getResponseView()}

            </ScrollView>

            {isLoading && <CustomLoader />}

        </LinearGradient>
    );
}
const styles = StyleSheet.create({

    push_notification_container: {
        flexDirection: "row",
    },
    body: {
        flex: 1,
        marginHorizontal: normalizeX(10),
        marginBottom: normalizeY(20)
    },
    work_container: {
        borderRadius: 10,
        elevation: 5,
        paddingTop: normalizeY(40),
        paddingBottom: normalizeY(40),
        justifyContent: "center",
        marginTop: normalizeY(20)
    },

    placeholder_container: {
        marginTop: normalizeY(30),
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
        borderWidth: 1
    },
    listItemContainerStyle: {
        flex: 1,
        paddingHorizontal: normalizeX(5),
        marginHorizontal: normalizeX(2),
        marginVertical: normalizeY(8),
        paddingVertical: normalizeY(12),
        borderRadius: 16,
        elevation: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 }
    },

})





