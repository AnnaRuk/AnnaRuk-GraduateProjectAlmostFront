import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import favoritesSlice from '../features/favorites/FavoritesSlice';
import childrenSlice from '../features/children/ChildrenSlice';
import accountSlice from '../features/account/AccountSlice';
import requestsSlice from '../features/requests/RequestsSlice';
import dialoguesSlice from '../features/dialogues/DialoguesSlice';
import kindergartensSlice from '../features/kindergartens/KindergartensSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		kindergartens: kindergartensSlice,
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
