import { MailRepository } from '../../shared/infrastructure/mail/MailRepository';
import { UserRepository } from '../domain';
import { FilterValueType } from '../../shared/domain/criteria';
import { UserEmail } from '../../user/domain/UserEmail';
import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';
import { NotFoundException } from '../../shared/domain';
import { User } from '../domain';

class UserRecoverLinkCreator {
	private _mailRepository: MailRepository;
	private _userRepository: UserRepository;
	private _cryptRepository: CryptRepository;
	private _emailFilter: Record<string, FilterValueType>;
	private _email: UserEmail;

	constructor(
		userRepository: UserRepository,
		mailRepository: MailRepository,
		crypRepository: CryptRepository,
		email: string
	) {
		this._userRepository = userRepository;
		this._mailRepository = mailRepository;
		this._cryptRepository = crypRepository;

		this._email = new UserEmail(email);

		this._emailFilter = {
			field: 'email',
			operator: '=',
			value: this._email.value,
		};
	}

	public async invoke() {
		const user = await this._userRepository.getOne([this._emailFilter]);
		const recoverLink = this._cryptRepository.generateHash(
			user?.toPrimitives()._id!
		);

		if (!user) throw new NotFoundException('User not found');

		// Send the mail
		await this._mailRepository.sendMail(this._email.value);

		// Update user recover link field
		const dtoUser = user.toPrimitives();
		dtoUser.recoverLink = recoverLink;
		dtoUser.recoverLinkDate = new Date().getTime();
		this._userRepository.save(User.fromDto(dtoUser));
	}
}
