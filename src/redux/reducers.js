import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '../authentication/login/loginSlice'
import logoutReducer from '../authentication/logout/logoutSlice'
import profileDetailsReducer from '../authentication/profileDetails/profileDetailsSlice'
import registerReducer from '../authentication/register/RegisterSlice'
import videoCategoriesReducer from '../authentication/videoCategories/videoCategoriesSlice'
import videoUploadReducer from '../authentication/videoUpload/videoUploadSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  videoUpload: videoUploadReducer,
  logout: logoutReducer,
  profileDetails: profileDetailsReducer,
  videoCategories: videoCategoriesReducer,
})

export default rootReducer
