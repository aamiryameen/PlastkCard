import { put, takeLatest } from 'redux-saga/effects'
import { GENERIC_ERROR, getAuthenticationToken, isAndroid, LOGOUT_APP, UPDATE_PROFILE_PICTURE, UPDATE_PROFILE_PICTURE_FAILURE, UPDATE_PROFILE_PICTURE_SUCCESS } from '../../../utils/Constants';
import { getBaseUrl } from '../../../utils/WebService';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob'

function* updateProfilePicture(action) {

    try {

        let jsonResponse = ''
        let response = '';

        let url = action.imageUrl

        yield RNFetchBlob.fetch('POST', getBaseUrl() + 'users/update-user-picture', {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + getAuthenticationToken()

        }, [
            { name: 'profile_picture', filename: 'test.jpeg', type: action.mime, data: RNFetchBlob.wrap(isAndroid ? action.imageUrl : action.imageUrl.replace("file://", "")) },
        ]).then((resp) => {
            response = resp
        }).catch((err) => {
            console.log(err)
        })



        if (response && response.respInfo.status < 500) {
            jsonResponse = yield response.json()

            if (response.respInfo.status === 200) {
                if (jsonResponse.success === true) {
                    yield put({
                        type: UPDATE_PROFILE_PICTURE_SUCCESS,
                        response: jsonResponse
                    })

                }
                else if (jsonResponse.error === true) {

                    yield put({
                        type: UPDATE_PROFILE_PICTURE_FAILURE,
                        response: jsonResponse
                    })
                }
            }
            else {
                yield put({
                    type: UPDATE_PROFILE_PICTURE_FAILURE,
                    response: jsonResponse
                })
            }
        }
        else if (response && response.status === 522) {
            Toast.showWithGravity('Your Session has expired. Please login again to continue using the app', Toast.LONG, Toast.TOP);
            yield put({
                type: LOGOUT_APP,
            })

        }
        else {
            let response = {}
            response.message = GENERIC_ERROR
            response.error = true
            yield put({
                type: UPDATE_PROFILE_PICTURE_FAILURE,
                response: response
            })
        }

    } catch (error) {
        console.log(error)
        let response = {}
        response.message = GENERIC_ERROR
        response.error = true
        yield put({
            type: UPDATE_PROFILE_PICTURE_FAILURE,
            response: response
        })
    }
}

export function* profileActionWatcher() {
    yield takeLatest(UPDATE_PROFILE_PICTURE, updateProfilePicture);
}