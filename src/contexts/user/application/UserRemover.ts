import { UserRepository } from '../domain';

class UserRemover {
	private _userRepository: UserRepository;
	private _userId: string;

	constructor(userRepository: UserRepository, userId: string) {
		this._userRepository = userRepository;
		this._userId = userId;
	}

	public invoke() {}
}

export { UserRemover };
