import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteFavorites, loadFavorites } from './FavoritesSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation, NavLink } from 'react-router-dom';
import './favorites.css';
import { positive } from '../../basic_styles/toastify';

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
		<div id="favoritesContainer" className="font_itim dark">
			<div id="fTitle"> My Favorite Kindergartens</div>
			{favorites.length > 0 ? (
				<div id="fTableContainer">
					<table>
						<thead>
							<tr>
								<th>Kindergarten's Title</th>
								<th>Kindergarten's Postcode</th>
								<th>Kindergarten's City</th>
								<th>Kindergarten's Address</th>
								<th> Capacity</th>
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
										<DeleteForeverIcon
											type="button"
											onClick={() => handleDelete(kindergarten.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div id="noFavoritesTitle">There are no added Favorites yet.</div>
			)}
		</div>
	);
}
