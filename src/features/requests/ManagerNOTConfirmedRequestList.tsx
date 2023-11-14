import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { confirmRequest, loadRequests, rejectRequest } from './RequestsSlice';
import ChildWithParent from './types/ChildWithParent';
import Request from './types/Request';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';

export default function ManagerRequestsList(): JSX.Element {
	const dispatch = useAppDispatch();
	const childWithUserList = useAppSelector((state) => state.requests.childWithUserList);
	const requests = useAppSelector((state) => state.requests.requests);

	useEffect(() => {
		dispatch(loadRequests());
	}, [dispatch]);

	function parentName(childId: number): string {
		if (childId) {
			const element: ChildWithParent | undefined = childWithUserList.find(
				(e) => e.child.id === childId
			);
			if (element) {
				return `${element.userInRequestAndDialog.firstName}`;
			}
		}
		return '';
	}

	function parentLastName(childId: number): string {
		if (childId) {
			const element: ChildWithParent | undefined = childWithUserList.find(
				(e) => e.child.id === childId
			);
			if (element) {
				return `${element.userInRequestAndDialog.lastName}`;
			}
		}
		return '';
	}

	function childData(childId: number | undefined): string {
		const elements: ChildWithParent | undefined = childWithUserList.find(
			(e) => e.child.id === childId
		);
		if (elements) {
			const { child } = elements;
			const genderInfo = child.gender ? `, ${child.gender}` : '';
			return `${child.firstName}, ${child.lastName}, ${child.dateOfBirth}${genderInfo}`;
		}
		return '';
	}

	function notConfirmedRequests(): Request[] {
		return requests.filter((r) => r.status === 'NOT_CONFIRMED');
	}
	const notConfirmedRequestsList = notConfirmedRequests();

	function handleRejectRequest(id: number): void {
		dispatch(rejectRequest(id));
	}

	function handleConfirmRequest(id: number): void {
		dispatch(confirmRequest(id));
	}

	return (
		<table>
			<thead>
				<tr>
					<th>PARENT NAME</th>
					<th>PARENT LASTNAME</th>
					<th>CHILD INFORMATION</th>
					<th>DATE</th>
					<th></th>
					<th></th>
          <th></th>
				</tr>
			</thead>
			<tbody>
				{notConfirmedRequestsList.map((request) => (
					<tr key={request.id}>
						<td>{parentName(request.childId)}</td>
						<td>{parentLastName(request.childId)}</td>
						<td>{childData(request.childId)}</td>
						<td>{new Date(request.requestDateTime).toLocaleDateString()}</td>
						<td>
							<DeleteForeverIcon type="button" onClick={() => handleRejectRequest(request.id)}>
								del
							</DeleteForeverIcon>
						</td>
						<td>
							<CheckIcon type="button" onClick={() => handleConfirmRequest(request.id)}>
								conf
							</CheckIcon>
						</td>
            <td>
              <EmailIcon type="button">send a message</EmailIcon>
            </td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
