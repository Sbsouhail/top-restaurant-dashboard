import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		const res = await fetch(`${API_BASE_URL}/auth/login/restaurant-owner`, {
			method: 'post',
			body: JSON.stringify({ email, password }),
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
