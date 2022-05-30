
import { SCREEN_HEIGHT, SCREEN_WIDTH, BASE_UNIT_WIDTH, BASE_UNIT_HEIGHT, getAuthenticationToken } from './Constants';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import {
  Linking, View
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import Toast from 'react-native-simple-toast';
import { AppEventsLogger } from "react-native-fbsdk";
var Smartlook = require('smartlook-react-native-wrapper');
import Snackbar from 'react-native-snackbar';



export function normalizeFont(size, uncontrolled = false) {
  const fontSize = (SCREEN_HEIGHT / BASE_UNIT_HEIGHT) * size;
  if (uncontrolled) {
    return fontSize;
  } else {
    return fontSize > 20 ? 20 : fontSize;
  }
}

export function normalizeX(size) {
  return Math.round((SCREEN_WIDTH / BASE_UNIT_WIDTH) * size);
}

export function normalizeY(size) {
  return Math.round((SCREEN_HEIGHT / BASE_UNIT_HEIGHT) * size);
}


export async function saveDataInUserDefaults(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error saving data" + error);
  }
}

export async function getDataFromUserDefaults(key) {
  try {
    let item = await AsyncStorage.getItem(key);
    if (item !== null) {
      return item
    }

  } catch (error) {
    console.log("Error saving data" + error);
  }

  return undefined;
}

export function ValidateEmail(mail) {
  if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String.prototype.trim.call(mail))) {
    return (true)

  }
  return (false)
}
export function ValidatePassword(password) {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/.test(String.prototype.trim.call(password))) {
    return (true)
  }
  return (false)
}

export function openLink(link) {
  Linking.canOpenURL(link).then((supported) => {
    if (!supported) {
      //  console.warn('Can't handle url: ' + link);
    } else {
      return Linking.openURL(link);
    }
  }).catch((err) => {
    console.warn('An error occurred', err);
  });
}


export function isValidString(strValue) {
  var blnResult = false;
  if (strValue != undefined) {
    if (typeof (strValue) === 'string') {
      if (strValue.trim() != "") {
        blnResult = true;
      }
    }
  }
  return blnResult;
}


export function checkPermission(url, fileName) {

  request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE && PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Snackbar.show({
            text: 'This feature is not available (on this device / in this context)',
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
          break;
        case RESULTS.DENIED:

          Snackbar.show({
            text: 'File System permission denied. Unable to download Statement',
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
          break;
        case RESULTS.LIMITED:

          Snackbar.show({
            text: 'The permission is limited: some actions are possible',
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
          break;
        case RESULTS.GRANTED:
          downloadFile(url, fileName)
          break;
        case RESULTS.BLOCKED:

          Snackbar.show({
            text: 'File System permission denied. Unable to download Statement',
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
          break;
      }
    })
    .catch((error) => {
      console.Console(error)
    });
}


function downloadFile(url, fileName) {

  const { config, fs } = RNFetchBlob;
  const downloads = fs.dirs.DownloadDir;

 try {
  return config({

    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: 'text/plain',
      description: 'File downloaded by download manager.',
      path: downloads + '/' + fileName + '.pdf',
    }
  })
    .fetch('GET', url, {
      Authorization: 'Bearer ' + getAuthenticationToken()
    }).then(() => {
      logFireBaseEvent('statement_downloaded')
      Toast.showWithGravity('Your File is Downloaded Successfully ', Toast.LONG, Toast.TOP)
    }).catch((error) => {

      Snackbar.show({
        text: 'Error occurred while downloading statement',
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

      console.log(error)

    })

 } catch(error) {
   console.error(error)
 }
  
}

export async function logFireBaseEvent(eventName) {
  await analytics().logEvent(eventName)


  logFacebookAppEvent(eventName)
  smartLookCustomEvents(eventName)
}

export function logFacebookAppEvent(eventName) {
  AppEventsLogger.logEvent(eventName)
}

export function smartLookCustomEvents(eventName) {
  Smartlook.trackCustomEvent(eventName);
}
