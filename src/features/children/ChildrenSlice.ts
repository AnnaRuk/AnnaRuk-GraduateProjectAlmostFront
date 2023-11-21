import * as api from './api';
import ChildrenState from './types/ChildrenState';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChildDto from './types/ChildDto';
import Child from './types/Child';

const initialState: ChildrenState = {
	children: [],
	error: '',
};

export const addChildren = createAsyncThunk('children/addChildren', (child: ChildDto) =>
	api.addChild(child)
); // payload = return Children[] with open Promise;

export const updateChildren = createAsyncThunk('children/updateChildren', (child: Child) =>
	api.updateChildren(child)
); // payload = return Children[] with open Promise;

export const loadChildren = createAsyncThunk('children/loadChildren', () => api.loadChildren());

export const childrenSlice = createSlice({
	name: 'children',
	initialState,
	reducers: {
		resetChildren: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadChildren.fulfilled, (state, action) => {
				state.children = action.payload.children;
			})
			.addCase(loadChildren.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(updateChildren.fulfilled, (state, action) => {
				state.children = state.children.map((ch) =>
					ch.id === action.payload.id
						? {
								...ch,
								firstName: action.payload.firstName,
								lastName: action.payload.lastName,
								gender: action.payload.gender,
								dateOfBirth: action.payload.dateOfBirth,
						  }
						: ch
				);
			})
			.addCase(updateChildren.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(addChildren.fulfilled, (state, action) => {
				state.children = action.payload.children;
			})
			.addCase(addChildren.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});
export default childrenSlice.reducer;
export const { resetChildren } = childrenSlice.actions;
