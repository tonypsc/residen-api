import { StringValueObject } from '../../shared/domain';

class UserAvatar extends StringValueObject {
	constructor(avatar: string) {
		super(avatar);
	}
}

export { UserAvatar };
