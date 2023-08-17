import { AggregateRoot } from '../../shared/domain';
import { RoomDescription } from './RoomDescription';
import { RoomId } from './RoomId';
import { RoomType } from './RoomType';

class Room extends AggregateRoot {
	private _id: RoomId;
	private type: RoomType;
	private description: RoomDescription;

	constructor(id: string, type: string, description: string) {
		super();
		this._id = new RoomId(id);
		this.type = new RoomType(type);
		this.description = new RoomDescription(description);
	}

	toPrimitives(): RoomDto {
		return {
			_id: this._id.value,
			type: this.type.value,
			description: this.description.value,
		};
	}

	static fromPrimitives(dto: RoomDto): Room {
		return new Room(dto._id, dto.type, dto.description);
	}
}

export { Room };
