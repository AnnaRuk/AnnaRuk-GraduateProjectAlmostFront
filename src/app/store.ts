import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import tasksSlice from '../features/tasks/tasksSlice';
import kinderdartensSlice from '../features/kindergartens/KindergartensSlice';
import favoritesSlice from '../features/favorites/FavoritesSlice';
import childrenSlice from '../features/children/ChildrenSlice';
import accountSlice from '../features/account/AccountSlice';
import requestsSlice from '../features/requests/RequestsSlice';
import dialoguesSlice from '../features/dialogues/DialoguesSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		tasks: tasksSlice,
		kindergartens: kinderdartensSlice,
		favorites: favoritesSlice,
		children: childrenSlice,
		account: accountSlice,
		requests: requestsSlice,
		dialogues: dialoguesSlice,
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
