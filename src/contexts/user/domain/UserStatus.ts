import { InvalidArgumentError, ValueObject } from '../../shared/domain';

class UserStatus extends ValueObject<number> {
	constructor(status?: UserPosibleStatus) {
		const userStatus = status ? status : UserPosibleStatus.inactive;
		super(userStatus);
		this.checkStatus(userStatus);
	}

	protected checkStatus(status: number) {
		if (!Object.values(UserPosibleStatus).includes(status)) {
			throw new InvalidArgumentError('Invalid status code');
		}
	}
}

enum UserPosibleStatus {
	inactive = 0,
	active = 1,
	unconfirmed = 2,
}

export { UserStatus, UserPosibleStatus };
