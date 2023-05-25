import { ValidationException } from '../../shared/domain/exceptions/ValidationException';
import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';
import { UserRepository } from '../domain';
import { UserPosibleStatus } from '../domain/UserStatus';
import { UserGetById } from './UserGetById';

class UserConfirmRegistration {
	private _registerLink: string;
	private _jwtRepository: JwtRepository;
	private _userRepository: UserRepository;

	constructor(
		userRepository: UserRepository,
		jwtRepository: JwtRepository,
		registerLink: string
	) {
		this._userRepository = userRepository;
		this._jwtRepository = jwtRepository;
		this._registerLink = registerLink;
	}

	async invoke() {
		const userId = await this._jwtRepository.authenticate(this._registerLink);
		const userGetById = new UserGetById(this._userRepository, userId);

		// verify user exists
		const user = await userGetById.invoke();

		if (user) {
			if (user.toPrimitives().status !== UserPosibleStatus.unconfirmed) {
				throw new ValidationException('Wrong user status');
			}

			user.setStatus(UserPosibleStatus.active);
			await this._userRepository.save(user);
		}

		return user;
	}
}

export { UserConfirmRegistration };
