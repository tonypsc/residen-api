import { InvalidArgumentError, StringValueObject } from '../../shared/domain';
import { RoomTypes } from './RoomTypes';

class RoomType extends StringValueObject {
	constructor(type: string) {
		super(type);
	}

	protected checkValidType(type: string) {
		if (type in RoomTypes) {
			throw new InvalidArgumentError('Invalid room type');
		}
	}
}

export { RoomType };
