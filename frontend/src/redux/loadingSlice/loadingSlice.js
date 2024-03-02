import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: null,
    loading: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setError: (state, action) => {
            console.log(action.payload)
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
        startLoading: (state) => {
            state.loading = true
        },
        stopLoading: (state) => {
            state.loading = false
        },
    },
})

export const { setError, clearError, startLoading, stopLoading } =
    loadingSlice.actions
export default loadingSlice.reducer
