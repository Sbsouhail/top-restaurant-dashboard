import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RestaurantMenuItem } from '../../../../../../types/restaurant-menu-item.interface';
import { API_BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({
	params,
	fetch,
	cookies,
	url
}): Promise<{
	items: { items: RestaurantMenuItem[]; count: number };
}> => {
	const tokenCookie = cookies.get('access_token');
	const pageParams: any = params;

	let items: { items: RestaurantMenuItem[]; count: number } = { count: 0, items: [] };

	const page = url.searchParams.get('page') || 1;

	const page_size = url.searchParams.get('page_size') || 10;

	let res = await fetch(
		`${API_BASE_URL}/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items?page=${page}&page_size=${page_size}`,
		{
			method: 'get',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		}
	);

	if (res?.status === 200) items = await res.json();
	else redirect(303, '/');
	// }
	return {
		items
	};
};

export const actions = {
	delete: async ({ cookies, request, fetch, params }) => {
		const data = await request.formData();
		const menu_item_id = data.get('menu_item_id');

		const pageParams: any = params;

		if (!menu_item_id) {
			return fail(400, { menu_item_id, missing: true });
		}

		const tokenCookie = cookies.get('access_token');

		const res = await fetch(
			`${API_BASE_URL}/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items/${menu_item_id}`,
			{
				method: 'delete',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			}
		);

		console.log(
			`${API_BASE_URL}/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items/${menu_item_id}`
		);

		if (res?.status === 200) {
			const data = await res.json();

			redirect(303, `/my-restaurants/${pageParams.id}/menus/${pageParams.menu_id}`);
		}

		return fail(res.status, { menu_item_id });
	}
} satisfies Actions;
