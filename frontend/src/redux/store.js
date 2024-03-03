import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import userSlice from './userSlice/userSlice'
import loadingSlice from './loadingSlice/loadingSlice'

const rootReducer = combineReducers({
    user: userSlice,
    loading: loadingSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: null,
        }),
})

export const persistor = persistStore(store)
