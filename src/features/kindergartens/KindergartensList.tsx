import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadKindergartens, setSelectedCity } from './KindergartensSlice';
import { Link } from 'react-router-dom';
import Kindergarten from './types/Kindergarten';
import GradeIcon from '@mui/icons-material/Grade';
import '../../basic_styles/styles.css';
import { loadFavorites } from '../favorites/FavoritesSlice';

export default function KindergartensList(): JSX.Element {
	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	const cities = useAppSelector((state) => state.kindergartens.cities);
	const selectedCity = useAppSelector((state) => state.kindergartens.selectedCity);
	const dispatch = useAppDispatch();


	useEffect(() => {
		dispatch(loadKindergartens());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadFavorites());
	}, [dispatch]);

	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelectedCity(e.target.value));
	};

	function filtered(kitas: Kindergarten[], city: string): void {
		if (city) {
			if (city === 'All cities') {
				return kitas;
			} else {
				return kitas.filter((k) => k.city === city);
			}
		}
	}
	const filteredKindergartens = filtered(kindergartens, selectedCity);

	return (
		<div className="content dark">
			<div id="kListTitle" className="dark font_itim">
				Kindergartens
			</div>
			<div>
				<label>Choose the city: </label>
				<select value={selectedCity} onChange={handleCityChange}>
					<option value="All cities">All cities</option>
					{cities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>City</th>
						<th>Address</th>
						<th>Capacity</th>
					</tr>
				</thead>
				<tbody>
					{filteredKindergartens.map((kindergarten) => (
						<tr key={kindergarten.id}>
							<td>
								<GradeIcon />
								<Link to={`/kindergartens/${kindergarten.id}`}>{kindergarten.title}</Link>
							</td>
							<td>{kindergarten.city}</td>
							<td>{kindergarten.address}</td>
							<td>{kindergarten.capacity}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div></div>
		</div>
	);
}
