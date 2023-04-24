import { ValueObject } from './ValueObject';

abstract class StringValueObject extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}
}

export { StringValueObject };
