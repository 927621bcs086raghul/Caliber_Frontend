import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '../authentication/login/loginSlice'
import registerReducer from '../authentication/register/RegisterSlice'
import videoUploadReducer from '../authentication/videoUpload/videoUploadSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  videoUpload: videoUploadReducer,
})

export default rootReducer
