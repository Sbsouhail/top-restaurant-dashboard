import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('access_token', { path: '/' });
		redirect(303, '/auth');
	}
} satisfies Actions;
