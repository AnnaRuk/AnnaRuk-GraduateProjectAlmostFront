import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import tasksSlice from '../features/tasks/tasksSlice';
import kinderdartensSlice from '../features/kindergartens/KinderdartensSlice';
import favoritesSlice from '../features/favorites/FavoritesSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		tasks: tasksSlice,
		kindergartens: kinderdartensSlice,
		favorites: favoritesSlice,

	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
