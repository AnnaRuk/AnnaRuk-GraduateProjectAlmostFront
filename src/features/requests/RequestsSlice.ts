import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import RequestsState from './types/RequestsState';
import NewRequestDto from './types/NewRequestDto';

const initialState: RequestsState = {
	childWithUserList: [],
	requests: [],
	error: '',
};

export const loadRequests = createAsyncThunk('requests/loadRequests', () => api.getAllRequests()); // payload = return Kindergarten[] with open Promise;

export const rejectRequest = createAsyncThunk('requests/rejectRequest', (id: number) =>
	api.rejectRequest(id)
);

export const confirmRequest = createAsyncThunk('requests/confirmRequest', (id: number) =>
	api.confirmRequest(id)
);

export const createRequest = createAsyncThunk('requests/createRequest', (dto: NewRequestDto) =>
	api.createRequest(dto)
);

export const requestsSlice = createSlice({
	name: 'requests',
	initialState,
	reducers: {
		resetRequests: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadRequests.fulfilled, (state, action) => {
				state.childWithUserList = action.payload.childWithUserList;
				state.requests = action.payload.requests;
				state.error = '';
			})
			.addCase(loadRequests.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(createRequest.fulfilled, (state, action) => {
				state.childWithUserList = action.payload.childWithUserList;
				state.requests = action.payload.requests;
			})
			.addCase(createRequest.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(rejectRequest.fulfilled, (state, action) => {
				state.childWithUserList = action.payload.childWithUserList;
				state.requests = action.payload.requests;
			})
			.addCase(rejectRequest.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(confirmRequest.fulfilled, (state, action) => {
				state.childWithUserList = action.payload.childWithUserList;
				state.requests = action.payload.requests;
			})
			.addCase(confirmRequest.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default requestsSlice.reducer;
export const { resetRequests } = requestsSlice.actions;
