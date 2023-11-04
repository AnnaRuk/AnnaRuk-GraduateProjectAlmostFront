import React from 'react';
import { useActionData, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/selectors';
import Kindergarten from './types/Kindergarten';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BusinessIcon from '@mui/icons-material/Business';

export default function KindergartenDetails(): JSX.Element {
	const user = useAppSelector(selectUser);
	const { id } = useParams();
	let kindergarten = null;
	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	kindergarten = kindergartens.find((k) => String(k.id) === String(id));
	if (kindergarten) {
		return (
			<div>
				{user ? (
					<div>
						<h3>Kindergarten</h3>
						<div>{kindergarten?.title}</div>

						<div>
							<BusinessIcon /> {kindergarten?.address}, {kindergarten?.city},
							{kindergarten?.postcode}
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
						<div>
							<button type="button">favorite</button>
						</div>
						<div>
							<button type="button">request</button>
						</div>
						<div>
							<button type="button">message</button>
						</div>
					</div>
				) : (
					<div>
						<h3>Kindergarten</h3>
						<div>{kindergarten?.title}</div>
						<div>
							<BusinessIcon /> {kindergarten?.address}, {kindergarten?.city},{' '}
							{kindergarten?.postcode}
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
				)}
			</div>
		);
	} else {
		return <div>Error</div>;
	}
}
