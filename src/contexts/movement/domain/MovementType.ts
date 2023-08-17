import { StringValueObject } from '../../shared/domain';

class MovementType extends StringValueObject {
	constructor(type: MovementTypes) {
		super(type);
	}
}

type MovementTypes = 'in' | 'out';

export { MovementType, MovementTypes };
