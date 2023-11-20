import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { confirmRequest, loadRequests, rejectRequest } from './RequestsSlice';
import ChildWithParent from './types/ChildWithParent';
import Request from './types/RequestDto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import Child from '../children/types/Child';

export default function ManagerRequestsList(): JSX.Element {
	const dispatch = useAppDispatch();
	const childWithUserList = useAppSelector((state) => state.requests.childWithUserList);
	const hasCKindergarten = useAppSelector(
		(state) => state.kindergartens.controlKindergarten
	)?.title;
	const requests = useAppSelector((state) => state.requests.requests);

	useEffect(() => {
		dispatch(loadRequests());
	}, [dispatch]);

	function getParentName(childId: number): string {
		if (childId) {
			const element: ChildWithParent | undefined = childWithUserList.find(
				(e) => e.child.id === childId
			);
			if (element) {
				return `${element.userInRequestAndDialog.firstName} ${element.userInRequestAndDialog.lastName}`;
			}
		}
		return '';
	}

	function getChildName(childId: number | undefined): string {
		const foundedChild: Child | undefined = childWithUserList.findLast(
			(e) => e.child.id === childId
		)?.child;
		return foundedChild ? `${foundedChild?.firstName} ${foundedChild?.lastName}` : '';
	}
	function getChildDateOfBirth(childId: number | undefined): string {
		const foundedChild: Child | undefined = childWithUserList.findLast(
			(e) => e.child.id === childId
		)?.child;
		return foundedChild ? `${new Date(foundedChild.dateOfBirth).toLocaleDateString()}` : '';
	}
	function getChildGender(childId: number | undefined): string {
		const foundedChild: Child | undefined = childWithUserList.findLast(
			(e) => e.child.id === childId
		)?.child;
		return foundedChild?.gender ? `${foundedChild?.gender}` : '';
	}

	function notConfirmedRequests(): Request[] {
		return requests?.filter((r) => r.status === 'NOT_CONFIRMED');
	}
	const notConfirmedRequestsList = notConfirmedRequests();

	function handleRejectRequest(id: number): void {
		dispatch(rejectRequest(id));
	}

	function handleConfirmRequest(id: number): void {
		dispatch(confirmRequest(id));
	}

	return (
		<div className="font_itim dark">
			<div id="rMNotConfirmedTitle">Requests In Process</div>
			{hasCKindergarten ? (
				<div>
					{notConfirmedRequestsList.length > 0 ? (
						<table id="rMNotConfirmedContainer">
							<thead>
								<tr>
									<th>Date</th>
									<th>Parent`s Name</th>
									<th>Child`s Name</th>
									<th>Child`s Date of Birth</th>
									<th>Child`s Gender</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{notConfirmedRequestsList.map((request) => (
									<tr key={request.id}>
										<td>{new Date(request.requestDateTime).toLocaleDateString()}</td>
										<td>{getParentName(request.childId)}</td>

										<td>{getChildName(request.childId)}</td>
										<td>{getChildDateOfBirth(request.childId)}</td>
										<td>{getChildGender(request.childId)}</td>
										<td>
											<CheckIcon
												type="button"
												onClick={() => handleConfirmRequest(request.id)}
											></CheckIcon>
											<DeleteForeverIcon
												type="button"
												onClick={() => handleRejectRequest(request.id)}
											></DeleteForeverIcon>
											<EmailIcon type="button"></EmailIcon>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="rMAdditional">You have no Requests to process.</div>
					)}
				</div>
			) : (
				<div className="rMAdditional">
					Please fill in the information about Your Kindergarten to use this function.
				</div>
			)}
		</div>
	);
}
