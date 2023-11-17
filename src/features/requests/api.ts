import { negative, positive } from '../../basic_styles/toastify';
import ChildWithParent from './types/ChildWithParent';
import NewRequestDto from './types/NewRequestDto';
import Request from './types/Request';

//GET....M+U
export async function getAllRequests(): Promise<{
	childWithUserList: ChildWithParent[];
	requests: Request[];
}> {
	const res = await fetch('/api/users/profile/requests');
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}
//POST....User
export async function createRequest(dto: NewRequestDto): Promise<{
	childWithUserList: ChildWithParent[];
	requests: Request[];
}> {
	const res = await fetch('/api/users/profile/requests', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});

	if (res.status === 201) {
		positive('Request sent successfully!');
	}
	if (res.status >= 400) {
		if (res.status === 409) {
			negative('Request already exists!');
		}
	}

	return res.json();
}
//PUT....M+U
export async function rejectRequest(id: number): Promise<{
	childWithUserList: ChildWithParent[];
	requests: Request[];
}> {
	const res = await fetch(`/api/users/profile/requests/${id}/reject`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (res.status === 200) {
		positive('Request was rejected!');
	}
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}

	return res.json();
}

//PUT...Manager
export async function confirmRequest(id: number): Promise<{
	childWithUserList: ChildWithParent[];
	requests: Request[];
}> {
	const res = await fetch(`/api/users/profile/requests/${id}/confirm`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (res.status === 200) {
		positive('Request was confirmed!');
	}
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}

	return res.json();
}
