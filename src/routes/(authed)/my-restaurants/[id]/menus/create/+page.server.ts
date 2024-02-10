import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const id = data.get('id');
		const tokenCookie = cookies.get('access_token');

		if (!name || !description) {
			return fail(400, { fail: 'missing data', missing: true });
		}

		const res = await fetch(`http://localhost:3000/api/restaurants/${id}/my_menus`, {
			method: 'post',
			body: JSON.stringify({ name, description, is_active: false }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		if (res?.status === 201) {
			redirect(303, `/my-restaurants/${id}`);
		}
	}
} satisfies Actions;
