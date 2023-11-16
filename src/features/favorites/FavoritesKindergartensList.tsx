import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteFavorites, loadFavorites } from './FavoritesSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation, NavLink } from 'react-router-dom';

export default function FavoritesKindergartensList(): JSX.Element {
	const favorites = useAppSelector((state) => state.favorites.kindergartens);
	const dispatch = useAppDispatch();
	const path = useLocation().pathname;
	const error = useAppSelector((state) => state.favorites.error);

	useEffect(() => {
		dispatch(loadFavorites());
	}, []);

	function handleDelete(kindergartenId: number): void {
		dispatch(
			deleteFavorites({
				kindergartenId,
			})
		);
		positive('Kindergarten remove');
	}

	return (
		<div>
			<h1> My Favorites Kindergartens</h1>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Postcode</th>
						<th>City</th>
						<th>Address</th>
						<th>Capacity</th>
						<th> </th>
					</tr>
				</thead>
				<tbody>
					{favorites.map((kindergarten) => (
						<tr key={kindergarten.id}>
							<td>
								<NavLink to={`${path}/${kindergarten.id}`}>{kindergarten?.title}</NavLink>
							</td>
							<td>{kindergarten.postcode}</td>
							<td>{kindergarten.city}</td>
							<td>{kindergarten.address}</td>
							<td>{kindergarten.capacity}</td>
							<td>
								<DeleteForeverIcon type="button" onClick={() => handleDelete(kindergarten.id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
