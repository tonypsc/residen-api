import { UserRepository, UserDto, User } from '../domain';

class UserGetAll {
	userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async invoke() {
		return await this.userRepository.getAll();
	}
}

export { UserGetAll };
