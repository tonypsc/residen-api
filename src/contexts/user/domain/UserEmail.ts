import { EmailValueObject } from '../../shared/domain';

class UserEmail extends EmailValueObject {
	constructor(email: string) {
		super(email);
	}
}

export { UserEmail };
