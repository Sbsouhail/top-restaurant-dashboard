import type { AuthUser } from '../../../types/auth-user.interface';
import type { PageServerLoad } from '../../(public)/auth/$types';

function redirectTo(location: string, cookieToDelete?: string, body?: string): Response {
	return new Response(body, {
		status: 303,
		headers: {
			location,
			...(cookieToDelete
				? { 'set-cookie': `${cookieToDelete}=; Path=/; Expires=${new Date(0)}` }
				: {})
		}
	});
}

export const load: PageServerLoad = async ({
	cookies,
	fetch
}): Promise<{
	users: { items: AuthUser[]; count: number };
	accptedUsers: { items: AuthUser[]; count: number };
}> => {
	const tokenCookie = cookies.get('access_token');
	let fetchedUsers: { items: AuthUser[]; count: number } = { count: 0, items: [] };
	let acceptedUsers: { items: AuthUser[]; count: number } = { count: 0, items: [] };

	if (tokenCookie) {
		let res = await fetch('http://localhost:3000/api/users', {
			method: 'get',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});
		if (res?.status === 200) fetchedUsers = await res.json();

		res = await fetch('http://localhost:3000/api/users?role=RestaurantOwner', {
			method: 'get',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});
		if (res?.status === 200) acceptedUsers = await res.json();
	}
	return {
		users: { count: fetchedUsers.count, items: fetchedUsers.items },
		accptedUsers: { count: acceptedUsers.count, items: acceptedUsers.items }
	};
};
