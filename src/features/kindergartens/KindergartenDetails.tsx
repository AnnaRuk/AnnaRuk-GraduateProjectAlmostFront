import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/selectors';
import Kindergarten from './types/Kindergarten';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { addToFavorites, deleteFavorites } from '../favorites/FavoritesSlice';
import { createRequest } from '../requests/RequestsSlice';
import Child from '../children/types/Child';

export default function KindergartenDetails(): JSX.Element {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const children = useAppSelector((state) => state.children.children);
	const { id } = useParams();
	let kindergarten: Kindergarten | null | undefined = null;

	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	kindergarten = kindergartens.find((k) => String(k.id) === String(id));

	const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

	const handleDelete = (kindergartenId: number): void => {
		dispatch(
			deleteFavorites({
				kindergartenId,
			})
		);
	};

	const handleCreateRequest = (kindergartenId: number): void => {
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
			<div>
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
						<img src={kindergarten?.linkImg} alt="KINDERGARTEN" />
					</div>
					<div>{kindergarten?.description}</div>
				</div>
				{user?.role === 'USER' ? (
					<div>
						<div>
							<button
								type="button"
								onClick={() => handleAddToFavorite(kindergarten ? Number(kindergarten.id) : 0)}
							>
								favorite
							</button>
							<BackspaceIcon
								type="button"
								onClick={() => handleDelete(kindergarten ? Number(kindergarten.id) : 0)}
							/>
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
				) : null}
			</div>
		);
	} else {
		return <div>Error</div>;
	}
}
