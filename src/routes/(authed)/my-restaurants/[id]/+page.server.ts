import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Restaurant } from '../../../../types/restaurant.interface';
import type { RestaurantMenu } from '../../../../types/restaurant-menu.interface';

export const load: PageServerLoad = async ({
	params,
	fetch,
	cookies
}): Promise<{
	restaurant: Restaurant;
	menus: { items: RestaurantMenu[]; count: number };
}> => {
	const tokenCookie = cookies.get('access_token');
	const pageParams: any = params;

	let restaurant: Restaurant;
	// if (tokenCookie) {
	let res = await fetch(`http://localhost:3000/api/restaurants/${pageParams.id}`, {
		method: 'get',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			authorization: `Bearer ${tokenCookie}`
		}
	});

	let menus: { items: RestaurantMenu[]; count: number } = { count: 0, items: [] };

	let res2 = await fetch(`http://localhost:3000/api/restaurants/${pageParams.id}/my_menus`, {
		method: 'get',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			authorization: `Bearer ${tokenCookie}`
		}
	});

	if (res2?.status === 200) menus = await res2.json();

	if (res?.status === 200) restaurant = await res.json();
	else redirect(303, '/');
	// }
	return {
		restaurant,
		menus
	};
};

export const actions = {
	delete: async ({ cookies, request, fetch, params }) => {
		const data = await request.formData();
		const menu_id = data.get('menu_id');

		const pageParams: any = params;

		if (!menu_id) {
			return fail(400, { menu_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(
			`http://localhost:3000/api/restaurants/${pageParams.id}/my_menus/${menu_id}`,
			{
				method: 'delete',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			}
		);

		if (res?.status === 200) {
			const data = await res.json();

			redirect(303, `/my-restaurants/${pageParams.id}`);
		}

		return fail(res.status, { menu_id });
	},
	activate: async ({ cookies, request, fetch, params }) => {
		const data = await request.formData();
		const menu_id = data.get('menu_id');

		const pageParams: any = params;

		if (!menu_id) {
			return fail(400, { menu_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(
			`http://localhost:3000/api/restaurants/${pageParams.id}/my_menus/${menu_id}/activate`,
			{
				method: 'PATCH',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			}
		);

		if (res?.status === 200) {
			const data = await res.json();

			redirect(303, `/my-restaurants/${pageParams.id}`);
		}

		return fail(res.status, { menu_id });
	},
	disactivate: async ({ cookies, request, fetch, params }) => {
		const data = await request.formData();
		const menu_id = data.get('menu_id');

		const pageParams: any = params;

		if (!menu_id) {
			return fail(400, { menu_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(
			`http://localhost:3000/api/restaurants/${pageParams.id}/my_menus/${menu_id}/disactivate`,
			{
				method: 'PATCH',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			}
		);

		console.log(menu_id);

		if (res?.status === 200) {
			const data = await res.json();

			redirect(303, `/my-restaurants/${pageParams.id}`);
		}

		return fail(res.status, { menu_id });
	}
} satisfies Actions;
