import Kindergarten from '../../features/kindergartens/types/Kindergarten';
import DeleteFavoriteDto from './types/DeleteFavoriteDto';
import FavoriteAddDto from './types/FavoriteAddDto';

//GET
export async function getFavorites(): Promise<{
	kindergartens: Kindergarten[];
}> {
	const res = await fetch('/api/users/profile/favorites');
	if (res.status >= 400) {
		// достаем текст ошибки из ответа
		const { message }: { message: string } = await res.json();
		throw new Error(message);
	}
	return res.json();
}

//DELETE

export async function deleteFromFavorites(id: DeleteFavoriteDto): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/favorites', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(id),
	});
	if (res.status >= 400) {
		console.log('HELP');
	}

	return res.json();
}

//POST
export async function addToFavorites(dto: FavoriteAddDto): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/favorites', {
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
