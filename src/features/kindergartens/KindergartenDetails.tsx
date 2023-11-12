import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/selectors';
import Kindergarten from './types/Kindergarten';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
import { addToFavorites, deleteFavorites } from '../favorites/FavoritesSlice';
import { createRequest } from '../requests/RequestsSlice';
import '../../basic_styles/styles.css';
import './kindergartenDetails.css';

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

	function filtered(children: Child[], selectedChildId: number | null) {
		if (selectedChildId === null) {
			return children;
		} else if (selectedChildId === 0) {
			return children;
		} else {
			return children.filter((ch) => ch.id === selectedChildId);
		}
	}

	if (kindergarten) {
		return (
			<div id="kindergartenDataContainer" className="dark font_itim flex">
				<div>
					<div id="kTitleContainer" className="dark font_itim">
						<NavLink to={'/kindergartens'}>
							<button className="btn_pink dark btn">Go Back</button>
						</NavLink>
						<div id="kTitle">{kindergarten?.title}</div>
					</div>
					<div id="imgAndDataContainer">
						<div>
							<img id="kImage" src={kindergarten?.linkImg} alt="KINDERGARTEN" />
						</div>
						<div id="kDataContainer" className="bg_green">
							<div>
								<BusinessIcon /> {kindergarten?.address}
								<div>
									{kindergarten?.postcode}, {kindergarten?.city}
								</div>
							</div>
							<div>
								<PhoneInTalkIcon /> {kindergarten?.phone}
							</div>
							<div>{`Person: ${kindergarten?.manager?.firstName} ${kindergarten?.manager?.lastName}`}</div>
							<div>Capacity: {kindergarten?.capacity}</div>
						</div>
					</div>
					<div id="kDescriptionContainer" className="bg_pink">
						{kindergarten?.description}
					</div>
				</div>

				{user && user?.role === 'USER' ? (
					<div id="kAdditionalContainer">
						{!isInFavorites ? (
							<button
								className="kBtn_blue dark mg"
								type="button"
								id="kToFavoritesBTN"
								onClick={() => handleAddToFavorite(kindergarten ? Number(kindergarten.id) : 0)}
							>
								Add to Favorites
							</button>
						) : (
							<button
								type="button"
								className="kBtn_blue dark mg"
								id="kFromFavoritesBTN"
								onClick={() => handleDelete(Number(kindergarten.id))}
							>
								Remove from Favorites
							</button>
						)}

						<div>
							<label id="kChoseLbl">Choose a child: </label>
							<select value={selectedChildId || 'children'} onChange={handleChildChange}>
								<option value="children">children</option>
								{children?.map((child) => (
									<option key={child.id} value={child.id}>
										{child.firstName}
									</option>
								))}
							</select>
						</div>

						<button
							className="kBtn_green dark mg "
							type="button"
							id="kRequestBTN"
							onClick={() => handleCreateRequest(Number(kindergarten.id || 0))}
						>
							Send a Request
						</button>

						<button type="button" id="kShowMessageBTN" className="kBtn_pink dark mg">
							Send a Message
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		);
	} else {
		return <div className="dark">Error!</div>;
	}
}
