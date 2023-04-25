import { OrderTypes } from '../../shared/domain/criteria';

export interface GenericRepository<T> {
	save(concept: T): Promise<void>;
	getAll(): Promise<T[]>;
	get(
		filtersMap: Record<string, string>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	): Promise<T[]>;
	getOne(filtersMap: Record<string, string>[]): Promise<T>;
	getById(id: string): Promise<T>;
}
