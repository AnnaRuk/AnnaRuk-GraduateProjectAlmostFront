import DialoguesDto from './types/DialoguesDto';
import NewDialogueDto from './types/NewDialogueDto';

//GET....
export async function getAllDialogues(): Promise<{
	dialogues: DialoguesDto[];
}> {
	const res = await fetch('/api/users/profile/dialogues');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}
//POST....
export async function createDialogue(dto: NewDialogueDto): Promise<{
	dialogues: DialoguesDto[];
}> {
	const res = await fetch('/api/users/profile/dialogues', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});

	if (res.status >= 400) {
		console.log('HELP');
	}

	return res.json();
}
