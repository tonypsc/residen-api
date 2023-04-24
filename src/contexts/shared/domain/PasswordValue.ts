import { StringValueObject } from './StringValueObject';
import { config } from '../../../config';
import { InvalidArgumentError } from './exceptions/InvalidArgumentError';

abstract class PasswordValueObject extends StringValueObject {
	constructor(password: string, checkStrength?: boolean) {
		super(password);
		this.checkEmptyPassword(password);
		if (checkStrength) {
			this.checkPasswordStrength(password);
		}
	}

	public static checkStrength(password?: string) {
		return password
			? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
					password
			  )
			: false;
	}

	protected checkEmptyPassword(password: string) {
		if (!password) {
			throw new InvalidArgumentError('Password is required');
		}
	}

	protected checkPasswordStrength(password: string) {
		if (config.forcePasswordStrength) {
			if (!PasswordValueObject.checkStrength(password)) {
				throw new InvalidArgumentError('Password too weak');
			}
		}
	}
}

export { PasswordValueObject };
