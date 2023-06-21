import { FilterValueType, OrderTypes } from '../../shared/domain/criteria';
import { Condo } from './Condo';

interface CondoRepository {
	save(condo: Condo): Promise<string>;
	get(
		filtersMap: Record<string, FilterValueType>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	): Promise<Condo[]>;
	getOne(
		filtersMap: Record<string, FilterValueType>[],
		throwError?: boolean
	): Promise<Condo>;
	delete(condoId: string): Promise<boolean>;
}

export { CondoRepository };
