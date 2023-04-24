interface UserDto {
	_id: string;
	name: string;
	email: string;
	password: string;
	status?: number;
	confirmationLink?: string;
	confirmationLinkDate?: number;
	recoverLink?: string;
	recoverLinkDate?: number;
	avatar?: string;
	deleted?: boolean;
}

export { UserDto };
