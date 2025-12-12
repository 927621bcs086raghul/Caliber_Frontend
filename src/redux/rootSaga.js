import { message } from 'antd'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { loginUser, registerUser } from '../api/authApi'
import { loginFailure, loginRequest, loginSuccess } from '../authentication/login/loginSlice'
import {
    registerFailure,
    registerRequest,
    registerSuccess,
} from '../authentication/register/RegisterSlice'

function* handleRegister(action) {
  try {
    const data = yield call(registerUser, action.payload)
    yield put(registerSuccess(data))
      message.success('Registration successful, please login')

  } catch (error) {
    const message = error?.response?.status === 400
      ? error?.response?.data?.message || 'User already exists'
      : error?.message || 'Server error'
    yield put(registerFailure(message))
  }
}

function* handleLogin(action) {
  try {
    const data = yield call(loginUser, action.payload)
    yield put(loginSuccess(data));
      message.success('Login successfully');

  } catch (error) {
    const message = error?.response?.status === 400
      ? error?.response?.data?.message || 'Invalid credentials'
      : error?.message || 'Server error'
    yield put(loginFailure(message))
  }
}

function* watchRegister() {
  yield takeLatest(registerRequest.type, handleRegister)
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin)
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
  ])
}
