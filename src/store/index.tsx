import thunk from 'redux-thunk';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from '@/store/auth/auth.slice';

const rootReducer = combineReducers({
    auth,
})


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
        serializableCheck: false
    }), thunk],
});
export default store;
export type RootState = ReturnType<typeof store.getState>