import { message } from 'antd'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { loginUser, registerUser } from '../api/authApi'
import { uploadVideo } from '../api/videoApi'
import { loginFailure, loginRequest, loginSuccess } from '../authentication/login/loginSlice'
import {
    registerFailure,
    registerRequest,
    registerSuccess,
} from '../authentication/register/RegisterSlice'
import {
    videoUploadFailure,
    videoUploadRequest,
    videoUploadSuccess,
} from '../authentication/videoUpload/videoUploadSlice'

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

function* handleVideoUpload(action) {
  try {
    const data = yield call(uploadVideo, action.payload)
    yield put(videoUploadSuccess(data))
    message.success('Video uploaded successfully')
  } catch (error) {
    const msg =
      error?.response?.data?.message || error?.message || 'Failed to upload video'
    yield put(videoUploadFailure(msg))
    message.error(msg)
  }
}

function* watchRegister() {
  yield takeLatest(registerRequest.type, handleRegister)
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin)
}

function* watchVideoUpload() {
  yield takeLatest(videoUploadRequest.type, handleVideoUpload)
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchVideoUpload(),
  ])
}
