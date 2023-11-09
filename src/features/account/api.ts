import User from '../auth/types/User';
import UpdateUserDto from './types/UpdateUserDto';

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
