import Kindergarten from './types/Kindergarten';
import KindergartenDto from './types/KindergartenDto';

export async function getAllKindergarten(): Promise<{
	kindergartenDTOList: Kindergarten[];
	cities: string[];
}> {
	const res = await fetch('/api/kindergartens');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}
export async function addKindergarten(dto: KindergartenDto): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/controlKindergarten', {
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
