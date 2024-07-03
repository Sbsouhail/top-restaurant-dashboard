import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request, fetch, params }) => {
		const data = await request.formData();

		const name = data.get('name');
		const price = data.get('price');
		const description = data.get('description');
		const image = data.get('image') as File;
		const tokenCookie = cookies.get('access_token');
		const pageParams: any = params;

		if (!name || !description || !price || !image) {
			// console.log('Yassince');

			return fail(400, { fail: 'missing data', missing: true });
		}

		const formData = new FormData();

		formData.append('image', new Blob([await image.arrayBuffer()]));

		const imageRes = await fetch(`${API_BASE_URL}/files/upload`, {
			method: 'post',
			body: formData,
			headers: {
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		if (imageRes.status != 201) {
			return fail(400, { fail: 'missing data', missing: true });
		}

		const imageUri = (await imageRes.json()).path;

		const res = await fetch(
			`${API_BASE_URL}/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items`,
			{
				method: 'post',
				body: JSON.stringify({ name, description, price: +price, cover_image_uri: imageUri }),
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			}
		);

		// console.log(
		// 	`${API_BASE_URL}/restaurants/${pageParams.id}/my_menus/${pageParams.menu_id}/items`
		// );
		// console.log(tokenCookie);
		// console.log({ name, description, price, cover_image_uri: imageUri });

		if (res?.status === 201) {
			redirect(303, `/my-restaurants/${pageParams.id}/menus/${pageParams.menu_id}`);
		}
	}
} satisfies Actions;
