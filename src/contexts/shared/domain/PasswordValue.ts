import { StringValueObject } from './StringValueObject';
import { InvalidArgumentError } from './exceptions/InvalidArgumentError';

abstract class PasswordValueObject extends StringValueObject {
	constructor(
		password: string,
		checkStrength: boolean = false,
		confirm?: string
	) {
		super(password);
		this.checkEmptyPassword(password);
		if (checkStrength) {
			this.checkPasswordStrength(password);
		}
		if (confirm) {
			this.checkConfirmMatch(password, confirm);
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
		if (!PasswordValueObject.checkStrength(password)) {
			throw new InvalidArgumentError('Password too weak');
		}
	}

	protected checkConfirmMatch(password: string, confirm: string) {
		if (password !== confirm)
			throw new InvalidArgumentError('Password and confirmation do not match');
	}
}

export { PasswordValueObject };
