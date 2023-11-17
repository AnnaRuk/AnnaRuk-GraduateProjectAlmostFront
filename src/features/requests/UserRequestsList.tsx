import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadRequests, rejectRequest } from './RequestsSlice';
import Kindergarten from '../kindergartens/types/Kindergarten';
import { loadKindergartens } from '../kindergartens/KindergartensSlice';
import Child from '../children/types/Child';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EmailIcon from '@mui/icons-material/Email';
import './requests.css';

export default function UserRequestsList(): JSX.Element {
	const dispatch = useAppDispatch();
	const requests = useAppSelector((state) => state.requests.requests);
	const kindergartens = useAppSelector((state) => state.kindergartens.kindergartenDTOList);
	const children = useAppSelector((state) => state.children.children);

	useEffect(() => {
		dispatch(loadKindergartens());
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadRequests());
	}, [dispatch]);

	function kindergartenTitle(id: number): string {
		const kindergarten: Kindergarten | undefined = kindergartens.find((kita) => kita.id === id);
		if (kindergarten) {
			return kindergarten.title;
		}
		return '';
	}

	function kindergartenAddress(id: number): string {
		const kindergarten: Kindergarten | undefined = kindergartens.find((kita) => kita.id === id);
		if (kindergarten) {
			return `${kindergarten.address},  ${kindergarten.city}`;
		}
		return '';
	}

	function childName(id: number): string {
		const child: Child | undefined = children.find((ch) => ch.id === id);
		if (child) {
			return `${child.firstName} ${child.lastName}`;
		}
		return '';
	}

	function handleRejectRequest(id: number): void {
		dispatch(rejectRequest(id));
	}

	function putDownStatus(status: string): string {
		if (status === 'CONFIRMED') {
			return 'approved';
		} else if (status === 'NOT_CONFIRMED') {
			return 'in progress';
		} else {
			return 'rejected';
		}
	}

	return (
		<div id="rURequestsContainer" className="font_itim dark">
			<div id="rUTitle">My Requests</div>
			{requests.length > 0 ? (
				<div>
					<table id="rUTableContainer">
						<thead>
							<tr>
								<th>Date</th>
								<th>Kindergarten's Title</th>
								<th>Kindergarten's Address</th>
								<th>Child's Name</th>
								<th>Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{requests.map((request) => (
								<tr key={request.id}>
									<td>{new Date(request.requestDateTime).toLocaleDateString()}</td>
									<td>{kindergartenTitle(request.kindergartenId)}</td>
									<td>{kindergartenAddress(request.kindergartenId)}</td>
									<td>{childName(request.childId)}</td>
									<td>{putDownStatus(request.status)}</td>

									{request.status !== 'REJECTED' ? (
										<td>
											<div className="rUButtonsContainer ">
												<DeleteForeverIcon
													type="button"
													onClick={() => handleRejectRequest(request.id)}
												></DeleteForeverIcon>
												<EmailIcon type="button"></EmailIcon>
											</div>
										</td>
									) : (
										<td>
											<EmailIcon type="button"></EmailIcon>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div id="noURequestsTitle">There are no requests yet.</div>
			)}
		</div>
	);
}
