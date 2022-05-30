
import React, { useEffect, useState } from 'react';
import { acceptDisclosureAgreementPressed, acceptTermsAndConditionsPressed, fetchCmsContent, resetCmsContent } from '../../../../screens/Profile/CMSContent/Action/CMSAction'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import Modal from '../../../../component/common/Modal'
import { normalizeFont, normalizeX, normalizeY, openLink } from '../../../../utils/Utils'
import Button from '../../../../component/common/Button'
import { View, StyleSheet, ScrollView } from 'react-native';
import { getAccountStatusAction, resetAccountStatusScreen } from '../../../Status/action/StatusAction';
import Text from '../../../../component/common/Text';
import { GENERIC_ERROR, isAndroid, mulish_regular } from '../../../../utils/Constants';
import Moment from 'moment';
import CustomLoader from '../../../../component/common/CustomLoader'
import Pdf from 'react-native-pdf';

import HTML from 'react-native-render-html';

import table, {
    IGNORED_TAGS, defaultTableStylesSpecs,
    cssRulesFromSpecs
} from '@native-html/table-plugin';
import WebView from 'react-native-webview';



export default CmsContent = (props) => {

    const myTheme = useTheme();

    const cssRules =
        cssRulesFromSpecs({
            ...defaultTableStylesSpecs,
            fontFamily: '"Open Sans"',
            textColor: 'red'

        }) +
        `
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;

}

`;



    const htmlProps = {
        WebView,
        renderers: {
            table,
            backgroundColor: '#000',
        },
        ignoredTags: IGNORED_TAGS,
        renderersProps: {
            table: {
                animationType: 'animated',
                backgroundColor: '#000',
                tableStyleSpecs: {
                    outerBorderWidthPx: 1,
                    rowsBorderWidthPx: 1,
                    columnsBorderWidthPx: 1,
                    trOddBackground: myTheme.colors.CARD_GRADIENT_FIRST_COLOR,
                    trEvenBackground: myTheme.colors.CARD_GRADIENT_FIRST_COLOR,

                },

            }
        }
    };


    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.cmsContentReducer.isLoading)
    const response = useSelector(state => state.cmsContentReducer.response)
    const isError = useSelector(state => state.cmsContentReducer.isError)
    const tncResponse = useSelector(state => state.cmsContentReducer.tncResponse)
    const userResponse = useSelector(state => state.accountStatusReducer.response)


    const [showAcceptButton, setShowAcceptButton] = useState(false)


    const showMessage = () => {

        if (response) {

            if (isError) {

                return (
                    <Modal responseMessage={response.message} modalType="error" onPress={() => { props.navigation.goBack() }} />
                )
            }
        }

    }

    useEffect(() => {

        let titleHeader = ""

        if (props.route.params.slugName === "aboutus") {
            titleHeader = "About Us"
        }
        else if (props.route.params.slugName === "termsofservice") {
            titleHeader = "Terms Of Service"
        }
        else if (props.route.params.slugName === "privacypolicy") {
            titleHeader = "Privacy Policy"
        }
        else if (props.route.params.slugName === "termsandconditions") {
            titleHeader = "Terms & Conditions"
        }
        else if (props.route.params.slugName === "creditagrement") {
            titleHeader = "Credit Agreement"
        }
        else if (props.route.params.slugName === "disclosureagreement") {
            titleHeader = "Disclosure Agreement"
        }
        else if (props.route.params.slugName === 'my-credit-score') {
            titleHeader = "Credit Score Agreement"
        }
        else if (props.route.params.slugName === 'plastk-sentinel-tandc') {
            titleHeader = "Plaskt Sentinel T&C"
        }
        props.navigation.setOptions({ headerTitle: titleHeader });

        dispatch(fetchCmsContent(props.route.params.slugName))

        return function cleanUp() {

            dispatch(resetCmsContent())

        }

    }, [])

    const buttonPressed = () => {

        if (props.route.params.slugName === 'termsandconditions')
            dispatch(acceptTermsAndConditionsPressed())
        else if (props.route.params.slugName === 'disclosureagreement')
            dispatch(acceptDisclosureAgreementPressed())
    }

    const getAcceptedTitle = () => {

        if (props.route.params.slugName === 'termsandconditions' && userResponse && userResponse.user.hasOwnProperty('tnc')) {
            return (
                <Text style={[styles.acceptedTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{'Accepted on : ' + Moment(userResponse.user.tnc).format('HH:MM a DD-MMM-YYYY')}</Text>
            )
        } else if (props.route.params.slugName === 'disclosureagreement' && userResponse && userResponse.user.hasOwnProperty('disclosure_agreement')) {
            return (
                <Text style={[styles.acceptedTextStyle, { color: myTheme.colors.LABEL_COLOR }]}>{'Accepted on : ' + Moment(userResponse.user.disclosure_agreement).format('HH:MM a DD-MMM-YYYY')}</Text>
            )
        }
    }

    const handleResponse = () => {

        if (tncResponse) {

            dispatch(resetAccountStatusScreen())
            props.navigation.goBack()

            setTimeout(() => {
                dispatch(getAccountStatusAction())
            }, 100);
        }

        else if (response) {
            try {
                if (!isError) {

                    let resp = ''

                    if (isAndroid) {

                        resp = 'data:application/pdf;base64,' + response.base64Key


                        return (

                            <View style={{ flex: 1 }}>
    
                                <Pdf
                                    source={{ uri: resp }}
                                    onError={() => { console.log('error') }}
                                    style={{ flex: 1, marginBottom: showAcceptButton ? 15 : 0 }}
    
                                    onPageChanged={(page, numberOfPages) => {
                                        if (page === numberOfPages && page !== 0 && props.route.params.isFirstOpen) {
                                            setShowAcceptButton(true)
                                        } else {
                                            setShowAcceptButton(false)
                                        }
                                    }}
    
                                    onPressLink={(uri) => {
                                        openLink(uri)
                                    }}
                                />
    
                                {props.route.params.isFirstOpen && showAcceptButton ?
                                    <Button title='Accept' onPress={() => buttonPressed()} />
                                    : null}
    
                            </View>
    
                        )


                    } else {
                        resp = response[0].htmlContent.replace(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/g, myTheme.colors.LABEL_COLOR)

                        let tagsStyles = {
                            iframe: {
                                  opacity: 0.99
                              },
                              table: {
                                opacity: 0.99
                            }
                          }
    
                        return (
    
                            <ScrollView style={{ marginBottom: normalizeY(20) }}>
                                <HTML tagsStyles={tagsStyles} source={{html: resp}} containerStyle={{}}  {...htmlProps} />
    
                                {props.route.params.isFirstOpen ?
                                    <Button title='Accept' onPress={() => buttonPressed()} />
                                    : null}
    
                            </ScrollView>
    
    
                        )
                    }

                    
                }
            }
            catch (error) {

                return (
                    <Modal responseMessage={GENERIC_ERROR} modalType="error" onPress={() => { props.navigation.goBack() }} />
                )
            }
        }
    }


    const getView = () => {

        if (isAndroid) {


            return (

                <View style={styles.slugStyle}>

                    {getAcceptedTitle()}

                    {handleResponse()}

                </View>
            )

        } else {

            return (
                <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.slugStyleIOS}>

                    {getAcceptedTitle()}
                    <ScrollView showsVerticalScrollIndicator={true} style={{}}>

                        {handleResponse()}

                    </ScrollView>
                </LinearGradient>
            )


        }
    }

    return (

        <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

            {getView()}


            {isLoading ?
                <CustomLoader /> : null
            }

            {showMessage()}
        </LinearGradient>

    );
};



const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"

    },
    slugStyle: {
        marginHorizontal: normalizeX(1),
        paddingHorizontal: normalizeX(10),
        borderRadius: 10,
        marginTop: normalizeY(10),
        marginBottom: normalizeY(20),
        flex: 1
    },
    acceptedTextStyle: {
        fontFamily: mulish_regular,
        fontSize: normalizeFont(16),
        fontWeight: '600',
        textAlign: 'center'
    },
    slugStyleIOS: {
        marginHorizontal: normalizeX(20),
        paddingHorizontal: normalizeX(10),
        borderRadius: 10,
        marginTop: normalizeY(10),
        marginBottom: normalizeY(20)
    },
});


