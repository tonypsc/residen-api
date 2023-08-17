import { Client } from '../../client/domain';
import { AggregateRoot } from '../../shared/domain';
import { MovementDto } from './MovementDto';
import { MovementId } from './MovementId';
import { MovementOccurrence } from './MovementOccurrence';
import { MovementType, MovementTypes } from './MovementType';

class Movement extends AggregateRoot {
	private _id: MovementId;
	private type: MovementType;
	private occurrence: MovementOccurrence;
	private client: Client;

	constructor(
		_id: string,
		type: MovementTypes,
		occurrence: number,
		client: Client
	) {
		super();
		this._id = new MovementId(_id);
		this.type = new MovementType(type);
		this.occurrence = new MovementOccurrence(occurrence);
		this.client = client;
	}

	toPrimitives(): MovementDto {
		return {
			_id: this._id.value,
			type: this.type.value as MovementTypes,
			occurrence: this.occurrence.value,
			client: this.client.toPrimitives(),
		};
	}
}

export { Movement };
