import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const THEME = '#F26322'
export const TEXT = 'black'
export const GREY = 'grey'
export const LIGHT_GREY = 'rgb(170, 170, 170)'
export const WHITE_GREY = 'rgb(240, 240, 240)'
export const DARK_GREY = 'rgb(110, 110, 110)'
export const BLACK_GREY = 'rgb(80, 80, 80)'
export const RED = 'rgb(204, 0, 5)'
export const BLACK = 'black'
export const WHITE = 'white'
export const GREEN = 'rgb(89, 149, 51)'
export const LIGHT_GREEN = 'rgb(102, 211, 18)'
export const DIVIDER = 'rgb(200, 200, 200)'
export const GANDAM = 'rgb(242, 238, 214)'

export const SCREEN_WIDTH = width;
export const isIOS = Platform.OS === 'ios' ? true : false;
export const isAndroid = Platform.OS === 'android' ? true : false;
export const SCREEN_HEIGHT = height;
export const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
export const BASE_UNIT_WIDTH = 320;
export const BASE_UNIT_HEIGHT = 640;
export const BASE_ASPECT_RATIO = BASE_UNIT_HEIGHT / BASE_UNIT_WIDTH;
export const ASPECT_DIFF = ASPECT_RATIO / BASE_ASPECT_RATIO;

export const colorWhiteffffff = '#ffffff'
export const colorDarkGreen193628 = '#193628'
export const colorGreen00c464 = '#00c464'
export const colorLightGreenebfbf3 = '#ebfbf3'
export const imageApiUrl = "http://66.70.142.76:82/"
export const colorPrimary = "#3bb848"
export const colorPrimaryDark = "#319a30"
export const colorAccent = "#319a30"
export const colorAccentSecondary = "#1aad77"
export const colorDarkGraycolorGray = "#D3D3D3"
export const colorDarkGray = "#757575"
export const colorBlack = "#000000"
export const colorOrange = "#FF5722"
export const colorLogo = "#06B057"
export const colorGoogleEA4235 = "#EA4235"
export const colorFacebook = "#3B579D"
export const coloryellow = "#F4D03F"
export const colorRedDC143C = "#DC143C"
export const gray = "#8F92A1"
export const ligh_green = "#A1C452"
export const brightyellow = "#fecf31"
export const Moderateyellow = "#aac452"
export const BrightRed = "#fe5c31"
export const UnSelectedButtonColor = '#F9F9F9'
export const UnSelectedButtonTextColor = '#787574'
export const LightThemeBackGroundColor = '#FCFCFC'

export const GENERIC_ERROR = 'Error occurred. Please try again later'

export const MULTIPLE_INVALID_LOGIN_ERROR = 'Multiple wrong attempts done. Please login with email and password'

export const EQUIFAX_DISCLAIMER_MESSAGE = 'Disclaimer\n\n¹ "Equifax  Canada Co. ("Equifax") is a registered Canadian credit bureau that maintains your Canadian consumer credit file, which has been used by Plastk Financial & Rewards Inc. as permitted by you, to provide you with your educational Equifax credit score. The Equifax credit score provided here is current as of the date indicated by Plastk Financial & Rewards Inc. \n\n² "the Equifax Risk Score [or Equifax credit score] is based on Equifax\'s proprietary model and may not be the same score used by third parties to assess your creditworthiness.  The provision of this score to you is intended for your own educational use.  Third parties will take into consideration other information in addition to a credit score when evaluating your creditworthiness."'


export const HUBSPOT_API_KEY = '3beb074d-16ff-4e94-872e-03b8d2c10f21'
export const SMART_LOOK_API_KEY = '816812c452bdd403fa1ae46be7ec1968442d2487'

export const GOOGLE_PLACES_API_KEY = 'AIzaSyCRQbuzB7296abvanXJON4x7_PcoR_MKLo'

export const KEYCHAIN_PIN_KEY = 'PlastkPinCode'
export const KEYCHAIN_EMAIL_KEY = 'PlastkEmailPassword'

export const IS_FINGER_PRINT_LOGIN_REGISTERED = 'IS_FINGER_PRINT_LOGIN_REGISTERED'
export const IS_PIN_CODE_LOGIN_REGISTERED = 'IS_PIN_CODE_LOGIN_REGISTERED'

export const IS_FIRST_TIME_LOGIN = 'IS_FIRST_TIME_LOGIN'

export const LOGIN_TRIES = 'login_tries'

export const mulish_regular = "Mulish-Regular"
export const mulish_bold = "Mulish-Bold"
export const mulish_medium = "Mulish-Medium"

export const flex_direction_row = "row"
export const alignItems_center = "center"
export const justifycontent_center = "center"

//ViewType

export const SIGN_IN_SCREEN = 'SIGN_IN_SCREEN'
export const PIN_CODE_SIGN_IN_SCREEN = 'PIN_CODE_SIGN_IN_SCREEN'
export const FINGER_PRINT_SIGN_IN_SCREEN = 'FINGER_PRINT_SIGN_IN_SCREEN'
export const REGISTER_VIA_PIN_CODE_SCREEN = 'REGISTER_VIA_PIN_CODE_SCREEN'
export const REGISTER_VIA_FINGER_PRINT_SCREEN = 'REGISTER_VIA_FINGER_PRINT_SCREEN'
export const SKIP_REGISTER_SECURE_LOGIN_SCREEN = 'SKIP_REGISTER_SECURE_LOGIN_SCREEN'
export const SET_PASSWORD_SCREEN = 'SET_PASSWORD_SCREEN'
export const FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN = 'FORGOT_PASSWORD_EMAIL_SUCCESS_SCREEN'

export const DASHBOARD_MY_CARD_DAILY = 'DASHBOARD_MY_CARD_DAILY'
export const DASHBOARD_MY_CARD_WEEKLY = 'DASHBOARD_MY_CARD_WEEKLY'
export const DASHBOARD_MY_CARD_MONTHLY = 'DASHBOARD_MY_CARD_MONTHLY'
export const DASHBOARD_MY_POINTS_DAILY = 'DASHBOARD_MY_POINTS_DAILY'
export const DASHBOARD_MY_POINTS_WEEKLY = 'DASHBOARD_MY_POINTS_WEEKLY'
export const DASHBOARD_MY_POINTS_MONTHLY = 'DASHBOARD_MY_POINTS_MONTHLY'

export const PLASTK_CARD_WEEKLY = 'PLASTK_CARD_WEEKLY'
export const PLASTK_CARD_MONTHLY = 'PLASTK_CARD_MONTHLY'
export const PLASTK_CARD_YEARLY = 'PLASTK_CARD_YEARLY'

export const ALL_STATEMENT_SCREEN = 'ALL_STATEMENT_SCREEN'

export const FCS_REGISTER_SCREEN = 'FCS_REGISTER_SCREEN'

// Actions
export const RESET_SIGNUP_DATA_OBJECT = 'RESET_SIGNUP_DATA_OBJECT'
export const UPDATE_SIGN_UP_DATA_OBJECT = 'UPDATE_SIGN_UP_DATA_OBJECT'
export const PERFORM_SIGN_UP = 'PERFORM_SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
export const RESET_SIGN_UP_SCREEN = 'RESET_SIGN_UP_SCREEN'
export const VALIDATE_SET_PASSWORD_TOKEN_SIGNUP = 'VALIDATE_SET_PASSWORD_TOKEN_SIGNUP'
export const VALID_SET_PASSWORD_TOKEN_SIGNUP = 'VALID_SET_PASSWORD_TOKEN_SIGNUP'
export const INVALID_SET_PASSWORD_TOKEN_SIGNUP = 'INVALID_SET_PASSWORD_TOKEN_SIGNUP'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'
export const RESET_FORGOT_PASSWORD_SCREEN = 'RESET_FORGOT_PASSWORD_SCREEN'
export const PERFORM_SET_PASSWORD = "PERFORM_SET_PASSWORD"
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS"
export const SET_PASSWORD_FAILURE = "SET_PASSWORD_FAILURE"
export const RESET_SET_PASSWORD_SCREEN = 'RESET_SET_PASSWORD_SCREEN'
export const PERFORM_EMAIL_PASSWORD_SIGN_IN = 'PERFORM_EMAIL_PASSWORD_SIGN_IN'
export const EMAIL_PASSWORD_SIGN_IN_SUCCESS = 'EMAIL_PASSWORD_SIGN_IN_SUCCESS'
export const EMAIL_PASSWORD_SIGN_IN_FAILURE = 'EMAIL_PASSWORD_SIGN_IN_FAILURE'
export const RESET_EMAIL_PASSWORD_SIGN_IN = 'RESET_EMAIL_PASSWORD_SIGN_IN'

export const VALIDATE_SET_PASSWORD_TOKEN = 'VALIDATE_SET_PASSWORD_TOKEN'
export const VALID_SET_PASSWORD_TOKEN = 'VALID_SET_PASSWORD_TOKEN'
export const INVALID_SET_PASSWORD_TOKEN = 'INVALID_SET_PASSWORD_TOKEN'

export const FETCH_ACCOUNT_STATUS = "FETCH_ACCOUNT_STATUS"
export const ACCOUNT_STATUS_FAILURE = "ACCOUNT_STATUS_FAILURE"
export const ACCOUNT_STATUS_SUCCESS = "ACCOUNT_STATUS_SUCCESS"

export const FETCH_INTERAC_TRANSACTION = 'FETCH_INTERAC_TRANSACTION'
export const INTERAC_TRANSACTION_SUCCESS = 'INTERAC_TRANSACTION_SUCCESS'
export const INTERAC_TRANSACTION_FAILURE = 'INTERAC_TRANSACTION_FAILURE'

export const SUBMIT_INTERAC_CODE = 'SUBMIT_INTERAC_CODE'
export const INTERAC_CODE_SUBMISSION_SUCCESS = 'INTERAC_CODE_SUBMISSION_SUCCESS'
export const INTERAC_CODE_SUBMISSION_FAILURE = 'INTERAC_CODE_SUBMISSION_FAILURE'
export const RESET_INTERAC_CODE_SCREEN = 'RESET_INTERAC_CODE_SCREEN'
export const USE_CURRENT_AS_LIMIT = 'USE_CURRENT_AS_LIMIT'
export const USE_CURRENT_AS_LIMIT_SUCCESS = 'USE_CURRENT_AS_LIMIT_SUCCESS'
export const USE_CURRENT_AS_LIMIT_FAILURE = 'USE_CURRENT_AS_LIMIT_FAILURE'
export const RESET_INTERAC_HISTORY_SCREEN = 'RESET_INTERAC_HISTORY_SCREEN'
export const USER_RESPONSE_RECEIVED = 'USER_RESPONSE_RECEIVED'

export const CREATE_APPLICATION = 'CREATE_APPLICATION'
export const CREATE_APPLICATION_SUCCESS = 'CREATE_APPLICATION_SUCCESS'
export const CREATE_APPLICATION_FAILURE = 'CREATE_APPLICATION_FAILURE'

export const FETCH_ACCOUNT_STATUS_INTERAC_SCREEN = 'FETCH_ACCOUNT_STATUS_INTERAC_SCREEN'
export const ACCOUNT_STATUS_INTERAC_SCREEN_SUCCESS = 'ACCOUNT_STATUS_INTERAC_SCREEN_SUCCESS'
export const ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE = 'ACCOUNT_STATUS_INTERAC_SCREEN_FAILURE'

export const RESET_COMPLETE_INTERAC_CODES_SCREEN = 'RESET_COMPLETE_INTERAC_CODES_SCREEN'

export const SEND_OTP_CARD_ACTIVATION = 'SEND_OTP_CARD_ACTIVATION'
export const OTP_CARD_ACTIVATION_SUCCESS = 'OTP_CARD_ACTIVATION_SUCCESS'
export const OTP_CARD_ACTIVATION_FAILURE = 'OTP_CARD_ACTIVATION_FAILURE'

export const ACTIVATE_CARD = 'ACTIVATE_CARD'
export const ACTIVATE_CARD_SUCCESS = 'ACTIVATE_CARD_SUCCESS'
export const ACTIVATE_CARD_FAILURE = 'ACTIVATE_CARD_FAILURE'
export const RESET_ACTIVATE_CARD_SCREEN = 'RESET_ACTIVATE_CARD_SCREEN'

export const CONTENT_SCREEN_SUCCESS = 'CONTENT_SCREEN_SUCCESS'
export const CONTENT_SCREEN_FAILURE = 'CONTENT_SCREEN_FAILURE'
export const FETCH_CONTENT_SCREENS = 'FETCH_CONTENT_SCREENS'

export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const LOGOUT_APP = 'LOGOUT_APP'
export const PROFILE_ACTIVE = 'PROFILE_ACTIVE'

export const FETCH_SPENDING_INSIGHTS = 'FETCH_SPENDING_INSIGHTS'
export const SPENDING_INSIGHTS_SUCCESS = 'SPENDING_INSIGHTS_SUCCESS'
export const SPENDING_INSIGHTS_FAILURE = 'SPENDING_INSIGHTS_FAILURE'

export const FETCH_CHANGE_PASSWORD = 'FETCH_CHANGE_PASSWORD'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'
export const CHANGE_PASSWORD_RESET = 'CHANGE_PASSWORD_RESET'

export const FETCH_TRANSACTION_HISTORY = 'FETCH_TRANSACTION_HISTORY'
export const TRANSACTION_HISTORY_SUCCESS = 'TRANSACTION_HISTORY_SUCCESS'
export const TRANSACTION_HISTORY_FAILURE = 'TRANSACTION_HISTORY_FAILURE'
export const RESET_TRANSACTION_HISTORY = 'RESET_TRANSACTION_HISTORY'
export const RESET_TRANSACTION_HISTORY_COMPLETE = 'RESET_TRANSACTION_HISTORY_COMPLETE'

export const FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION = "FETCH_TRANSACTION_HISTORY_BY_DESCRIPTION"
export const FETCH_TRANSACTION_HISTORY_BY_DATE = "FETCH_TRANSACTION_HISTORY_BY_DATE"

export const FETCH_CMS_CONTENT = 'FETCH_CMS_CONTENT'
export const CMS_CONTENT_SUCCESS = 'CMS_CONTENT_SUCCESS'
export const CMS_CONTENT_FAILURE = 'CMS_CONTENT_FAILURE'
export const RESET_CMS_CONTENT = 'RESET_CMS_SCREEN'

export const FETCH_CHART_DATA = 'FETCH_CHART_DATA'
export const CHART_DATA_SUCCESS = 'CHART_DATA_SUCCESS'
export const CHART_DATA_FAILURE = 'CHART_DATA_FAILURE'

export const FETCH_MY_CARD_INFO = 'FETCH_MY_CARD_INFO'
export const MY_CARD_INFO_SUCCESS = 'MY_CARD_INFO_SUCCESS'
export const MY_CARD_INFO_FAILURE = 'MY_CARD_INFO_FAILURE'

export const FETCH_FEEDBACK = 'FETCH_FEEDBACK'
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS'
export const FEEDBACK_FAILURE = 'FEEDBACK_FAILURE'
export const FEEDBACK_RESET = 'FEEDBACK_RESET'

export const FETCH_ALL_STATEMENTS = 'FETCH_ALL_STATEMENTS'
export const ALL_STATEMENTS_SUCCESS = 'ALL_STATEMENTS_SUCCESS'
export const ALL_STATEMENTS_FAILURE = 'ALL_STATEMENTS_FAILURE'
export const RESET_ALL_STATEMENTS_SCREEN = 'RESET_ALL_STATEMENTS_SCREEN'

export const SUBMIT_INTERAC_CODE_PAYMENT = 'SUBMIT_INTERAC_CODE_PAYMENT'
export const INTERAC_CODE_PAYMENT_SUCCESS = 'INTERAC_CODE_PAYMENT_SUCCESS'
export const INTERAC_CODE_PAYMENT_FAILURE = 'INTERAC_CODE_PAYMENT_FAILURE'
export const RESET_INTERAC_CODE_PAYMENT = 'RESET_INTERAC_CODE_PAYMENT'

export const FETCH_INTERAC_CODE_PAYMENT_HISTORY = 'FETCH_INTERAC_CODE_PAYMENT_HISTORY'
export const INTERAC_CODE_PAYMENT_HISTORY_SUCCESS = 'INTERAC_CODE_PAYMENT_HISTORY_SUCCESS'
export const INTERAC_CODE_PAYMENT_HISTORY_FAILURE = 'INTERAC_CODE_PAYMENT_HISTORY_FAILURE'
export const RESET_INTERAC_CODE_HISTORY_SCREEN = 'RESET_INTERAC_CODE_HISTORY_SCREEN'
export const RESET_INTERAC_CODE_PAYMENT_COMPLETE = 'RESET_INTERAC_CODE_PAYMENT_COMPLETE'


export const SUBMIT_REQUEST_CREDIT_LINE = 'SUBMIT_REQUEST_CREDIT_LINE'
export const REQUEST_CREDIT_LINE_SUCCESS = 'REQUEST_CREDIT_LINE_SUCCESS'
export const REQUEST_CREDIT_LINE_FAILURE = 'REQUEST_CREDIT_LINE_FAILURE'
export const RESET_REQUEST_CREDIT_LINE = 'RESET_REQUEST_CREDIT_LINE'
export const REQUEST_CREDIT_LIMIT_PENDING = 'REQUEST_CREDIT_LIMIT_PENDING'
export const REQUEST_CREDIT_PENDING_SUCCESS = 'REQUEST_CREDIT_PENDING_SUCCESS'
export const REQUEST_CREDIT_PENDING_FAILURE = 'REQUEST_CREDIT_PENDING_FAILURE'
export const RESET_CREDIT_LIMIT_INCREASE_PENDING = 'RESET_CREDIT_LIMIT_INCREASE_PENDING'


export const FETCH_REQUEST_CREDIT_LINE_HISTORY = 'FETCH_REQUEST_CREDIT_LINE_HISTORY'
export const REQUEST_CREDIT_LINE_HISTORY_SUCCESS = 'REQUEST_CREDIT_LINE_HISTORY_SUCCESS'
export const REQUEST_CREDIT_LINE_HISTORY_FAILURE = 'REQUEST_CREDIT_LINE_HISTORY_FAILURE'
export const RESET_REQUEST_CREDIT_LINE_HISTORY_SCREEN = 'RESET_REQUEST_CREDIT_LINE_HISTORY_SCREEN'
export const RESET_CREDIT_LINE_COMPLETE_HISTORY = 'RESET_CREDIT_LINE_COMPLETE_HISTORY'

export const FETCH_POINTS_INFO_DASHBOARD = 'FETCH_POINTS_INFO_DASHBOARD'
export const POINTS_INFO_DASHBOARD_SUCCESS = 'POINTS_INFO_DASHBOARD_SUCCESS'
export const POINTS_INFO_DASHBOARD_FAILURE = 'POINTS_INFO_DASHBOARD_FAILURE'

export const ACCEPT_TERMS_AND_CONDITIONS_PRESSED = 'ACCEPT_TERMS_AND_CONDITIONS_PRESSED'
export const ACCEPT_TERMS_AND_CONDITIONS_SUCCESS = 'ACCEPT_TERMS_AND_CONDITIONS_SUCCESS'
export const ACCEPT_TERMS_AND_CONDITIONS_FAILURE = 'ACCEPT_TERMS_AND_CONDITIONS_FAILURE'


export const ACCEPT_DISCLOSURE_AGREEMENT_PRESSED = 'ACCEPT_DISCLOSURE_AGREEMENT_PRESSED'
export const ACCEPT_DISCLOSURE_AGREEMENT_SUCCESS = 'ACCEPT_DISCLOSURE_AGREEMENT_SUCCESS'
export const ACCEPT_DISCLOSURE_AGREEMENT_FAILURE = 'ACCEPT_DISCLOSURE_AGREEMENT_FAILURE'

export const RESEND_FORGOT_PASSWORD = 'RESEND_FORGOT_PASSWORD'
export const RESEND_FORGOT_PASSWORD_SUCCESS = 'RESEND_FORGOT_PASSWORD_SUCCESS'
export const RESEND_FORGOT_PASSWORD_FAILURE = 'RESEND_FORGOT_PASSWORD_FAILURE'
export const RESET_RESEND_FORGOT_PASSWORD_SCREEN = 'RESET_RESEND_FORGOT_PASSWORD_SCREEN'

export const FETCH_USER_IP = 'FETCH_USER_IP'

export const CHECK_EMAIL_VERIFIED = 'CHECK_EMAIL_VERIFIED'
export const EMAIL_VERIFIED_SUCCESS = 'EMAIL_VERIFIED_SUCCESS'
export const EMAIL_VERIFIED_FAILURE = 'EMAIL_VERIFIED_FAILURE'

export const RESEND_VERIFICATION_EMAIL = 'RESEND_VERIFICATION_EMAIL'
export const RESEND_VERIFICATION_EMAIL_SUCCESS = 'RESEND_VERIFICATION_EMAIL_SUCCESS'
export const RESEND_VERIFICATION_EMAIL_FAILURE = 'RESEND_VERIFICATION_EMAIL_FAILURE'

export const RESET_ACCOUNT_STATUS_SCREEN = 'RESET_ACCOUNT_STATUS_SCREEN'

export const VALIDATE_EMAIL_TOKEN = 'VALIDATE_EMAIL_TOKEN'
export const VALIDATE_EMAIL_TOKEN_SUCCESS = 'VALIDATE_EMAIL_TOKEN_SUCCESS'
export const VALIDATE_EMAIL_TOKEN_FAILURE = 'VALIDATE_EMAIL_TOKEN_FAILURE'

export const AUTO_SEND_VERIFICATION_EMAIL = 'AUTO_SEND_VERIFICATION_EMAIL'


export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE'
export const UPDATE_PROFILE_PICTURE_SUCCESS = 'UPDATE_PROFILE_PICTURE_SUCCESS'
export const UPDATE_PROFILE_PICTURE_FAILURE = 'UPDATE_PROFILE_PICTURE_FAILURE'
export const RESET_PROFILE_SCREEN = 'RESET_PROFILE_SCREEN'



export const FETCH_HUBSPOT_BLOGS_ALL = 'FETCH_HUBSPOT_BLOGS_ALL'
export const FETCH_HUBSPOT_BLOGS_ALL_SUCCESS = 'FETCH_HUBSPOT_BLOGS_ALL_SUCCESS'
export const FETCH_HUBSPOT_BLOGS_ALL_FAILURE = 'FETCH_HUBSPOT_BLOGS_ALL_FAILURE'

export const RESET_HUBSPOT_BLOGS = 'RESET_HUBSPOT_BLOGS'

export const FETCH_HUBSPOT_FCS_BLOGS_ALL = 'FETCH_HUBSPOT_FCS_BLOGS_ALL'
export const FETCH_HUBSPOT_BLOGS_FCS_ALL_SUCCESS = 'FETCH_HUBSPOT_BLOGS_FCS_ALL_SUCCESS'
export const FETCH_HUBSPOT_BLOGS__FCS_ALL_FAILURE = 'FETCH_HUBSPOT_BLOGS_FCS_ALL_FAILURE'
export const RESET_HUBSPOT_FCS_BLOGS = 'RESET_HUBSPOT_FCS_BLOGS'




export const CHANGE_ADDRESS_SUCCESS = "CHANGE_ADDRESS_SUCCESS"
export const CHANGE_ADDRESS_FAILURE = "CHANGE_ADDRESS_FAILURE"
export const PERFROM_CHANGE_ADDRESS = "PERFROM_CHANGE_ADDRESS"
export const RESET_CHANGE_ADDRESS = "RESET_CHANGE_ADDRESS"




export const START_EID_VERIFICATION = 'START_EID_VERIFICATION'
export const FETCH_EID_QUESTIONS = 'FETCH_EID_QUESTIONS'
export const EID_QUESTIONS_SUCCESS = 'EID_QUESTIONS_SUCCESS'
export const EID_QUESTION_FAILURE = 'EID_QUESTION_FAILURE'
export const SUBMIT_EID_ANSWERS = 'SUBMIT_EID_ANSWERS'
export const EID_ANSWERS_SUCCESS = 'EID_ANSWERS_SUCCESS'
export const EID_ANSWERS_FAILURE = 'EID_ANSWERS_FAILURE'
export const RESET_EID_VERIFICATION_SCREEN = 'RESET_EID_VERIFICATION_SCREEN'

export const FETCH_CREDIT_FILE = 'FETCH_CREDIT_FILE'
export const CREDIT_FILE_SUCCESS = 'CREDIT_FILE_SUCCESS'
export const CREDIT_FILE_FAILURE = 'CREDIT_FILE_FAILURE'


export const ACCEPT_EQUIFAX_DISCLAIMER = 'ACCEPT_EQUIFAX_DISCLAIMER'
export const EQUIFAX_DISCLAIMER_SUCCESS = 'EQUIFAX_DISCLAIMER_SUCCESS'
export const EQUIFAX_DISCLAIMER_FAILURE = 'EQUIFAX_DISCLAIMER_FAILURE'
export const RESET_EQUIFAX_DISCLAIMER = 'RESET_EQUIFAX_DISCLAIMER'





export const FSC_REGISTER_PRESSED = 'FSC_REGISTER_PRESSED'
export const FSC_REGISTER_SUCCESS = 'FSC_REGISTER_SUCCESS'
export const FSC_REGISTER_FAILURE = 'FSC_REGISTER_FAILURE'
export const RESET_FSC_REGISTER_SCREEN = 'RESET_FSC_REGISTER_SCREEN'


export const FCS_SIGN_UP_PRESSED = 'FCS_SIGN_UP_PRESSED'
export const FCS_SIGN_UP_SUCCESS = 'FCS_SIGN_UP_SUCCESS'
export const FCS_SIGN_UP_FAILURE = 'FCS_SIGN_UP_FAILURE'
export const RESET_FCS_SIGN_UP = 'RESET_FCS_SIGN_UP'

export const UPDATE_FCS_SIGNUP_DATA = 'UPDATE_FCS_SIGNUP_DATA'
export const RESET_FCS_SIGNUP_DATA = 'RESET_FCS_SIGNUP_DATA'


export const FCS_GET_STATUS = 'FCS_GET_STATUS'
export const FCS_GET_STATUS_SUCCESS = 'FCS_GET_STATUS_SUCCESS'
export const FCS_GET_STATUS_FAILURE = 'FCS_GET_STATUS_FAILURE'


export const FCS_RESEND_OTP = 'FCS_RESEND_OTP'


export const FCS_APPLY_PLASTK_CARD = 'FCS_APPLY_PLASTK_CARD'
export const FCS_APPLY_PLASTK_CARD_SUCCESS = 'FCS_APPLY_PLASTK_CARD_SUCCESS'
export const FCS_APPLY_PLASTK_CARD_FAILURE = 'FCS_APPLY_PLASTK_CARD_FAILURE'

export const FCS_RESET_APPLY_PLASTK_CARD = 'FCS_RESET_APPLY_PLASTK_CARD'


export const FCS_SUBMIT_TNC = 'FCS_SUBMIT_TNC'
export const FCS_SUBMIT_TNC_SUCCESS = 'FCS_SUBMIT_TNC_SUCCESS'
export const FCS_SUBMIT_TNC_FAILURE = 'FCS_SUBMIT_TNC_FAILURE'



export const MY_CREDIT_SUBMIT_TNC = 'MY_CREDIT_SUBMIT_TNC'
export const MY_CREDIT_SUBMIT_TNC_SUCCESS = 'MY_CREDIT_SUBMIT_TNC_SUCCESS'
export const MY_CREDIT_SUBMIT_TNC_FAILURE = 'MY_CREDIT_SUBMIT_TNC_FAILURE'


export const FETCH_PDF_STATEMENTS = 'FETCH_PDF_STATEMENTS'
export const PDF_STATEMENTS_SUCCESS = 'PDF_STATEMENTS_SUCCESS'
export const PDF_STATEMENTS_FAILURE = 'PDF_STATEMENTS_FAILURE'
export const RESET_PDF_STATEMENTS = 'RESET_PDF_STATEMENTS'

export const FETCH_AND_OPEN_GRS_URL = 'FETCH_AND_OPEN_GRS_URL'


export const GET_ALL_FAQS = 'GET_ALL_FAQS'
export const GET_ALL_FAQS_SUCCESS = 'GET_ALL_FAQS_SUCCESS'
export const GET_ALL_FAQS_FAULIRE = 'GET_ALL_FAQS_FAULIRE'
export const SEARCH_FAQS = 'SEARCH_FAQS'
export const SEARCH_FAQ_SUCCESS = 'SEARCH_FAQ_SUCCESS'
export const SEARCH_FAQ_FAILURE = 'SEARCH_FAQ_FAILURE'

export const GET_ALL_FAQS_BY_CATEGORY = 'GET_ALL_FAQS_BY_CATEGORY'
export const GET_ALL_FAQS_BY_CATEGORY_SUCCESS = 'GET_ALL_FAQS_BY_CATEGORY_SUCCESS'
export const GET_ALL_FAQS_BY_CATEGORY_FAULIRE = 'GET_ALL_FAQS_BY_CATEGORY_FAULIRE'
export const RESET_FAQS_BY_CATEGORY = 'RESET_FAQS_BY_CATEGORY'

export const RESET_FAQS = 'RESET_FAQS'






let emailAddress = ''
let userPassword = ''
let authenticationToken = ''
let isDeepLinkHandledOnSignIn = false
let isDarkThemeEnabled = false

let userIP = ''
let isAutoSecureLoginShown = false

let isFirstLogin = false
let isFingerPrintRegistered = false
let isPinCodeRegistered = false


let isMyCreditAuthDone = false

let loginTries = 0

let isFreeUser = false

let fcm_device_id = ''

let deviceManufacturer = ''

export function setEmail(email) {
    emailAddress = email
}

export function getEmail() {
    return emailAddress
}

export function setPassword(password) {
    userPassword = password
}

export function getPassword() {
    return userPassword
}

export function getAuthenticationToken() {
    return authenticationToken
}

export function setAuthenticationToken(token) {
    authenticationToken = token
}

export function getIsDeepLinkHandledOnSignIn() {
    return isDeepLinkHandledOnSignIn
}

export function setIsDeepLinkHandledSignIn(isHandled) {
    isDeepLinkHandledOnSignIn = isHandled
}

export function setIsDarkModeEnabled(isEnabled) {
    isDarkThemeEnabled = isEnabled
}

export function getIsDarkModeEnabled() {
    return isDarkThemeEnabled
}

export function getUserIP() {
    return userIP
}

export function setUserIP(ip) {
    userIP = ip
}

export function getIsAutoSecureLoginShown() {
    return isAutoSecureLoginShown
}

export function setIsAutoSecureLoginShown(isShown) {
    isAutoSecureLoginShown = isShown
}

export function setIsFirstLogin(isFirst) {
    isFirstLogin = isFirst
}

export function getIsFirstLogin() {
    return isFirstLogin
}

export function getIsFingerPrintRegistered() {
    return isFingerPrintRegistered
}

export function setIsFingerPrintRegistered(isRegistered) {
    isFingerPrintRegistered = isRegistered
}

export function getIsPinCodeRegistered() {
    return isPinCodeRegistered
}

export function setIsPinCodeRegistered(isRegistered) {
    isPinCodeRegistered = isRegistered
}

export function setLoginTries(tries) {
    loginTries = tries
}

export function getLoginTries() {
    return loginTries
}


export function getIsMyCreditAuthDone() {
    return isMyCreditAuthDone
}

export function setMyCreditAuthDone(isDone) {
    isMyCreditAuthDone = isDone
}

export function getIsFreeUser() {
    return isFreeUser
}

export function setIsFreeUser(isFree) {
    isFreeUser = isFree
}

export function setFCMDeviceID(id) {
    fcm_device_id = id
}

export function getFCMDeviceID() {
    return fcm_device_id
}

export function setManufacturer(manufacturer) {
    deviceManufacturer = manufacturer
}

export function getManufacturer() {
    return deviceManufacturer
}