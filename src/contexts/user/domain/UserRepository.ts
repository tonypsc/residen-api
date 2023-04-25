import { User } from './User';
import { OrderTypes, FilterValueType } from '../../shared/domain/criteria';

export interface UserRepository {
	save(user: User): Promise<string>;
	getAll(): Promise<User[]>;
	get(
		filtersMap: Record<string, FilterValueType>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	): Promise<User[]>;
	getOne(filtersMap: Record<string, string>[]): Promise<User | null>;
	// delete(userId: number): Promise<void>;
}
