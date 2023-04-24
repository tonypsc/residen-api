import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';

import { UserRepository, User } from '../domain';

import { UserGetById } from './UserGetById';

class UserCreator {
	protected _repository: UserRepository;
	protected _user: User;
	protected _cryptRepository: CryptRepository;

	constructor(
		userRepository: UserRepository,
		user: User,
		cryptRepository: CryptRepository
	) {
		this._repository = userRepository;
		this._user = user;
		this._cryptRepository = cryptRepository;
	}

	async invoke() {
		this._user.setCryptedPassword(
			this._cryptRepository.generateHash(
				this._user.toPrimitives().password as string
			)
		);
		const result = await this._repository.save(this._user);
		const userGetById = new UserGetById(this._repository, result);
		return await userGetById.invoke();
	}
}

export { UserCreator };
