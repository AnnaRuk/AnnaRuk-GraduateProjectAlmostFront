import React from 'react';
import { useActionData, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/selectors';
import Kindergarten from './types/Kindergarten';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { addToFavorites, deleteFavorites } from '../favorites/FavoritesSlice';

export default function KindergartenDetails(): JSX.Element {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const { id } = useParams();
	let kindergarten: Kindergarten | null | undefined = null;

	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	kindergarten = kindergartens.find((k) => String(k.id) === String(id));

	const handleDelete = (id: number): void => {
		dispatch(deleteFavorites(id));
	};

	const handleAddToFavorite = (id: number): void => {
		dispatch(addToFavorites(id));
	};

	console.log(kindergarten?.id);

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
					<div>{kindergarten?.capacity}</div>
					<div>
						<img src={kindergarten?.linkImg} alt="KINDERGARTEN" />
					</div>
					<div>{kindergarten?.description}</div>
				</div>
				{user ? (
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
							<button type="button">request</button>
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
