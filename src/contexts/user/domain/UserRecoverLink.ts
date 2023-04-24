import { StringValueObject } from '../../shared/domain';

class UserRecoverLink extends StringValueObject {
	constructor(link: string) {
		super(link);
	}
}

export { UserRecoverLink };
