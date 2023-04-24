import { InvalidArgumentError } from './exceptions/InvalidArgumentError';
import { StringValueObject } from './StringValueObject';

abstract class EmailValueObject extends StringValueObject {
	private _email: string;

	constructor(email: string) {
		super(email);
		this._email = email;

		this.checkEmptyEmail();
		this.checkValidEmail();
	}

	protected checkEmptyEmail() {
		if (!this._email) throw new InvalidArgumentError('Email is required');
	}

	protected checkValidEmail() {
		if (
			!this._email ||
			//eslint-disable-next-line
			!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this._email)
		) {
			throw new InvalidArgumentError('Invalid email address');
		}
	}
}

export { EmailValueObject };
