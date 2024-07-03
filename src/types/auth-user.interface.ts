export interface AuthUser {
	user_id: number;
	name: string;
	last_name: string;
	email: string;
	role: RoleEnum;
	status: StatusEnum;
}

export enum RoleEnum {
	Admin = 'Admin',
	User = 'User',
	RestaurantOwner = 'RestaurantOwner'
}

export enum StatusEnum {
	Pending = 'Pending',
	Accepted = 'Accepted',
	Blocked = 'Blocked'
}
