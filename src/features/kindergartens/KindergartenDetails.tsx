import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/selectors';
import Kindergarten from './types/Kindergarten';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
import { loadKindergartens } from './KindergartensSlice';
import { addToFavorites, deleteFavorites, loadFavorites } from '../favorites/FavoritesSlice';
import { createRequest } from '../requests/RequestsSlice';
import Child from '../children/types/Child';

export default function KindergartenDetails(): JSX.Element {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const children = useAppSelector((state) => state.children.children);
	const { id } = useParams();
	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);

	const favorites = useAppSelector((state) => state.favorites.kindergartens);

	let kindergarten: Kindergarten | null | undefined = null;

	kindergarten = kindergartens?.find((k) => String(k.id) === String(id));

	const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

	const isKindergartenInFavorites = (kindergartenId: number): boolean => {
		return favorites?.find((k) => k.id === kindergartenId) ? true : false;
	};

	const [isInFavorites, setIsInFavorites] = useState(isKindergartenInFavorites(kindergarten?.id));

	const handleDelete = (kindergartenId: number): void => {
		setIsInFavorites(false);
		dispatch(deleteFavorites({ kindergartenId }));
	};

	const handleCreateRequest = (id: number): void => {
		if (selectedChildId !== null) {
			dispatch(
				createRequest({
					childId: selectedChildId,
					kindergartenId: Number(id),
				})
			);
		}
	};

	const handleAddToFavorite = (id: number): void => {
		setIsInFavorites(true);
		dispatch(addToFavorites(id));
	};

	const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedChildId(Number(e.target.value));
	};

	/*function filtered(children: Child[], selectedChildId: number | null) {
		if (selectedChildId === null) {
			return children;
		} else if (selectedChildId === 0) {
			return children;
		} else {
			return children.filter((ch) => ch.id === selectedChildId);
		}
	}*/

	if (kindergarten) {
		return (
			<div className="dark content">
				<div>
					<h3>Kindergarten</h3>
					<div>{kindergarten?.title}</div>
					<div>
						<BusinessIcon /> {kindergarten?.address}, {kindergarten?.city},{kindergarten?.postcode}
					</div>
					<div>
						<PhoneInTalkIcon />
						{kindergarten?.phone}
					</div>
					<div>{`Contact person: ${kindergarten.manager?.firstName} ${kindergarten.manager?.lastName}`}</div>
					<div>{kindergarten?.capacity}</div>
					<div>
						<img src={kindergarten?.linkImg} alt="KINDERGARTEN" className="kImage" />
					</div>
					<div>{kindergarten?.description}</div>
				</div>

				{user && user?.role === 'USER' ? (
					<div>
						<div>
							{!isInFavorites ? (
								<button
									type="button"
									onClick={() => handleAddToFavorite(kindergarten ? Number(kindergarten.id) : 0)}
								>
									Add to Favorites
								</button>
							) : (
								<button type="button" onClick={() => handleDelete(Number(kindergarten.id))}>
									Remove from Favorites
								</button>
							)}
						</div>

						<div>
							<label>Choose a child: </label>
							<select value={selectedChildId || 'children'} onChange={handleChildChange}>
								<option value="children">children</option>
								{children.map((child) => (
									<option key={child.id} value={child.id}>
										{child.firstName}
									</option>
								))}
							</select>
						</div>

						<div>
							<button
								type="button"
								onClick={() => handleCreateRequest(Number(kindergarten.id || 0))}
							>
								request
							</button>
						</div>

						<div>
							<button type="button">message</button>
						</div>
					</div>
				) : (
					<div> Error</div>
				)}
			</div>
		);
	} else {
		return <div>Error</div>;
	}
}
