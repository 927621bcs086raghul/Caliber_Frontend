import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  success: false,
}

const videoUploadSlice = createSlice({
  name: 'videoUpload',
  initialState,
  reducers: {
    videoUploadRequest(state) {
      state.loading = true
      state.error = null
      state.success = false
    },
    videoUploadSuccess(state) {
      state.loading = false
      state.success = true
    },
    videoUploadFailure(state, action) {
      state.loading = false
      state.error = action.payload || 'Failed to upload video'
      state.success = false
    },
    resetVideoUploadState() {
      return initialState
    },
  },
})

export const {
  videoUploadRequest,
  videoUploadSuccess,
  videoUploadFailure,
  resetVideoUploadState,
} = videoUploadSlice.actions

export default videoUploadSlice.reducer
