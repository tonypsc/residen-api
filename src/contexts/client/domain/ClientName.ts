import { InvalidArgumentError, NonEmptyStringValue } from '../../shared/domain';

class ClientName extends NonEmptyStringValue {
	constructor(value: string) {
		super(value);
		this.checkLengthOver250Chars(value);
	}

	private checkLengthOver250Chars(value: string) {
		if (value.length > 250) {
			throw new InvalidArgumentError('Name must not exceed 250 chars');
		}
	}
}

export { ClientName };
