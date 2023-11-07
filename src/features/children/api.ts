import Child from './types/Child';
import ChildDto from './types/ChildDto';

//POST
export async function addChild(dto: ChildDto): Promise<Child[]> {
	const res = await fetch('/api/users/profile/children', {
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

// //GET
// export async function loadChildren(): Promise<Child[]> {
// 	const res = await fetch('/api/users/profile/children');
// 	if (res.status >= 400) {
// 		console.log('HELP');
// 	}

// 	return res.json();
// }

// PUT
export async function updateChildren(child: Child): Promise<Child> {
	await fetch(`/api/users/profile/children`, {
		method: 'PUT',
		body: JSON.stringify(child),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

