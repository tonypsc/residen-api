import {
	AggregateRoot,
	GenericRepository,
	NotFoundException,
} from '../../domain';
import { MongoRepository } from './MongoRepository';

import {
	Criteria,
	Filters,
	Order,
	OrderBy,
	OrderType,
	OrderTypes,
} from '../../../shared/domain/criteria';

export class MongoGenericRepository<T extends AggregateRoot>
	extends MongoRepository<T>
	implements GenericRepository<T>
{
	private _modulename: string;

	constructor(modulename: string) {
		super();
		this._modulename = modulename;
	}

	async save(aggregate: T): Promise<void> {
		await this.persist(aggregate.toPrimitives()._id, aggregate);
	}

	async getAll<Dto>(): Promise<Dto[]> {
		return await this.find<Dto>();
	}

	async get<Dto>(
		filtersMap: Map<string, string>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	): Promise<Dto[]> {
		const filters = Filters.fromValues(filtersMap);
		return await this.find<Dto>(
			new Criteria(
				filters,
				new Order(new OrderBy(orderBy), new OrderType(orderType)),
				limit,
				skip
			)
		);
	}

	async getOne<Dto>(filtersMap: Map<string, string>[]): Promise<Dto> {
		const filters = Filters.fromValues(filtersMap);
		const result = await this.findOne<Dto>(new Criteria(filters, Order.none()));
		if (!result) throw new NotFoundException();
		return result;
	}

	async getById<Dto>(id: string): Promise<Dto> {
		const result = await this.findById<Dto>(id);
		if (!result) throw new NotFoundException();
		return result;
	}

	async delete(id: string) {}

	moduleName(): string {
		return this._modulename;
	}
}
