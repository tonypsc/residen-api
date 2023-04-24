import { InvalidArgumentError, StringValueObject } from '../../shared/domain';

export class UserName extends StringValueObject {
	constructor(name: string) {
		super(name);
		this.checkEmptyName(name);
		this.checkLengthOver50Chars(name);
	}

	protected checkLengthOver50Chars(name: string): void {
		if (name.length > 50)
			throw new InvalidArgumentError(
				`The user name ${name} has more than 50 characters.`
			);
	}

	protected checkEmptyName(name: string): void {
		if (!name) {
			throw new InvalidArgumentError('Name is required');
		}
	}
}
