import { PasswordValueObject } from '../../shared/domain';

class UserPassword extends PasswordValueObject {
	constructor(password: string, checkStrength?: boolean) {
		super(password, checkStrength);
	}
}

export { UserPassword };
