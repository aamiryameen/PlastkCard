import { getApplicationName } from 'react-native-device-info';

const LIVE_URL = 'https://service.plastk.ca/'   // Live API

const UAT_URL = 'https://dev.service.plastk.ca/'  // Staging API

export function getBaseUrl() {
    if (getApplicationName().includes('UAT'))
        return UAT_URL
    else
        return LIVE_URL
}