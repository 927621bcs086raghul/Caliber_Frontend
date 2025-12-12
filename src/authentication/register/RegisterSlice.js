import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  user: null,
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerRequest(state) {
      state.loading = true
      state.error = null
    },
    registerSuccess(state, action) {
      state.loading = false
      state.user = action.payload
    },
    registerFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    resetRegisterState() {
      return initialState
    },
  },
})

export const { registerRequest, registerSuccess, registerFailure, resetRegisterState } =
  registerSlice.actions

export default registerSlice.reducer
