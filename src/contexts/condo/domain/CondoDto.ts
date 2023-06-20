import { UserDto } from '../../user/domain';

interface CondoDto {
	condoId: string;
	condoName: string;
	condoOwner: UserDto;
	condoManager: UserDto;
	condoAddress?: string;
	condoUsers: UserDto[];
	condoPhoto?: string;
}

export { CondoDto };
