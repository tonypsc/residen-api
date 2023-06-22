import { NotFoundException } from '../../../shared/domain';
import {
	Criteria,
	FilterValueType,
	Filters,
	Order,
	OrderBy,
	OrderType,
	OrderTypes,
} from '../../../shared/domain/criteria';
import { MongoRepository } from '../../../shared/infrastructure/persistance/MongoRepository';
import { Condo } from '../../domain';
import { CondoDto } from '../../domain/CondoDto';
import { CondoRepository } from '../../domain/CondoRepository';

class MongoCondoRepository
	extends MongoRepository<Condo>
	implements CondoRepository
{
	async save(condo: Condo): Promise<string> {
		return await this.persist(condo.toPrimitives()._id, condo);
	}

	async get(
		filtersMap: Record<string, FilterValueType>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	) {
		const filters = Filters.fromValues(filtersMap);
		const results = await this.find<CondoDto>(
			new Criteria(
				filters,
				new Order(new OrderBy(orderBy), new OrderType(orderType)),
				limit,
				skip
			)
		);
		return results.map((dto) => Condo.fromPrimitives(dto));
	}

	async getOne(
		filtersMap: Record<string, FilterValueType>[],
		throwError: boolean = true
	) {
		const filters = Filters.fromValues(filtersMap);
		const result = await this.findOne<CondoDto>(
			new Criteria(filters, Order.none())
		);
		if (!result && throwError) throw new NotFoundException('condo');
		return result ? Condo.fromPrimitives(result) : null;
	}

	async getById(id: string) {
		const result = await this.findById<CondoDto>(id);
		if (!result) throw new NotFoundException('user');
		return Condo.fromPrimitives(result);
	}

	async delete(id: string) {
		const result = await this.removeById(id);
		return result?.deletedCount === 1;
	}

	moduleName(): string {
		return 'condo';
	}
}

export { MongoCondoRepository };
