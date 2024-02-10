import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const last_name = data.get('last_name');
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !name || !last_name) {
			return fail(400, { email, missing: true });
		}

		const res = await fetch(`${API_BASE_URL}/auth/register-restaurant-onwner`, {
			method: 'post',
			body: JSON.stringify({ email, password, name, last_name }),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});

		if (res?.status === 201) {
			const data = await res.json();
			cookies.set('access_token', data.token, { path: '/' });
			redirect(303, '/');
		}

		return fail(401, { email, unauthorized: true });
	}
} satisfies Actions;
