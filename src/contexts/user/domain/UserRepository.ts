import { User } from './User';
import { OrderTypes } from '../../shared/domain/criteria';

export interface UserRepository {
	save(user: User): Promise<string>;
	getAll(): Promise<User[]>;
	get(
		filtersMap: Map<string, string>[],
		orderBy: string,
		orderType: OrderTypes,
		skip?: number,
		limit?: number
	): Promise<User[]>;
	getOne(filtersMap: Map<string, string>[]): Promise<User | null>;
	// delete(userId: number): Promise<void>;
}
