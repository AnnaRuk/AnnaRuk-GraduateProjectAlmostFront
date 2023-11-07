import User from '../auth/types/User';
import Child from '../children/types/Child';
import Kindergarten from '../kindergartens/types/Kindergarten';
import UpdateUserDto from './types/UpdateUserDto';

//GET
export async function loadChildren(): Promise<Child[]> {
	const res = await fetch('/api/users/profile/children');
	if (res.status >= 400) {
		console.log('HELP');
	}

	return res.json();
}
//GET
export async function loadControlKindergarten(): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/controlKindergarten');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}

//PUT
export async function updateUsersProfile(dto: UpdateUserDto): Promise<User> {
	const res = await fetch('/api/users/profile', {
		method: 'PUT',
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
