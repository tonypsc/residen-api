import { ClientDto } from '../../client/domain';
import { MovementTypes } from './MovementType';

interface MovementDto {
	_id: string;
	type: MovementTypes;
	occurrence: number;
	client: ClientDto;
}

export { MovementDto };
