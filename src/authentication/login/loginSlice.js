import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure(state, action) {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
    resetLoginState() {
      return initialState
    },
  },
})

export const { loginRequest, loginSuccess, loginFailure, logout, resetLoginState } =
  loginSlice.actions

export default loginSlice.reducer
