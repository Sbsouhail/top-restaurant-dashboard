import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const name = data.get('name');
		const location = data.get('location');
		const phone = data.get('phone');
		const email = data.get('email');
		const image = data.get('image') as File;
		const tokenCookie = cookies.get('access_token');

		if (!name || !location || !phone || !email || !image) {
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

		const res = await fetch(`${API_BASE_URL}/restaurants`, {
			method: 'post',
			body: JSON.stringify({ name, location, cover_image_uri: imageUri, phone, email }),
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
