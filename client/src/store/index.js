import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import deviceSlice from './reducers/deviceSlice';
import basketSlice from './reducers/basketSlice';

const rootReducer = combineReducers({
	user: userSlice,
	device: deviceSlice,
	basket: basketSlice
});

export const store = configureStore({
    reducer: rootReducer
});