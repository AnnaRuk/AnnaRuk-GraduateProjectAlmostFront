import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import FavoritesState from './types/FavoritesState';

const initialState: FavoritesState = {
	kindergartenDTOList: [],
	error: '',
};

export const loadFavorites = createAsyncThunk('favorites/loadFavorites', () => api.getFavorites()); // payload = return Kindergarten[] with open Promise;
export const deleteFavorites = createAsyncThunk('favorites/deleteFavorites', (id: number) =>
	api.deleteFromFavorites(id)
);

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadFavorites.fulfilled, (state, action) => {
				state.kindergartenDTOList = action.payload.kindergartenDTOList;
			})
			.addCase(loadFavorites.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(deleteFavorites.fulfilled, (state, action) => {
				state.kindergartenDTOList = state.kindergartenDTOList.filter(
					(kita) => kita.id !== action.payload.id
				);
			});
	},
});
export default favoritesSlice.reducer;
