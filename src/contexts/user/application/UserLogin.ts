import { CryptRepository } from '../../shared/infrastructure/crypt/CryptRepository';

import { UserRepository, UserDto, User } from '../domain';
import { OrderTypes, FilterValueType } from '../../shared/domain/criteria';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';

class UserLogin {
	userRepository: UserRepository;
	private _filter: Array<Record<string, FilterValueType>> = [];
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

		this._filter.push({
			field: 'email',
			operator: '=',
			value: this._email.value,
		});
	}

	async invoke() {
		try {
			const user = await this.userRepository.getOne(this._filter);
			const result = await this._cryptRepository.compare(
				this._password.value,
				user?.toPrimitives().password!
			);
			return result;
		} catch (error) {
			return false;
		}
	}
}

export { UserLogin };
