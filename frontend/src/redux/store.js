import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import userSlice from './userSlice/userSlice'

const rootReducer = combineReducers({
    user: userSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore(persistedReducer)
export const persistor = persistStore(store)
