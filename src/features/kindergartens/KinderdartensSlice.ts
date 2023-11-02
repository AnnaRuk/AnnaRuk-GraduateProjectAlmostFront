import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import KindergartensState from './types/KindergartensState';
import * as api from './api';

const initialState: KindergartensState = {
	kindergartens: [],
	error: '',
};

export const loadKindergartens = createAsyncThunk('kindergartens/loadKindergartens', () =>
	api.getAllKindergarten()
); // payload = return Kindergarten[] with open Promise;

export const kindergartensSlice = createSlice({
	name: 'kindergartens',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadKindergartens.fulfilled, (state, action) => {
			state.kindergartens = action.payload;
		});
	},
});

export default kindergartensSlice.reducer;
