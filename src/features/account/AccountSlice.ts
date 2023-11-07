import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AccountState from './types/AccountState';
import * as api from './api';
import UpdateUserDto from './types/UpdateUserDto';

const initialState: AccountState = {
	children: [],
	controlKindergarten: undefined,
	error: '',
	user: undefined,
};

export const updateUsersProfile = createAsyncThunk(
	'account/updateUserProfile',
	(user: UpdateUserDto) => api.updateUsersProfile(user)
);

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
			.addCase(updateUsersProfile.fulfilled, (state, action) => {
				state.user = {
					...state.user,
					id: action.payload.id,
					email: action.payload.email,
					role: action.payload.role,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					postcode: action.payload.postcode,
					address: action.payload.address,
					city: action.payload.city,
					phone: action.payload.phone,
					dateOfBirth: action.payload.dateOfBirth,
					gender: action.payload.gender,
				};
			})
			.addCase(updateUsersProfile.rejected, (state, action) => {
				state.error = action.error.message;
			})
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
