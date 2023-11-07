import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AccountState from './types/AccountState';
import * as api from './api';

const initialState: AccountState = {
	children: [],
	controlKindergarten: undefined,
	error: '',
};

export const loadControlKindergarten = createAsyncThunk('account/loadControlKindergarten', () =>
	api.loadControlKindergarten()
);

export const loadChildren = createAsyncThunk('account/loadChildren', () => api.loadChildren());

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadControlKindergarten.fulfilled, (state, action) => {
				state.controlKindergarten = action.payload;
			})
			.addCase(loadControlKindergarten.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(loadChildren.fulfilled, (state, action) => {
				state.children = action.payload;
			})
			.addCase(loadChildren.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});
export default accountSlice.reducer;
