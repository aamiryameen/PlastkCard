import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_AND_OPEN_GRS_URL, GENERIC_ERROR, getAuthenticationToken, getEmail } from '../../../utils/Constants';
import { logFireBaseEvent, openLink } from '../../../utils/Utils';
import { getBaseUrl } from '../../../utils/WebService';

import Snackbar from 'react-native-snackbar';


function* getRewardsUrl(action) {

    try {
        let jsonResponse = ''
        let response = '';

        yield fetch(getBaseUrl() + 'grs/get-member-session/' + getEmail(), {

            method: 'GET',
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

        if (response && response.status < 500) {
            jsonResponse = yield response.json()

            if (response.status === 200 || response.status === 201) {
                if (jsonResponse.success === true) {

                    logFireBaseEvent('grs_opened')

                    openLink(jsonResponse.data.url)

                }
                else if (jsonResponse.error === true) {

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
            else {
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
        else {
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

export function* rewardsGRSUrlActionWatcher() {
    yield takeLatest(FETCH_AND_OPEN_GRS_URL, getRewardsUrl);
}