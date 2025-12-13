import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  success: false,
}

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutRequest(state) {
      state.loading = true
      state.error = null
      state.success = false
    },
    logoutSuccess(state) {
      state.loading = false
      state.success = true
    },
    logoutFailure(state, action) {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
    resetLogoutState() {
      return initialState
    },
  },
})

export const { logoutRequest, logoutSuccess, logoutFailure, resetLogoutState } =
  logoutSlice.actions

export default logoutSlice.reducer
