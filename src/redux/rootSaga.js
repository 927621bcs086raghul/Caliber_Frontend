import { message } from 'antd'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { getProfileById, loginUser, logoutUser, registerUser, updateProfile } from '../api/authApi'
import { getVideosByUser, uploadVideo } from '../api/videoApi'
import { loginFailure, logout as loginLogout, loginRequest, loginSuccess } from '../authentication/login/loginSlice'
import {
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from '../authentication/logout/logoutSlice'
import {
  profileFetchFailure,
  profileFetchRequest,
  profileFetchSuccess,
  profileUpdateFailure,
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUserVideosFailure,
  profileUserVideosRequest,
  profileUserVideosSuccess,
} from '../authentication/profileDetails/profileDetailsSlice'
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
    yield put(loginSuccess(data))

    // Persist login details so profile can recover user id
    try {
      window.localStorage.setItem('loginUser', JSON.stringify(data))
    } catch (e) {
      // ignore storage errors
    }

    message.success('Login successfully')

  } catch (error) {
    const message = error?.response?.status === 400
      ? error?.response?.data?.message || 'Invalid credentials'
      : error?.message || 'Server error'
    yield put(loginFailure(message))
  }
}

function* handleVideoUpload(action) {
  console.log(action.payload)
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



function* handleLogout() {
  try {
    yield call(logoutUser)
    yield put(logoutSuccess())
    // Clear login slice auth state
    yield put(loginLogout())
    try {
      window.localStorage.removeItem('loginUser')
    } catch (e) {
      // ignore storage errors
    }
    message.success('Logged out successfully')
    // Redirect to login page
    window.location.href = '/login'
  } catch (error) {
    const msg =
      error?.response?.data?.message || error?.message || 'Failed to logout'
    yield put(logoutFailure(msg))
    message.error(msg)
  }
}

function* handleProfileUpdate(action) {
  try {
    const data = yield call(updateProfile, action.payload)
    yield put(profileUpdateSuccess(data))
    message.success('Profile updated successfully')

    // After a successful update, refetch the latest profile details
    try {
      const loginState = yield select((state) => state.login)
      const userId = loginState?.user?.id
      if (userId) {
        yield put(profileFetchRequest(userId))
      }
    } catch (e) {
      // ignore refetch errors; main update already succeeded
    }
  } catch (error) {
    const msg =
      error?.response?.data?.message || error?.message || 'Failed to update profile'
    yield put(profileUpdateFailure(msg))
    message.error(msg)
  }
}

function* handleProfileFetch(action) {
  try {
    console.log('Fetching profile for userId: ', action.payload)
    const data = yield call(getProfileById, action.payload)
    yield put(profileFetchSuccess(data))
  } catch (error) {
    const msg =
      error?.response?.data?.message || error?.message || 'Failed to load profile'
    yield put(profileFetchFailure(msg))
    message.error(msg)
  }
}

function* handleProfileUserVideosFetch(action) {
  try {
    const data = yield call(getVideosByUser, action.payload)
    yield put(profileUserVideosSuccess(data))
  } catch (error) {
    const msg =
      error?.response?.data?.message || error?.message || 'Failed to load user videos'
    yield put(profileUserVideosFailure(msg))
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

function* watchLogout() {
  yield takeLatest(logoutRequest.type, handleLogout)
}

function* watchProfileUpdate() {
  yield takeLatest(profileUpdateRequest.type, handleProfileUpdate)
}

function* watchProfileFetch() {
  yield takeLatest(profileFetchRequest.type, handleProfileFetch)
}

function* watchProfileUserVideosFetch() {
  yield takeLatest(profileUserVideosRequest.type, handleProfileUserVideosFetch)
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchVideoUpload(),
    watchLogout(),
    watchProfileUpdate(),
    watchProfileFetch(),
    watchProfileUserVideosFetch(),
  ])
}
