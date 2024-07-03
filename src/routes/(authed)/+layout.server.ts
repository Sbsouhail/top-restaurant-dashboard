import type { AuthUser } from '../../types/auth-user.interface';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }): { authUser: AuthUser } => {
	return {
		authUser: locals.user
	};
};
