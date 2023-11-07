import * as api from './api';
import ChildrenState from './types/ChildrenState';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChildDto from './types/ChildDto';
import Child from './types/Child';

const initialState: ChildrenState = {
	children: [],
	error: '',
};

export const addChild = createAsyncThunk('children/addChild', (child: ChildDto) =>
	api.addChild(child)
); // payload = return Children[] with open Promise;

export const updateChild = createAsyncThunk('children/updateChild', (child: Child) =>
	api.addChild(child)
); // payload = return Children[] with open Promise;

// export const loadChildren = createAsyncThunk('children/loadChildren', () => api.loadChildren());

export const childrenSlice = createSlice({
	name: 'children',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addChild.fulfilled, (state, action) => {
				state.children = action.payload;
			})
			.addCase(addChild.rejected, (state, action) => {
				state.error = action.error.message;
			});
		// .addCase(loadChildren.fulfilled, (state, action) => {
		// 	state.children = action.payload;
		// })
		// .addCase(loadChildren.rejected, (state, action) => {
		// 	state.error = action.error.message;
		// });
	},
});
export default childrenSlice.reducer;
