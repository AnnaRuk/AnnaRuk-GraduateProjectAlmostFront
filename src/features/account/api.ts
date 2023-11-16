import { negative, positive } from '../../basic_styles/toastify';
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

	if (res.status === 200) {
		positive('Data update successful!');
	}
	if (res.status >= 400) {
		if (res.status === 409) {
			negative('This email is already in use!');
		}
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}

	return res.json();
}
