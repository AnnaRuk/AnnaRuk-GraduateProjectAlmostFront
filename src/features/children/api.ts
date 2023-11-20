import { negative, positive } from '../../basic_styles/toastify';
import Child from './types/Child';
import ChildDto from './types/ChildDto';

//POST

export async function addChild(dto: ChildDto): Promise<{ children: Child[] }> {
	const res = await fetch('/api/users/profile/children', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});
	if (res.status === 201) {
		positive('Adding new child successful!');
	}
	if (res.status >= 400) {
		if (res.status === 409) {
			negative('Child with this data already exists!');
		}
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}

	return res.json();
}

// PUT
export async function updateChildren(child: Child): Promise<Child> {
	const res = await fetch('/api/users/profile/children', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(child),
	});

	if (res.status === 200) {
		positive('Data update successful!');
	}
	if (res.status >= 400) {
		if (res.status === 409) {
			negative('Child with this data already exists!');
		}
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

//GET
export async function loadChildren(): Promise<{ children: Child[] }> {
	const res = await fetch('/api/users/profile/children');
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}
