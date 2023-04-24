import { v4 } from 'uuid';
import { StringValueObject } from './StringValueObject';

class UuidValue extends StringValueObject {
	constructor(id: string) {
		if (!id) id = v4();
		super(id);
		// validate id as valid uuid
	}

	public static random(): UuidValue {
		return new UuidValue(v4());
	}
}

export { UuidValue };
