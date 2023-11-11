import { useEffect } from 'react';
import Sidepanel from '../sidepanel/Sidepanel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadChildren } from '../../features/children/ChildrenSlice';
import { loadControlKindergarten } from '../../features/kindergartens/KindergartensSlice';
import { loadDialogues } from '../../features/dialogues/DialoguesSlice';
import { loadFavorites } from '../../features/favorites/FavoritesSlice';
import { loadRequests } from '../../features/requests/RequestsSlice';

export default function Account(): JSX.Element {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	function loadData(): void {
		if (user?.role == 'USER') {
			useEffect(() => {
				dispatch(loadChildren());
				dispatch(loadFavorites());
				dispatch(loadDialogues());
				dispatch(loadRequests());
			}, [dispatch]);
		} else {
			useEffect(() => {
				dispatch(loadDialogues());
				dispatch(loadRequests());
				dispatch(loadControlKindergarten());
			}, [dispatch]);
		}
	}
	loadData();

	return (
		<div className="content">
			Account area user/manager
			<Sidepanel />
		</div>
	);
}
