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
        },
        signInSuccess: (state, action) => {
            state.user = action.payload.user
            setToken(action.payload.access)
            state.refreshToken = action.payload.refresh
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
        },
    },
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions
export default userSlice.reducer
