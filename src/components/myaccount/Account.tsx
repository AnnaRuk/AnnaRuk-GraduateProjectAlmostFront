import React from 'react';
import Sidepanel from '../sidepanel/Sidepanel';
import FavoritesKindergartensList from '../../features/favorites/FavoritesKindergartensList';
import ChildForm from '../../features/children/ChildForm';
import KindergartenForm from '../../features/kindergartens/KindergartenForm';
import UserData from '../../features/userdata/UserData';

export default function Account(): JSX.Element {
	return (
		<div>
			Account area user/manager

			<UserData />

			<FavoritesKindergartensList />

			<ChildForm />

			<KindergartenForm />
			
			<Sidepanel />
		</div>
	);
}
