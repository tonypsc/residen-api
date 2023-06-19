import { InvalidArgumentError, StringValueObject } from '../../shared/domain';

class CondoName extends StringValueObject {
	constructor(name: string) {
		super(name);
		this.checkEmptyName(name);
		this.checkLengthOver250Chars(name);
	}

	protected checkLengthOver250Chars(name: string): void {
		if (name.length > 250)
			throw new InvalidArgumentError(
				`The user name ${name} has more than 250 characters.`
			);
	}

	protected checkEmptyName(name: string): void {
		if (!name) {
			throw new InvalidArgumentError('Name is required');
		}
	}
}
export { CondoName };
