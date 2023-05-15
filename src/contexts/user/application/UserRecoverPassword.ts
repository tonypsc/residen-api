import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';
import { UserRepository } from '../domain';
import { UserPassword } from '../domain/UserPassword';
import { UserVerifyRecoverLink } from './UserVerifyRecoverLink';
import { UserGetById } from './UserGetById';
import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';
import { User } from '../domain';

class UserRecoverPassword {
	private _userRepository: UserRepository;
	private _jwtRepository: JwtRepository;
	private _cryptRepository: CryptRepository;
	private _password: UserPassword;
	private _recoverlink: string;

	constructor(
		userRepository: UserRepository,
		jwtRepository: JwtRepository,
		cryptRepository: CryptRepository,
		password: string,
		confirm: string,
		recoverlink: string,
		enforcePasswordStrength: boolean
	) {
		this._userRepository = userRepository;
		this._jwtRepository = jwtRepository;
		this._cryptRepository = cryptRepository;
		this._password = new UserPassword(
			password,
			enforcePasswordStrength,
			confirm
		);
		this._recoverlink = recoverlink;
	}

	public async invoke() {
		const userVerifyRecoverLink = new UserVerifyRecoverLink(
			this._userRepository,
			this._jwtRepository,
			this._recoverlink
		);

		const user = await userVerifyRecoverLink.invoke();

		if (user) {
			// Create new password
			user.setCryptedPassword(
				this._cryptRepository.generateHash(this._password.value)
			);
			await this._userRepository.save(user);
		}

		return user;
	}
}

export { UserRecoverPassword };
