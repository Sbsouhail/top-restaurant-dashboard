import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		const res = await fetch('http://localhost:3000/api/auth/login', {
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
