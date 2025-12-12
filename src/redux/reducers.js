import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from '../authentication/login/loginSlice'
import registerReducer from '../authentication/register/RegisterSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
})

export default rootReducer
