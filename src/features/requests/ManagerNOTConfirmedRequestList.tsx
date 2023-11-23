import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { confirmRequest, loadRequests, rejectRequest } from './RequestsSlice';
import ChildWithParent from './types/ChildWithParent';
import Request from './types/RequestDto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import Child from '../children/types/Child';
import RequestUserDto from './types/RequestsUserDto';
import { createDialogue } from '../dialogues/DialoguesSlice';

export default function ManagerRequestsList(): JSX.Element {
	const dispatch = useAppDispatch();
	const childWithUserList = useAppSelector((state) => state.requests.childWithUserList);
	const hasCKindergarten = useAppSelector(
		(state) => state.kindergartens.controlKindergarten
	)?.title;
	const requests = useAppSelector((state) => state.requests.requests);
	const [isMessageShown, setIsMessageShown] = useState<boolean>(false);
	const [recipient, setRecipient] = useState<RequestUserDto | null>(null);
	const [message, setMessage] = useState<string>('');

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
	function getParent(childId: number): RequestUserDto | null {
		if (childId) {
			const foundedChild: ChildWithParent | undefined = childWithUserList.find(
				(e) => e.child.id === childId
			);
			const foundedParent = foundedChild?.userInRequestAndDialog;
			if (foundedParent) {
				return {
					id: foundedParent.id,
					firstName: foundedParent.firstName,
					lastName: foundedParent.lastName,
				};
			}
		}
		return null;
	}
	function handleShowMessage(id: number): void {
		setIsMessageShown(!isMessageShown);
		setRecipient(getParent(id));
		setMessage('');
	}
	function btnBackHandler(): void {
		setIsMessageShown(!isMessageShown);
		setMessage('');
	}
	function handleSendMessage(recipientId: number, messageText: string): void {
		if (messageText && recipientId != 0) {
			dispatch(
				createDialogue({
					recipientId,
					messageText,
				})
			);
			setMessage('');
			setIsMessageShown(!isMessageShown);
		}
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
											<EmailIcon
												type="button"
												onClick={() => handleShowMessage(request.childId)}
											></EmailIcon>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="rMAdditional">You have no Requests to process.</div>
					)}
					<>
						{isMessageShown && (
							<div id="rMMessageDiv" className="bg_white rMMessageContainer">
								<div className="bg_green rMessageContentContainer">
									<div className="rMessageTitle">
										Send Message to {recipient?.firstName} {recipient?.lastName}
									</div>
									<textarea
										name="messageText"
										id="rMessage"
										placeholder="Write your message here"
										cols={100}
										rows={7}
										maxLength={1000}
										className="form-control rMessage"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									></textarea>
									<div className="rBtnContainer">
										<button onClick={btnBackHandler} className="rBtn_blue">
											Back
										</button>
										<button
											onClick={() => handleSendMessage(recipient ? recipient.id : 0, message)}
											className="rBtn_pink"
										>
											Send Message
										</button>
									</div>
								</div>
							</div>
						)}
					</>
				</div>
			) : (
				<div className="rMAdditional">
					Please fill in the information about Your Kindergarten to use this function.
				</div>
			)}
		</div>
	);
}
