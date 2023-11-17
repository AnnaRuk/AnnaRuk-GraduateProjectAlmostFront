import { negative, positive } from '../../basic_styles/toastify';
import Kindergarten from './types/Kindergarten';
import KindergartenDto from './types/KindergartenDto';
import UpdateKindergartenDto from './types/UpdateKindergartenDto';
//GET
export async function getAllKindergarten(): Promise<{
	kindergartenDTOList: Kindergarten[];
	cities: string[];
}> {
	const res = await fetch('/api/kindergartens');
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

//GET
export async function getKindergartenById(id: number): Promise<Kindergarten> {
	const res = await fetch(`/api/kindergartens/${id}`);
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}
//POST
export async function addControlKindergarten(dto: KindergartenDto): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/controlKindergarten', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});

	if (res.status === 201) {
		positive('Adding was successful!');
	}
	if (res.status >= 400) {
		if (res.status === 409) {
			negative('Kindergarten already exists!');
		}
	}

	return res.json();
}
//PUT
export async function updateControlKindergarten(dto: UpdateKindergartenDto): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/controlKindergarten', {
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
			negative('Kindergarten already exists!');
		}
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}

	return res.json();
}

//GET
export async function loadControlKindergarten(): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/controlKindergarten');
	// TODO Error
	if (res.status >= 400) {
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}
