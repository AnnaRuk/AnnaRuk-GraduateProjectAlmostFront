import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import RequestsState from './types/RequestsState';

const initialState: RequestsState = {
  childWithUserList: [],
  requests: [],
  error: '',
};

export const loadRequests = createAsyncThunk('requests/loadRequests', () => api.getAllRequests()); // payload = return Kindergarten[] with open Promise;

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRequests.fulfilled, (state, action) => {
        state.childWithUserList = action.payload.childWithUserList;
        state.requests = action.payload.requests;
        state.error = '';
      })
      .addCase(loadRequests.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export default requestsSlice.reducer;
