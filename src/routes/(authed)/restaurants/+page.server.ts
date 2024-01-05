import type { AuthUser } from '../../../types/auth-user.interface';
import type { PageServerLoad } from '../../(public)/auth/$types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { Restaurant } from '../../../types/restaurant.interface';

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
	restaurants: { items: Restaurant[]; count: number };
}> => {
	const tokenCookie = cookies.get('access_token');
	let fetchedRestaurants: { items: Restaurant[]; count: number } = { count: 0, items: [] };

	if (tokenCookie) {
		let res = await fetch('http://localhost:3000/api/restaurants', {
			method: 'get',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});
		if (res?.status === 200) fetchedRestaurants = await res.json();
	}
	return {
		restaurants: { count: fetchedRestaurants.count, items: fetchedRestaurants.items }
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

		const res = await fetch(`http://localhost:3000/api/users/restaurant-owner/${user_id}/accept`, {
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

		const res = await fetch(`http://localhost:3000/api/users/restaurant-owner/${user_id}/reject`, {
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
