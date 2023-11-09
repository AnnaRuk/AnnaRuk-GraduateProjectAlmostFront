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
	if (res.status >= 400) {
		console.log('HELP ADD');
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

	if (res.status >= 400) {
		console.log('HELP PUT');
	}

	return res.json();
}

//GET
export async function loadChildren(): Promise<{ children: Child[] }> {
	const res = await fetch('/api/users/profile/children');
	if (res.status >= 400) {
		console.log('HELP LOAD CHILDREN');
	}
	console.log('LOAD CHILDREN');
	return res.json();
}
