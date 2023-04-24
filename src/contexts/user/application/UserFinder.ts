import { UserRepository, UserDto, User } from '../domain';
import { OrderTypes } from '../../shared/domain/criteria';

class UserFinder {
	userRepository: UserRepository;
	private _filter: Map<string, string>[] = new Array<Map<string, string>>();

	constructor(
		userRepository: UserRepository,
		name?: string,
		email?: string,
		status?: string
	) {
		this.userRepository = userRepository;
		if (name)
			this._filter.push(
				new Map([
					['field', 'name'],
					['operator', 'CONTAINS'],
					['value', name],
				])
			);
		if (email)
			this._filter.push(
				new Map([
					['field', 'email'],
					['operator', '='],
					['value', email],
				])
			);
		if (status)
			this._filter.push(
				new Map([
					['field', 'status'],
					['operator', '='],
					['value', status],
				])
			);
	}

	async invoke() {
		let result: User[] = [];
		console.log(this._filter);
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
