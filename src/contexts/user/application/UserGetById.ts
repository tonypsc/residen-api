import { UserRepository } from '../domain';
import { InvalidArgumentError } from '../../shared/domain';

class UserGetById {
	private _userRepository: UserRepository;
	private _filter: Record<string, string>;

	constructor(userRepository: UserRepository, id: string) {
		this._userRepository = userRepository;
		if (!id) throw new InvalidArgumentError('Id is required');
		this._filter = { field: '_id', operator: '=', value: id };
	}

	async invoke() {
		return this._userRepository.getOne([this._filter]);
	}
}

export { UserGetById };
