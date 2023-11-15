import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import KindergartensState from './types/KindergartensState';
import * as api from './api';
import KindergartenDto from './types/KindergartenDto';
import UpdateKindergartenDto from './types/UpdateKindergartenDto';

const initialState: KindergartensState = {
	kindergartenDTOList: [],
	cities: [],
	error: '',
	selectedCity: 'All cities',
	controlKindergarten: null,
};

export const loadKindergartens = createAsyncThunk('kindergartens/loadKindergartens', () =>
	api.getAllKindergarten()
); // payload = return Kindergarten[] with open Promise;

export const loadKindergartenById = createAsyncThunk(
	'kindergartens/loadKindergarten',
	(id: number) => api.getKindergartenById(id)
);

export const addControlKindergarten = createAsyncThunk(
	'kindergartens/addControlKindergarten',
	(kindergarten: KindergartenDto) => api.addControlKindergarten(kindergarten)
);

export const loadControlKindergarten = createAsyncThunk(
	'kindergartens/loadControlKindergarten',
	() => api.loadControlKindergarten()
);

export const updateControlKindergarten = createAsyncThunk(
	'kindergartens/updateControlKindergarten',
	(kindergarten: UpdateKindergartenDto) => api.updateControlKindergarten(kindergarten)
);

export const kindergartensSlice = createSlice({
	name: 'kindergartens',
	initialState,
	reducers: {
		setSelectedCity: (state, action) => {
			state.selectedCity = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateControlKindergarten.fulfilled, (state, action) => {
				state.kindergartenDTOList = state.kindergartenDTOList.map((kita) =>
					kita.id === action.payload.id
						? {
								...kita,
								title: action.payload.title,
								address: action.payload.address,
								city: action.payload.city,
								postcode: action.payload.postcode,
								capacity: action.payload.capacity,
								description: action.payload.description,
								linkImg: action.payload.linkImg,
						  }
						: kita
				);
			})
			.addCase(updateControlKindergarten.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(loadKindergartens.fulfilled, (state, action) => {
				state.kindergartenDTOList = action.payload.kindergartenDTOList;
				state.cities = action.payload.cities;
			})
			.addCase(loadKindergartens.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(loadKindergartenById.fulfilled, (state, action) => {
				state.kindergartenDTOList.find((k) => k.id === action.payload.id);
			})
			.addCase(loadKindergartenById.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(loadControlKindergarten.fulfilled, (state, action) => {
				state.controlKindergarten = action.payload;
			})
			.addCase(loadControlKindergarten.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(addControlKindergarten.fulfilled, (state, action) => {
				state.kindergartenDTOList.push(action.payload);
			})
			.addCase(addControlKindergarten.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});
export const { setSelectedCity } = kindergartensSlice.actions;
export default kindergartensSlice.reducer;
