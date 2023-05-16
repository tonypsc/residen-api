import { Filter, FilterValueType } from '../../shared/domain/criteria';
import { UserRepository } from '../domain';
import { UserEmail } from '../domain/UserEmail';

class UserExistingEmailVerifier {
	private _userRepository: UserRepository;
	private _email: UserEmail;

	constructor(userRepository: UserRepository, email: string) {
		this._userRepository = userRepository;
		this._email = new UserEmail(email);
	}

	public async invoke() {
		const filter: Record<string, FilterValueType> = {
			field: 'email',
			operator: '=',
			value: this._email.value,
		};

		const user = await this._userRepository.getOne([filter], false);
		return user !== null;
	}
}

export { UserExistingEmailVerifier };
