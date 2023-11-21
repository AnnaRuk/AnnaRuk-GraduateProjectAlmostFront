import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AccountState from './types/AccountState';
import * as api from './api';
import UpdateUserDto from './types/UpdateUserDto';

const initialState: AccountState = {
	error: '',
	user: undefined,
};

export const updateUsersProfile = createAsyncThunk(
	'account/updateUserProfile',
	(user: UpdateUserDto) => api.updateUsersProfile(user)
);

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		resetAccount: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateUsersProfile.fulfilled, (state, action) => {
				state.user = {
					...state.user,
					id: action.payload.id,
					email: action.payload.email,
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
			});
	},
});
export default accountSlice.reducer;
export const { resetAccount } = accountSlice.actions;
