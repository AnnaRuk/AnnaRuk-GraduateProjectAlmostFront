import React, { useEffect } from 'react';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectKindergartens } from './selectors';
import { loadKindergartens } from './KinderdartensSlice';

export default function KindergartensList(): JSX.Element {
	const kindergartens = useAppSelector(selectKindergartens);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadKindergartens());
	}, [dispatch]);

	return (
		<div>
			<h1>Kindergartens list</h1>

			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>City</th>
						<th>Postcode</th>
						<th>Address</th>
						<th>Capacity</th>
						<th>FreePlaces</th>
						<th>Description</th>
						<th>LinkImg</th>
					</tr>
				</thead>
				<tbody>
					{kindergartens.map((kindergarten) => (
						<tr key={kindergarten.id}>
							<td>{kindergarten.title}</td>
							<td>{kindergarten.city}</td>
							<td>{kindergarten.postcode}</td>
							<td>{kindergarten.address}</td>
							<td>{kindergarten.capacity}</td>
							<td>{kindergarten.freePlaces}</td>
							<td>{kindergarten.description}</td>
							<td>{kindergarten.linkImg}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}


