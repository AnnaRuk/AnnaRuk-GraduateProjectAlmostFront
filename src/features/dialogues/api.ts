import { positive } from '../../basic_styles/toastify';
import DialoguesDto from './types/DialoguesDto';
import NewDialogueDto from './types/NewDialogueDto';

//GET....
export async function getAllDialogues(): Promise<{
	dialogues: DialoguesDto[];
}> {
	const res = await fetch('/api/users/profile/dialogues');
	// TODO Error
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}
type DialoguesListDto = {
	dialogues: DialoguesDto[];
};
//POST....
export async function createDialogue(dto: NewDialogueDto): Promise<DialoguesListDto> {
	const res = await fetch('/api/users/profile/dialogues', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});

	if (res.status === 201) {
		positive('Message sent!');
	}
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}
