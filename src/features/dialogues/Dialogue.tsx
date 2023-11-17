import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import User from '../auth/types/User';
import { createDialogue, loadDialogues } from './DialoguesSlice';
import { useParams } from 'react-router-dom';
import DialoguesDto from './types/DialoguesDto';
import './dialogue.css';
import Message from './types/Message';

export default function Dialogue(): JSX.Element {
	const dispatch = useAppDispatch();
	const dialogues = useAppSelector((state) => state.dialogues.dialogues);
	const [newMessage, setNewMessage] = useState<string>('');
	const user: User | undefined = useAppSelector((state) => state.auth?.user);
	const { dialogueId } = useParams();

	useEffect(() => {
		dispatch(loadDialogues());
	}, [dispatch]);

	function getDialogue(): DialoguesDto | undefined {
		if (dialogueId) {
			return dialogues.find((d) => d.id === Number(dialogueId));
		}
		return undefined;
	}
	const dialogue = getDialogue();

	function handleSendMessage(recipientId: number, messageText: string): void {
		dispatch(
			createDialogue({
				recipientId,
				messageText,
			})
		);
		setNewMessage('');
	}
	function getSenderName(dialogueToMap: DialoguesDto, messageToMap: Message): string {
		return messageToMap.senderId == dialogueToMap.recipient.id
			? `${dialogueToMap.recipient.firstName} ${dialogueToMap.recipient.lastName}`
			: 'You';
	}
	function getClassList(userId: number, senderToMapId: number): string {
		return (
			'form-control' +
			(userId == senderToMapId ? 'messageContainer right' : 'messageContainer left')
		);
	}

	return (
		<div className="font_itim dark">
			<div id={`dialogue${dialogue?.id}`} className="dTitle">
				Dialogue with {dialogue?.recipient.firstName} {dialogue?.recipient.lastName}
			</div>
			<div>
				<div id="dialogueContainer" className="bg_green">
					{dialogue?.messages?.map((message) => (
						<div
							key={message.id}
							id={`message${message.id}`}
							className={getClassList(user?.id, message.senderId)}
						>
							<div className="coupleContainer">
								<label htmlFor={`message${message.id}text`} className="form-label lbl small">
									{`${new Date(message.messageDateTime).toLocaleString()} ${getSenderName(
										dialogue,
										message
									)}`}
								</label>
								<div id={`message${message.id}text`} className="form-control messageText">
									{message.messageText}
								</div>
							</div>
						</div>
					))}
				</div>

				<textarea
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Enter your message here"
					className="form-control"
					id="dTextArea"
				/>
				<button
					id="dSendMessageBtn"
					onClick={() => handleSendMessage(dialogue?.recipient.id, newMessage)}
				>
					Send Message
				</button>
			</div>
		</div>
	);
}
