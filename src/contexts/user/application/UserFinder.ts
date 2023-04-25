import { UserRepository, UserDto, User } from '../domain';
import { OrderTypes, FilterValueType } from '../../shared/domain/criteria';

class UserFinder {
	userRepository: UserRepository;
	private _filter: Array<Record<string, FilterValueType>> = [];

	constructor(
		userRepository: UserRepository,
		name?: string,
		email?: string,
		status?: number
	) {
		this.userRepository = userRepository;
		if (name)
			this._filter.push({ field: 'name', operator: 'CONTAINS', value: name });
		if (email)
			this._filter.push({ field: 'email', operator: '=', value: email });
		if (status)
			this._filter.push({ field: 'status', operator: '=', value: status });
	}

	async invoke() {
		let result: User[] = [];
		if (this._filter.length) {
			result = await this.userRepository.get(
				this._filter,
				'name',
				OrderTypes.ASC
			);
		} else {
			result = await this.userRepository.getAll();
		}

		return result;
	}
}

export { UserFinder };
