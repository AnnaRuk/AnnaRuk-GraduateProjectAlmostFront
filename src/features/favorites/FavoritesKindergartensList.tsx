import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteFavorites, loadFavorites } from './FavoritesSlice';
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function FavoritesKindergartensList(): JSX.Element {
	const favorites = useAppSelector((state) => state.favorites.kindergartenDTOList);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadFavorites());
	}, [dispatch]);

	const handleDelete = (id: number): void => {
		dispatch(deleteFavorites(id));
	};

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
						<th>Free places</th>
						<th>Description</th>
						<th>Delete from favorites</th>
					</tr>
				</thead>
				<tbody>
					{favorites.map((kindergarten) => (
						<tr key={kindergarten.id}>
							<td>{kindergarten.title}</td>
							<td>{kindergarten.postcode}</td>
							<td>{kindergarten.city}</td>
							<td>{kindergarten.address}</td>
							<td>{kindergarten.capacity}</td>
							<td>{kindergarten.freePlaces}</td>
							<td>{kindergarten.description}</td>
							<td>
								<BackspaceIcon type="button" onClick={() => handleDelete(kindergarten.id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
