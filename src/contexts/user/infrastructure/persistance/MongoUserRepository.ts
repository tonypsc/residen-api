import {
	Criteria,
	Filters,
	Order,
	OrderBy,
	OrderType,
	OrderTypes,
	FilterValueType,
} from '../../../shared/domain/criteria';
import { NotFoundException } from '../../../shared/domain';
import { MongoRepository } from '../../../shared/infrastructure/persistance/MongoRepository';

import { UserRepository, UserDto, User } from '../../domain';

export class MongoUserRepository
	extends MongoRepository<User>
	implements UserRepository
{
	async save(user: User): Promise<string> {
		return await this.persist(user.toPrimitives()._id, user);
	}

	async getAll() {
		const results = await this.find<UserDto>();
		return results.map((dto) => User.fromDto(dto));
	}

	async get(
		filtersMap: Record<string, FilterValueType>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	) {
		const filters = Filters.fromValues(filtersMap);
		const results = await this.find<UserDto>(
			new Criteria(
				filters,
				new Order(new OrderBy(orderBy), new OrderType(orderType)),
				limit,
				skip
			)
		);
		return results.map((dto) => User.fromDto(dto));
	}

	async getOne(filtersMap: Record<string, FilterValueType>[]) {
		const filters = Filters.fromValues(filtersMap);
		const result = await this.findOne<UserDto>(
			new Criteria(filters, Order.none())
		);
		if (!result) throw new NotFoundException('user');
		return User.fromDto(result);
	}

	async getById(id: string) {
		const result = await this.findById<UserDto>(id);
		if (!result) throw new NotFoundException('user');
		return User.fromDto(result);
	}
	moduleName(): string {
		return 'user';
	}
}
