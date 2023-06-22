import { AggregateRoot } from '../../shared/domain';
import { CondoAddress } from './CondoAddress';
import { CondoDto } from './CondoDto';
import { CondoId } from './CondoId';
import { CondoManager } from './CondoManager';
import { CondoName } from './CondoName';
import { CondoOwner } from './CondoOwner';
import { CondoPhoto } from './CondoPhoto';
import { CondoUsers } from './CondoUsers';
import { User } from '../../user/domain';

class Condo extends AggregateRoot {
	private condoId: CondoId;
	private condoName: CondoName;
	private condoManager: CondoManager;
	private condoOwner: CondoOwner;
	private condoUsers: CondoUsers;
	private condoAddress?: CondoAddress;
	private condoPhoto?: CondoPhoto;

	constructor(
		condoId: CondoId,
		condoName: CondoName,
		condoManager: CondoManager,
		condoOwner: CondoOwner,
		condoUsers: CondoUsers,
		condoAddress?: CondoAddress,
		condoPhoto?: CondoPhoto
	) {
		super();
		this.condoId = condoId;
		this.condoName = condoName;
		this.condoManager = condoManager;
		this.condoOwner = condoOwner;
		this.condoUsers = condoUsers;
		this.condoAddress = condoAddress;
		this.condoPhoto = condoPhoto;
	}

	toPrimitives(): CondoDto {
		return {
			_id: this.condoId.value,
			condoName: this.condoName.value,
			condoManager: this.condoManager.toPrimitives(),
			condoOwner: this.condoOwner.toPrimitives(),
			condoUsers: this.condoUsers.map((user) => user.toPrimitives()),
			condoAddress: this.condoAddress?.value,
			condoPhoto: this.condoPhoto?.value,
		};
	}

	static fromPrimitives(condoDto: CondoDto) {
		return new Condo(
			new CondoId(condoDto._id),
			new CondoName(condoDto.condoName),
			User.fromDto(condoDto.condoManager),
			User.fromDto(condoDto.condoOwner),
			condoDto.condoUsers.map((user) => User.fromDto(user)),
			condoDto.condoAddress
				? new CondoAddress(condoDto.condoAddress)
				: undefined,
			condoDto.condoPhoto ? new CondoPhoto(condoDto.condoPhoto) : undefined
		);
	}
}

export { Condo };
