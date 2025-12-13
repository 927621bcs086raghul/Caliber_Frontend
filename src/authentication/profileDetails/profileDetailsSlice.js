import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  data: JSON.parse(localStorage.getItem('loginUser'))?.user || null,
}

const profileDetailsSlice = createSlice({
  name: 'profileDetails',
  initialState,
  reducers: {
    profileFetchRequest(state) {
      state.loading = true
      state.error = null
    },
    profileFetchSuccess(state, action) {
      state.loading = false
      state.data = action.payload
    },
    profileFetchFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    profileUpdateRequest(state) {
      state.loading = true
      state.error = null
    },
    profileUpdateSuccess(state, action) {
      state.loading = false
      state.data = action.payload
    },
    profileUpdateFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    resetProfileDetails() {
      return initialState
    },
  },
})

export const {
  profileFetchRequest,
  profileFetchSuccess,
  profileFetchFailure,
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUpdateFailure,
  resetProfileDetails,
} = profileDetailsSlice.actions

export default profileDetailsSlice.reducer
