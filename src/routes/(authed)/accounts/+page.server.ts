import type { AuthUser } from '../../../types/auth-user.interface';
import type { PageServerLoad } from '../../(public)/auth/$types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

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
	fetch,
	url
}): Promise<{
	users: { items: AuthUser[]; count: number };
}> => {
	const tokenCookie = cookies.get('access_token');
	let fetchedUsers: { items: AuthUser[]; count: number } = { count: 0, items: [] };

	const page = url.searchParams.get('page') || 1;

	const page_size = url.searchParams.get('page_size') || 10;

	if (tokenCookie) {
		let res = await fetch(
			`${API_BASE_URL}/users?role=RestaurantOwner&page=${page}&page_size=${page_size}`,
			{
				method: 'get',

				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			}
		);
		if (res?.status === 200) fetchedUsers = await res.json();
	}
	return {
		users: { count: fetchedUsers.count, items: fetchedUsers.items }
	};
};

export const actions = {
	accept: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const user_id = data.get('user_id');

		if (!user_id) {
			return fail(400, { user_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(`${API_BASE_URL}/users/restaurant-owner/${user_id}/accept`, {
			method: 'post',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		if (res?.status === 201) {
			const data = await res.json();

			redirect(303, '/accounts');
		}

		return fail(res.status, { user_id });
	},
	block: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const user_id = data.get('user_id');

		if (!user_id) {
			return fail(400, { user_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(`${API_BASE_URL}/users/restaurant-owner/${user_id}/reject`, {
			method: 'post',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		if (res?.status === 201) {
			const data = await res.json();

			redirect(303, '/accounts');
		}

		return fail(res.status, { user_id });
	}
} satisfies Actions;
