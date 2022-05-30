import { getIsDarkModeEnabled } from '../utils/Constants';

export const logoLight = require('./images/logo.png');
export const logoDark = require('./images/logoDark.png');
export const logo = getIsDarkModeEnabled() ? logoDark : logoLight;

export const emailSent = require('./images/status_avatars/emailSent.png');
export const fundsRequested = require('./images/status_avatars/fundsRequested.png');
export const applicationSubmitted = require('./images/status_avatars/applicationSubmitted.png');
export const fundsSent = require('./images/status_avatars/fundsRequested.png');
export const wentWrong = require('./images/status_avatars/fundsSent.png');
export const moneySent = require('./images/status_avatars/moneySent.png');
export const cardActivated = require('./images/status_avatars/cardActivated.png');
export const passwordChanged = require('./images/status_avatars/passwordChanged.png');
export const messageSent = require('./images/status_avatars/messageSent.png');
export const verifiedSuccessfuly = require('./images/status_avatars/verifiedSuccessfuly.png');
export const verificationFailed = require('./images/status_avatars/verificationFailed.png');
export const referFriend = require('./images/status_avatars/referFriend.png');
export const requestSent = require('./images/status_avatars/requestSent.png');
export const idVerificationComplete = require('./images/status_avatars/idVerificationComplete.png');
export const idVerificationExpired = require('./images/status_avatars/idVerificationExpired.png');
export const idVerificationPending = require('./images/status_avatars/idVerificationPending.png');

export const profile = require('./images/profile.png');
export const splashAnimation = require('./images/splashAnimation.gif');

export const noDataAvailable = require('./images/use_card.png');