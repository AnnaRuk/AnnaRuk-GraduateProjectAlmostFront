import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadKindergartens, setSelectedCity } from './KindergartensSlice';
import Kindergarten from './types/Kindergarten';
import GradeIcon from '@mui/icons-material/Grade';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import '../../basic_styles/styles.css';
import { loadFavorites } from '../favorites/FavoritesSlice';

export default function KindergartensList(): JSX.Element {
	const favorites = useAppSelector((state) => state.favorites.kindergartens);
	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	const cities = useAppSelector((state) => state.kindergartens.cities);
	const selectedCity = useAppSelector((state) => state.kindergartens.selectedCity);
	const dispatch = useAppDispatch();
	const path = useLocation().pathname;

	useEffect(() => {
		dispatch(loadKindergartens());
		dispatch(loadFavorites());
	}, [dispatch]);

	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelectedCity(e.target.value));
	};

	function filtered(kitas: Kindergarten[], city: string): Kindergarten[] | undefined {
		if (city) {
			if (city === 'All cities') {
				return kitas;
			} else {
				return kitas?.filter((k) => k.city === city);
			}
		}
	}
	function isInFavorites(kId: number): boolean {
		return favorites?.find((k) => k.id === kId) ? true : false;
	}
	const filteredKindergartens = filtered(kindergartens, selectedCity);

	return (
		<div id="kTableContainer" className="content dark">
			<div id="kListTitle" className="dark font_itim">
				Kindergartens
			</div>

			<div>
				<label id="cityChooserLbl" className="dark font_itim">
					Choose the city:
				</label>
				<select
					id="citySelector"
					value={selectedCity}
					onChange={handleCityChange}
					className="dark font_itim"
				>
					<option value="All cities">All cities</option>
					{cities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>

			<table className="dark font_itim">
				<thead>
					<tr>
						<th>Kindergarten's Title</th>
						<th>Kindergarten's City</th>
						<th>Kindergarten's Address</th>
						<th>Kindergarten's Capacity</th>
					</tr>
				</thead>
				<tbody>
					{filteredKindergartens?.map((kindergarten) => (
						<tr key={kindergarten.id}>
							<td>
								<nav className={isInFavorites(kindergarten.id) ? 'posLeft' : ''}>
									<NavLink to={`${path}/${kindergarten.id}`}>
										<div id="iconTitle">
											{isInFavorites(kindergarten.id) ? (
												<div id="icon">
													<GradeIcon />
												</div>
											) : (
												<></>
											)}
											{kindergarten.title}
										</div>
									</NavLink>
								</nav>
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
