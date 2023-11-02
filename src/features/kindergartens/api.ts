import Kindergarten from './types/Kindergarten';

export async function getAllKindergarten(): Promise<Kindergarten[]> {
	const res = await fetch('/api/kindergartens');
	// TODO
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}
