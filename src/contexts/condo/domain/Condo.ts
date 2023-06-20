import { AggregateRoot } from '../../shared/domain';
import { CondoAddress } from './CondoAddress';
import { CondoId } from './CondoId';
import { CondoManagerId } from './CondoManager';
import { CondoName } from './CondoName';
import { CondoOwnerId } from './CondoOwner';
import { CondoPhoto } from './CondoPhoto';
import { CondoUsers } from './CondoUsers';

class Condo extends AggregateRoot {
	constructor(
		condoId: CondoId,
		condoName: CondoName,
		condoManagerId: CondoManagerId,
		condoOwnerId: CondoOwnerId,
		condoUsers: CondoUsers,
		condoAddress?: CondoAddress,
		condoPhoto?: CondoPhoto
	) {
		super();
	}

	toPrimitives() {}
	fromDto() {}
}

export { Condo };
