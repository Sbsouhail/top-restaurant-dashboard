import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Restaurant } from '../../../../types/restaurant.interface';

export const load: PageServerLoad = async ({
	params,
	fetch
}): Promise<
	| {
			restaurant: Restaurant;
	  }
	| undefined
> => {
	// const tokenCookie = cookies.get('access_token');
	const pageParams: any = params;

	let restaurant: Restaurant;
	// if (tokenCookie) {
	let res = await fetch(`http://localhost:3000/api/restaurants/${pageParams.id}`, {
		method: 'get',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json'
			// authorization: `Bearer ${tokenCookie}`
		}
	});
	if (res?.status === 200) restaurant = await res.json();
	else redirect(303, '/');
	// }
	return {
		restaurant
	};
};
