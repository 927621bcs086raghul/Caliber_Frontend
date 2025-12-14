import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  items: [],
}

const videoCategoriesSlice = createSlice({
  name: 'videoCategories',
  initialState,
  reducers: {
    videoCategoriesRequest(state) {
      state.loading = true
      state.error = null
    },
    videoCategoriesSuccess(state, action) {
      state.loading = false
      state.items = Array.isArray(action.payload) ? action.payload : []
    },
    videoCategoriesFailure(state, action) {
      state.loading = false
      state.error = action.payload || 'Failed to load categories'
    },
  },
})

export const {
  videoCategoriesRequest,
  videoCategoriesSuccess,
  videoCategoriesFailure,
} = videoCategoriesSlice.actions

export default videoCategoriesSlice.reducer
