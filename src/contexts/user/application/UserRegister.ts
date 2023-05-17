import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';
import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';
import { MailRepository } from '../../shared/infrastructure/mail/MailRepository';
import { UserRepository, User } from '../domain';
import { UserCreator } from './UserCreator';

class UserRegister {
	private _user: User;
	private _userRepository: UserRepository;
	private _cryptRepository: CryptRepository;
	private _jwtRepository: JwtRepository;
	private _linkExpirationTime: string;
	private _mailRepository: MailRepository;

	constructor(
		userRepository: UserRepository,
		cryptRepository: CryptRepository,
		jwtRepository: JwtRepository,
		mailRepository: MailRepository,
		user: User,
		linkExpirationTime: string
	) {
		this._userRepository = userRepository;
		this._cryptRepository = cryptRepository;
		this._jwtRepository = jwtRepository;
		this._mailRepository = mailRepository;
		this._user = user;
		this._linkExpirationTime = linkExpirationTime;
	}

	public async invoke() {
		// Create new user
		const userCreator = new UserCreator(
			this._userRepository,
			this._user,
			this._cryptRepository
		);

		const user = await userCreator.invoke();

		// Generate registration link
		if (user) {
			const recoverLink = this._jwtRepository.generate(
				user?.toPrimitives()._id!,
				this._linkExpirationTime
			);
			await this._mailRepository.sendMail(
				user.toPrimitives().email,
				'Residen registration',
				recoverLink
			);
		}

		return user;
	}
}

export { UserRegister };
