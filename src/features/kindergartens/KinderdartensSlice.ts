import { setSelectedCity } from './KinderdartensSlice';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import KindergartensState from './types/KindergartensState';
import * as api from './api';
import KindergartensList from './KindergartensList';

const initialState: KindergartensState = {
	kindergartenBaseDTOList: [],
	cities: [],
	error: '',
	selectedCity: 'All cities',
};

export const loadKindergartens = createAsyncThunk('kindergartens/loadKindergartens', () =>
	api.getAllKindergarten()
); // payload = return Kindergarten[] with open Promise;

export const kindergartensSlice = createSlice({
	name: 'kindergartens',
	initialState,
	reducers: {
		setSelectedCity: (state, action) => {
			state.selectedCity = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadKindergartens.fulfilled, (state, action) => {
				state.kindergartenBaseDTOList = action.payload.kindergartenBaseDTOList;
				state.cities = action.payload.cities;
			})
			.addCase(loadKindergartens.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});
export const { setSelectedCity } = kindergartensSlice.actions;
export default kindergartensSlice.reducer;
