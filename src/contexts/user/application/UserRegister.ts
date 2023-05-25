import { ExecutionException } from '../../shared/domain';
import { TemplateRepository } from '../../shared/infrastructure';
import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';
import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';
import { MailRepository } from '../../shared/infrastructure/mail/MailRepository';
import { UserRepository, User } from '../domain';
import { UserPosibleStatus } from '../domain/UserStatus';
import { UserCreator, UserRemover } from './';

class UserRegister {
	private _user: User;
	private _userRepository: UserRepository;
	private _cryptRepository: CryptRepository;
	private _jwtRepository: JwtRepository;
	private _linkExpirationTime?: string;
	private _mailRepository: MailRepository;
	private _registerUrl: string;

	constructor(
		userRepository: UserRepository,
		cryptRepository: CryptRepository,
		jwtRepository: JwtRepository,
		mailRepository: MailRepository,
		user: User,
		registerUrl: string,
		linkExpirationTime?: string
	) {
		this._userRepository = userRepository;
		this._cryptRepository = cryptRepository;
		this._jwtRepository = jwtRepository;
		this._mailRepository = mailRepository;
		this._user = user;
		this._registerUrl = registerUrl;
		this._linkExpirationTime = linkExpirationTime;
	}

	public async invoke() {
		// Set user status to unconfirmed
		this._user?.setStatus(UserPosibleStatus.unconfirmed);

		// Create new user
		const userCreator = new UserCreator(
			this._userRepository,
			this._user,
			this._cryptRepository
		);

		const user = await userCreator.invoke();
		let result = true;

		// Generate registration link
		if (user) {
			const userDto = user?.toPrimitives();

			const recoverLink = this._jwtRepository.generate(
				userDto._id,
				this._linkExpirationTime
			);

			// Prepare email template
			const templateRepository = new TemplateRepository('register-email');
			const replaces = new Map<string, string>([
				['name', userDto.name],
				['appname', 'Residen'],
				['recover-link', `${this._registerUrl}/${recoverLink}`],
			]);

			const mailBody = templateRepository.generate(replaces);

			result = await this._mailRepository.sendMail(
				user.toPrimitives().email,
				'Residen user register cofirmation',
				mailBody
			);
		}

		if (!user) {
			throw new ExecutionException('Registration process failed');
		}

		// Email could not be sent
		if (!result) {
			// Remove created user
			const userRemover = new UserRemover(
				this._userRepository,
				user.toPrimitives()._id
			);
			userRemover.invoke();
			throw new ExecutionException('Registration process failed');
		}

		return user;
	}
}

export { UserRegister };
