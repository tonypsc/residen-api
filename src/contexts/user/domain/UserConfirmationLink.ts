import { StringValueObject } from '../../shared/domain';

class UserConfirmationLink extends StringValueObject {
	constructor(link: string) {
		super(link);
	}
}

export { UserConfirmationLink };
