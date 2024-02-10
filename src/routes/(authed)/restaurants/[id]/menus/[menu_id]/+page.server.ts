import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RestaurantMenuItem } from '../../../../../../types/restaurant-menu-item.interface';

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

	const page = url.searchParams.get('page') || 1;

	const page_size = url.searchParams.get('page_size') || 10;

	let items: { items: RestaurantMenuItem[]; count: number } = { count: 0, items: [] };

	let res = await fetch(
		`http://localhost:3000/api/restaurants/${pageParams.id}/menus/${pageParams.menu_id}/items?page=${page}&page_size=${page_size}`,
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
			`http://localhost:3000/api/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items/${menu_item_id}`,
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
			`http://localhost:3000/api/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items/${menu_item_id}`
		);

		if (res?.status === 200) {
			const data = await res.json();

			redirect(303, `/my-restaurants/${pageParams.id}/menus/${pageParams.menu_id}`);
		}

		return fail(res.status, { menu_item_id });
	}
} satisfies Actions;
