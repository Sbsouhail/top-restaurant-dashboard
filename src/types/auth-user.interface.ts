export interface AuthUser {
	user_id: number;
	name: string;
	last_name: string;
	email: string;
	role: RoleEnum;
	is_restaurant_owner_request: boolean;
}

export enum RoleEnum {
	Admin = 'Admin',
	User = 'User',
	RestaurantOwner = 'RestaurantOwner'
}
