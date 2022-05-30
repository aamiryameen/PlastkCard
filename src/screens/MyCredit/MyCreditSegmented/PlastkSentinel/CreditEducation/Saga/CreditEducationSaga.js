import { put, takeLatest } from 'redux-saga/effects'


import { FETCH_HUBSPOT_BLOGS_ALL, FETCH_HUBSPOT_BLOGS_ALL_FAILURE, FETCH_HUBSPOT_BLOGS_ALL_SUCCESS, GENERIC_ERROR, getAuthenticationToken, HUBSPOT_API_KEY } from '../../../../../../utils/Constants';


function* fetchHubSpotBlogs(action) {

    let jsonResponse = ''
    let response = '';


    yield fetch('https://api.hubapi.com/content/api/v2/blog-posts?limit=50&hapikey=' + HUBSPOT_API_KEY, {

        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(action.payload)
    }
    ).then(data => {
        response = data
    }).catch((error) => {
        console.error('Error:', error);
    });

    if (response && response.status < 500) {
        jsonResponse = yield response.json()

        if (response.status === 200) {

            yield put({
                type: FETCH_HUBSPOT_BLOGS_ALL_SUCCESS,
                response: jsonResponse
            })
        }
        else {
            yield put({
                type: FETCH_HUBSPOT_BLOGS_ALL_FAILURE,
                response: jsonResponse
            })
        }
    }

    else {
        let response = {}
        response.message = GENERIC_ERROR
        yield put({
            type: FETCH_HUBSPOT_BLOGS_ALL_FAILURE,
            response: response
        })
    }

}


export function* creditEducationActionWatcher() {
    yield takeLatest(FETCH_HUBSPOT_BLOGS_ALL, fetchHubSpotBlogs);
}