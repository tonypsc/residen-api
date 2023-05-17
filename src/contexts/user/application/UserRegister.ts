import { TemplateRepository } from '../../shared/infrastructure';
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
	private _recoverUrl: string;

	constructor(
		userRepository: UserRepository,
		cryptRepository: CryptRepository,
		jwtRepository: JwtRepository,
		mailRepository: MailRepository,
		user: User,
		linkExpirationTime: string,
		recoverUrl: string
	) {
		this._userRepository = userRepository;
		this._cryptRepository = cryptRepository;
		this._jwtRepository = jwtRepository;
		this._mailRepository = mailRepository;
		this._user = user;
		this._linkExpirationTime = linkExpirationTime;
		this._recoverUrl = recoverUrl;
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
				['recover-link', `${this._recoverUrl}/${recoverLink}`],
			]);

			const mailBody = templateRepository.generate(replaces);

			console.log(mailBody);

			await this._mailRepository.sendMail(
				user.toPrimitives().email,
				'Residen user register cofirmation',
				mailBody
			);
		}

		return user;
	}
}

export { UserRegister };
