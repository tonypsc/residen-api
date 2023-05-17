import { MailRepository } from '../../shared/infrastructure/mail/MailRepository';
import { UserRepository } from '../domain';
import { FilterValueType } from '../../shared/domain/criteria';
import { UserEmail } from '../../user/domain/UserEmail';
import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';
import { NotFoundException } from '../../shared/domain';
import { User } from '../domain';

class UserRecoverLinkCreator {
	private _mailRepository: MailRepository;
	private _userRepository: UserRepository;
	private _jwtRepository: JwtRepository;
	private _emailFilter: Record<string, FilterValueType>;
	private _email: UserEmail;
	private _linkExpirationTime: string;

	constructor(
		userRepository: UserRepository,
		mailRepository: MailRepository,
		jwtRepository: JwtRepository,
		email: string,
		linkExpirationTime: string
	) {
		this._userRepository = userRepository;
		this._mailRepository = mailRepository;
		this._jwtRepository = jwtRepository;
		this._linkExpirationTime = linkExpirationTime;

		this._email = new UserEmail(email);

		this._emailFilter = {
			field: 'email',
			operator: '=',
			value: this._email.value,
		};
	}

	public async invoke() {
		const user = await this._userRepository.getOne([this._emailFilter]);
		const recoverLink = this._jwtRepository.generate(
			user?.toPrimitives()._id!,
			this._linkExpirationTime
		);

		if (user) {
			// Send the mail
			//TODO: pass language aware message
			await this._mailRepository.sendMail(
				this._email.value,
				'Recover password',
				recoverLink
			);
			return true;
		}
	}
}

export { UserRecoverLinkCreator };
