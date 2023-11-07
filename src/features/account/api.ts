import Child from '../children/types/Child';
import Kindergarten from '../kindergartens/types/Kindergarten';

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