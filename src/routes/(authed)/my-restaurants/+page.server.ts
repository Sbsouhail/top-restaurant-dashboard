import type { AuthUser } from '../../../types/auth-user.interface';
import type { PageServerLoad } from '../../(public)/auth/$types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { Restaurant } from '../../../types/restaurant.interface';
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
	restaurants: { items: Restaurant[]; count: number };
}> => {
	const tokenCookie = cookies.get('access_token');
	let fetchedRestaurants: { items: Restaurant[]; count: number } = { count: 0, items: [] };

	const page = url.searchParams.get('page') || 1;

	const page_size = url.searchParams.get('page_size') || 10;

	if (tokenCookie) {
		let res = await fetch(`${API_BASE_URL}/restaurants/me?page=${page}&page_size=${page_size}`, {
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
	delete: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const restaurant_id = data.get('restaurant_id');

		if (!restaurant_id) {
			return fail(400, { restaurant_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(`${API_BASE_URL}/restaurants/${restaurant_id}`, {
			method: 'delete',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		if (res?.status === 200) {
			const data = await res.json();

			redirect(303, '/my-restaurants');
		}

		return fail(res.status, { restaurant_id });
	}
} satisfies Actions;
