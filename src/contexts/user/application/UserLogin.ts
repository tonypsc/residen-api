import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';
import { FilterValueType } from '../../shared/domain/criteria';
import { AuthorizationException } from '../../shared/domain';

import { UserRepository } from '../domain';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';

class UserLogin {
	private userRepository: UserRepository;
	private _emailFilter: Record<string, FilterValueType>;
	private _cryptRepository: CryptRepository;
	private _email: UserEmail;
	private _password: UserPassword;

	constructor(
		userRepository: UserRepository,
		cryptRepository: CryptRepository,
		email: string,
		password: string
	) {
		this.userRepository = userRepository;
		this._cryptRepository = cryptRepository;

		// Validate email and password
		this._email = new UserEmail(email);
		this._password = new UserPassword(password, false);

		this._emailFilter = {
			field: 'email',
			operator: '=',
			value: this._email.value,
		};
	}

	async invoke() {
		const user = await this.userRepository.getOne([this._emailFilter]);
		const result = await this._cryptRepository.compare(
			this._password.value,
			user?.toPrimitives().password!
		);
		if (result) return user;
		throw new AuthorizationException('Invalid credentials');
	}
}

export { UserLogin };
