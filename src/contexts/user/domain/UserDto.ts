interface UserDto {
	_id: string;
	name: string;
	email: string;
	password: string;
	status?: number;
	avatar?: string;
	deleted?: boolean;
}

export { UserDto };
