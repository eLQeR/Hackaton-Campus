import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: null,
    user: null,
    loading: false,
    refreshToken: null,
    accessToken: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.accessToken = action.payload.access
            state.refreshToken = action.payload.refresh
            state.user = action.payload.user
            state.error = null
            state.loading = false
        },
        signInFailure: (state, action) => {
            console.log(action.payload)
            state.error = action.payload
            state.loading = false
        },
        logout: (state) => {
            state.user = null
            state.refreshToken = null
            state.accessToken = null
        },
        resetError: (state) => {
            state.error = null
        },
        setUserStart: (state) => {
            state.loading = true
            state.error = null
        },
        setUserSuccess: (state, action) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    resetError,
    setUserStart,
    setUserSuccess,
    logout,
    setAccessToken,
    setUserFailure,
} = userSlice.actions
export default userSlice.reducer
