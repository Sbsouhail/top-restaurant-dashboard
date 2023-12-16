export const handle = async ({ event, resolve }) => {
	try {
		const tokenCookie = event.cookies.get('access_token');
		let fetchedUser;

		if (tokenCookie) {
			const res = await event.fetch('http://localhost:1337/api/users/me', {
				method: 'get',
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					authorization: `Bearer ${tokenCookie}`
				}
			});
			if (res?.status === 200) fetchedUser = await res.json();
		}

		event.locals.user = fetchedUser;

		if (event.url.pathname.startsWith('/auth') && fetchedUser) {
			return redirectTo('/');
		} else if (!event.url.pathname.startsWith('/auth') && !fetchedUser) {
			return redirectTo('/auth', 'token');
		}
	} catch (e) {
		return redirectTo('/auth', 'token');
	}
	const response = await resolve(event);
	return response;
};

function redirectTo(location: string, cookieToDelete?: string, body?: string): Response {
	return new Response(body, {
		status: 303,
		headers: {
			location,
			...(cookieToDelete
				? { 'set-cookie': `${cookieToDelete}=; Path=/; Expires=${new Date(0)}` }
				: {})
		}
	});
}
