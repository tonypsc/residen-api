interface UserDto {
	_id: string;
	name: string;
	email: string;
	password: string;
	status?: number;
	confirmationLink?: string;
	confirmationLinkDate?: number;
	avatar?: string;
	deleted?: boolean;
}

export { UserDto };
