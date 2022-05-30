import { SIGN_IN_SUCCESS, LOGOUT_APP, PROFILE_ACTIVE } from '../../../utils/Constants'

export const signInSuccess = (stack) => {
  return {
    type: SIGN_IN_SUCCESS,
    stack : stack
  }
}


export const logoutAppAction = () => {
  return {
    type: LOGOUT_APP
  }
}

export const profileActiveAction = () => {
  return {
    type: PROFILE_ACTIVE
  }
}
