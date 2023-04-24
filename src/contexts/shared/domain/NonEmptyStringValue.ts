import { StringValueObject } from './StringValueObject';
import { InvalidArgumentError } from './exceptions/InvalidArgumentError';

class NonEmptyStringValue extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.checkStringEmpty(value);
	}

	protected checkStringEmpty(value: string) {
		if (!value || !value.trim())
			throw new InvalidArgumentError('Invalid string value');
	}
}

export { NonEmptyStringValue };
