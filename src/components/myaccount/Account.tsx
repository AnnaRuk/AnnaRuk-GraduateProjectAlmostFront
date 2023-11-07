import React, { useEffect } from 'react';
import Sidepanel from '../sidepanel/Sidepanel';
import { useAppDispatch } from '../../app/hooks';
import { loadChildren, loadControlKindergarten } from '../../features/account/AccountSlice';

export default function Account(): JSX.Element {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadControlKindergarten());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadChildren());
	}, [dispatch]);

	return (
		<div>
			Account area user/manager
			{/* 
			<UserData />

			<FavoritesKindergartensList />

			<ChildForm />

			<KindergartenForm /> */}
			<Sidepanel />
		</div>
	);
}
