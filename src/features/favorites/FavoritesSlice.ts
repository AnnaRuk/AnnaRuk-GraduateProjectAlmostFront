import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import FavoritesState from './types/FavoritesState';
import FavoriteAddDto from './types/FavoriteAddDto';
import DeleteFromFavorites from './types/DeleteFavoriteDto';

const initialState: FavoritesState = {
	kindergartens: [],
	error: '',
};

export const loadFavorites = createAsyncThunk('favorites/loadFavorites', () => api.getFavorites()); // payload = return Kindergarten[] with open Promise;
export const deleteFavorites = createAsyncThunk(
	'favorites/deleteFavorites',
	(id: DeleteFromFavorites) => api.deleteFromFavorites(id)
);
export const addToFavorites = createAsyncThunk(
	'favorites/addToFavorites',
	(kindergarten: FavoriteAddDto) => api.addToFavorites(kindergarten)
);

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadFavorites.fulfilled, (state, action) => {
				state.kindergartens = action.payload.kindergartens;
			})
			.addCase(loadFavorites.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(deleteFavorites.fulfilled, (state, action) => {
				state.kindergartens = state.kindergartens.filter((kita) => kita.id !== action.payload.id);
			})
			.addCase(addToFavorites.fulfilled, (state, action) => {
				state.kindergartens.push(action.payload);
			})
			.addCase(addToFavorites.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});
export default favoritesSlice.reducer;
