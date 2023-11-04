import Kindergarten from '../../features/kindergartens/types/Kindergarten';

//GET
export async function getFavorites(): Promise<{
	kindergartenDTOList: Kindergarten[];
}> {
	const res = await fetch('/api/users/profile/favorites');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}

//DELETE
export async function deleteFromFavorites(id: number): Promise<Kindergarten> {
	const data = { id };
	const res = await fetch('/api/users/profile/favorites', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (res.status >= 400) {
		console.log('HELP');
	}

	return res.json();
}
