import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import DialoguesState from './types/DialoguesState';
import NewDialogueDto from './types/NewDialogueDto';

const initialState: DialoguesState = {
	dialogues: [],
	error: '',
};

export const loadDialogues = createAsyncThunk('dialogues/loadDialogues', () =>
	api.getAllDialogues()
);

export const createDialogue = createAsyncThunk('dialogues/createDialogues', (dto: NewDialogueDto) =>
	api.createDialogue(dto)
);

export const dialoguesSlice = createSlice({
	name: 'dialogues',
	initialState,
	reducers: {
		resetDialogues: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadDialogues.fulfilled, (state, action) => {
				state.dialogues = action.payload.dialogues;
			})
			.addCase(loadDialogues.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(createDialogue.fulfilled, (state, action) => {
				state.dialogues = action.payload.dialogues;
			})
			.addCase(createDialogue.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default dialoguesSlice.reducer;
export const { resetDialogues } = dialoguesSlice.actions;
