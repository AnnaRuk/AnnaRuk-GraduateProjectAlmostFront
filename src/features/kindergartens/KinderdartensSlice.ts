import { setSelectedCity } from './KinderdartensSlice';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import KindergartensState from './types/KindergartensState';
import * as api from './api';
import KindergartensList from './KindergartensList';
import KindergartenDto from './types/KindergartenDto';

const initialState: KindergartensState = {
	kindergartenDTOList: [],
	cities: [],
	error: '',
	selectedCity: 'All cities',
};

export const loadKindergartens = createAsyncThunk('kindergartens/loadKindergartens', () =>
	api.getAllKindergarten()
); // payload = return Kindergarten[] with open Promise;

export const addKindergarten = createAsyncThunk(
	'kindergartens/addKindergarten',
	(kindergarten: KindergartenDto) => api.addKindergarten(kindergarten)
);

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
				state.kindergartenDTOList = action.payload.kindergartenDTOList;
				state.cities = action.payload.cities;
			})
			.addCase(loadKindergartens.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(addKindergarten.fulfilled, (state, action) => {
				state.kindergartenDTOList.push(action.payload);
			})
			.addCase(addKindergarten.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});
export const { setSelectedCity } = kindergartensSlice.actions;
export default kindergartensSlice.reducer;
