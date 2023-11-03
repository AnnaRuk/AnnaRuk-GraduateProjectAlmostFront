import Kindergarten from './types/Kindergarten';

export async function getAllKindergarten(): Promise<{
	kindergartenBaseDTOList: Kindergarten[];
	cities: string[];
}> {
	const res = await fetch('/api/kindergartens');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}

