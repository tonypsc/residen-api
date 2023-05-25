import { NonEmptyStringValue } from '../../shared/domain';
import { UserRepository } from '../domain';

class UserRemover {
	private _userRepository: UserRepository;
	private _userId: NonEmptyStringValue;

	constructor(userRepository: UserRepository, userId: string) {
		this._userRepository = userRepository;
		this._userId = new NonEmptyStringValue(userId);
	}

	public async invoke() {
		return await this._userRepository.delete(this._userId.value);
	}
}

export { UserRemover };
