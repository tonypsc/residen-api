import { UserDto } from '../../user/domain';

interface CondoDto {
	_id: string;
	condoName: string;
	condoOwner: UserDto;
	condoManager: UserDto;
	condoAddress?: string;
	condoUsers: UserDto[];
	condoPhoto?: string;
}

export { CondoDto };
