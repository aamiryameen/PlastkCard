import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native'
import Text from '../../../component/common/Text'
import { normalizeFont, normalizeX, normalizeY } from '../../../utils/Utils'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInteracTransactionAction, resetInteracHistoryScreen } from '../Actions/InteracCodesActions';
import { getBaseUrl } from '../../../utils/WebService';
import { getAuthenticationToken } from '../../../utils/Constants';


export default HistoryScreen = (props) => {

    const myTheme = useTheme();

    const dispatch = useDispatch()

    const response = useSelector(state => state.interacCodesReducer.response)

    useEffect(() => {

        getUserStatus()

        return function cleanUp() {
            dispatch(resetInteracHistoryScreen())
        }

    }, [])


    async function getUserStatus() {

        let jsonResponse = ''
        let response = '';
        await fetch(getBaseUrl() + 'users/get-current-status', {

            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthenticationToken()
            },
        }
        ).then(data => {
            response = data
        }).catch((error) => {
            console.error('Error:', error);
        });

        if (response.status === 200) {
            jsonResponse = await response.json()

            let codes = jsonResponse.user.interac_reference_number

            if (codes && codes.length != 0 && codes[0].length != 0) {
                let obj = { ReferenceNumber: codes }
                dispatch(fetchInteracTransactionAction(obj))
            }

        }
    }

    const renderInteracTransactionHistory = () => {

        if (response) {
            return response.transaction.map((item, key) => {

                return (
                    <View style={[styles.container, { borderColor: myTheme.colors.HISTORY_BORDER_COLOR }]} key={key}>

                        <Text style={[styles.headingStyle, { color: myTheme.colors.LABEL_COLOR }]}>Transaction details</Text>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Bank Name : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1} >{item.SenderBankName}</Text>
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Sender Name : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]} numberOfLines={1}>{item.SenderName}</Text>
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Amount : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.Amount}</Text>
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR }]}>Reference Number : </Text>
                            <Text style={[styles.textStyle, { color: myTheme.colors.LABEL_COLOR }]}>{item.ReferenceNumber}</Text>
                        </View>
                    </View>
                )
            })
        }

    }

    return (
        <View style={{ width: "100%" }}  >
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: normalizeY(100) }}>
                {renderInteracTransactionHistory()}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        marginTop: normalizeY(10),
        padding: normalizeX(10),
        flex: 1,
        width: "100%",
        borderRadius: 10

    },
    headingStyle: {
        fontWeight: 'bold',
        fontSize: normalizeFont(16),
    },
    rowStyle: {
        flexDirection: 'row',
        marginTop: normalizeY(5),
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: normalizeFont(12),
        color: '#000000',
        opacity: 0.65,
    },
    textStyle: {
        flex: 1,
        fontSize: normalizeFont(12),
        color: '#000000',
        opacity: 0.65,
    },
})