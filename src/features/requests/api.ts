import ChildWithParent from './types/ChildWithParent';
import Request from './types/Request';

export async function getAllRequests(): Promise<{
	childWithUserList: ChildWithParent[];
	requests: Request[];
}> {
	const res = await fetch('/api/users/profile/requests');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}
