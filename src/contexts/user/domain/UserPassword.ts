import { PasswordValueObject } from '../../shared/domain';

class UserPassword extends PasswordValueObject {
	constructor(password: string, checkStrength?: boolean, confirm?: string) {
		super(password, checkStrength, confirm);
	}
}

export { UserPassword };
