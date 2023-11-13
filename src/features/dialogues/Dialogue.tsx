import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import User from '../auth/types/User';
import { createDialogue, loadDialogues } from './DialoguesSlice';
import { useParams } from 'react-router-dom';
import DialoguesDto from './types/DialoguesDto';

export default function Dialogue(): JSX.Element {
	const dispatch = useAppDispatch();
	const dialogues = useAppSelector((state) => state.dialogues.dialogues);
	const [newMessage, setNewMessage] = useState<string>('');
	const user: User | undefined = useAppSelector((state) => state.auth.user);
	const { dialogueId } = useParams(); ///rukami

	useEffect(() => {
		dispatch(loadDialogues());
	}, [dispatch]);
	

	// {
	//   "dialogues": [
	//     {"id": 1,
	//       "recipient": {"id": 1,"firstName": "Sergey","lastName": "Sedakov"},
	//       "messages": [{"id": 1,"senderId": 1,"messageDateTime": "1990-03-05 10:44:14.000000","messageText": "Kurlyk! Kurlyk!"}]
	//     }
	//   ]
	// }

	function dialogue(): DialoguesDto | undefined {
		if (dialogueId) {
			return dialogues.find((d) => d.id === Number(dialogueId));
		}
		return undefined;
	}
	const dialog = dialogue();

	function handleSendMessage(recipientId: number, messageText: string): void {
		dispatch(
			createDialogue({
				recipientId,
				messageText,
			})
		);
		setNewMessage('');
	}

	return (
		<div>
			<div>
				<h2>
					Dialogue with {dialog?.recipient.firstName} {dialog?.recipient.lastName}
				</h2>
				<ul>
					{dialog?.messages.map((message) => {
						if (message.senderId === dialog?.recipient.id) {
							return (
								<li key={message.id}>
									{`${new Date(message.messageDateTime).toLocaleDateString('en-GB', {
										day: 'numeric',
										month: 'numeric',
									})} ${new Date(message.messageDateTime).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}, ${dialog.recipient.firstName}: ${message.messageText}`}
								</li>
							);
						} else {
							return (
								<li key={message.id}>{`${new Date(message.messageDateTime).toLocaleDateString(
									'en-GB',
									{ day: 'numeric', month: 'numeric' }
								)} ${new Date(message.messageDateTime).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}}, ${user?.firstName}: ${message.messageText}`}</li>
							);
						}
					})}
				</ul>

				<textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
				<button onClick={() => handleSendMessage(dialog?.recipient.id, newMessage)}>
					Send a message
				</button>
			</div>
		</div>
	);
}
