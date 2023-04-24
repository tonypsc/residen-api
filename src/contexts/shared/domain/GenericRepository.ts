import { OrderTypes } from '../../shared/domain/criteria';

export interface GenericRepository<T> {
	save(concept: T): Promise<void>;
	getAll(): Promise<T[]>;
	get(
		filtersMap: Map<string, string>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	): Promise<T[]>;
	getOne(filtersMap: Map<string, string>[]): Promise<T>;
	getById(id: string): Promise<T>;
}
