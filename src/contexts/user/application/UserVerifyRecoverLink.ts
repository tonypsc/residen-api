import { NotFoundException } from '../../shared/domain';
import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';
import { UserRepository } from '../domain';
import { UserGetById } from './UserGetById';

class UserVerifyRecoverLink {
	private _jwtRepository: JwtRepository;
	private _recoverLink: string;
	private _userRepository: UserRepository;

	constructor(
		userRepository: UserRepository,
		jwtRepository: JwtRepository,
		recoverLink: string
	) {
		this._userRepository = userRepository;
		this._jwtRepository = jwtRepository;
		this._recoverLink = recoverLink;
	}

	public async invoke() {
		const userId = await this._jwtRepository.authenticate(this._recoverLink);
		const userGetById = new UserGetById(this._userRepository, userId);

		// verify user exists
		await userGetById.invoke();

		return true;
	}
}

export { UserVerifyRecoverLink };
