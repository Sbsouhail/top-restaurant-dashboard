import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const tokenCookie = cookies.get('access_token');

		const res = await fetch('http://localhost:3000/api/restaurants', {
			method: 'post',
			body: JSON.stringify({ name }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		if (res?.status === 201) {
			redirect(303, '/my-restaurants');
		}
	}
} satisfies Actions;
