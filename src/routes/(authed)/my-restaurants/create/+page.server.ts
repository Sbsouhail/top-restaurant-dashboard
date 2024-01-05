import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const name = data.get('name');
		const location = data.get('location');
		const image = data.get('image') as File;
		const tokenCookie = cookies.get('access_token');

		if (!name || !location || !image) {
			return fail(400, { fail: 'missing data', missing: true });
		}

		const formData = new FormData();

		formData.append('image', new Blob([await image.arrayBuffer()], { type: 'image/jpg' }));

		console.log(formData);

		const imageRes = await fetch('http://localhost:3000/api/files/upload', {
			method: 'post',
			body: formData,
			headers: {
				accept: 'application/json',
				authorization: `Bearer ${tokenCookie}`
			}
		});

		console.log(imageRes);

		if (imageRes.status != 201) {
			return fail(400, { fail: 'missing data', missing: true });
		}

		const imageUri = (await imageRes.json()).path;

		const res = await fetch('http://localhost:3000/api/restaurants', {
			method: 'post',
			body: JSON.stringify({ name, location, cover_image_uri: imageUri }),
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
