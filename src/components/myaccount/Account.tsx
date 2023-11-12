import { useEffect } from 'react';
import Sidepanel from '../sidepanel/Sidepanel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadChildren } from '../../features/children/ChildrenSlice';
import { loadControlKindergarten } from '../../features/kindergartens/KindergartensSlice';
import { loadDialogues } from '../../features/dialogues/DialoguesSlice';
import { loadFavorites } from '../../features/favorites/FavoritesSlice';
import { loadRequests } from '../../features/requests/RequestsSlice';
import { Outlet } from 'react-router-dom';
import './account.css';

export default function Account(): JSX.Element {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user?.role == 'USER') {
			dispatch(loadChildren());
			dispatch(loadFavorites());
			dispatch(loadDialogues());
			dispatch(loadRequests());
		} else {
			dispatch(loadDialogues());
			dispatch(loadRequests());
			dispatch(loadControlKindergarten());
		}
	}, [dispatch]);

	return (
		<div id="profileSubstrate">
			<div id="profileContainer" className="content bg_white dark">
				<Sidepanel />
				<div id="profileContentContainer" className="bg_pink dark">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
