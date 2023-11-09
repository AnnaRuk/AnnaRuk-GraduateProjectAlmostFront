import React, { useEffect } from 'react';
import Sidepanel from '../sidepanel/Sidepanel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadChildren, loadControlKindergarten } from '../../features/account/AccountSlice';

export default function Account(): JSX.Element {
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.auth.user);


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
