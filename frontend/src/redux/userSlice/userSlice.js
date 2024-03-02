import { createSlice } from '@reduxjs/toolkit'
import { setToken } from '../../utils/accessToken'

const initialState = {
    error: null,
    user: null,
    loading: false,
    refreshToken: null,
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
            state.user = action.payload.user
            setToken(action.payload.access)
            state.refreshToken = action.payload.refresh
            state.error = null
            state.loading = false
        },
        signInFailure: (state, action) => {
            console.log(action.payload)
            state.error = action.payload
            state.loading = null
        },
        logout: (state) => {
            state.user = null
            state.refreshToken = null
        },
        resetError: (state) => {
            state.error = null
        },
    },
})

export const { signInStart, signInSuccess, signInFailure, resetError } =
    userSlice.actions
export default userSlice.reducer
