import { MongoClient, Collection } from 'mongodb';

import { config } from '../../../../config';
import { AggregateRoot } from '../../domain/AggregateRoot';
import { Criteria } from '../../domain/criteria/Criteria';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';

export abstract class MongoRepository<T extends AggregateRoot> {
	private _client: MongoClient;
	private _criteriaConverter: MongoCriteriaConverter;

	constructor() {
		this._client = new MongoClient(config.dbHostName ?? 'localhost');
		this._criteriaConverter = new MongoCriteriaConverter();
	}

	protected abstract moduleName(): string;

	protected collection(): Collection {
		return this._client.db().collection(this.moduleName());
	}

	protected async find<D>(criteria?: Criteria): Promise<D[]> {
		await this._client.connect();
		const collection = this.collection();
		if (criteria) {
			const query = this._criteriaConverter.convert(criteria);
			return await collection
				.find<D>(query.filter)
				.sort(query.sort)
				.skip(query.skip)
				.limit(query.limit)
				.toArray();
		}
		return await collection.find<D>({}).toArray();
	}

	protected async findOne<D>(criteria: Criteria): Promise<D | null> {
		await this._client.connect();
		const collection = this.collection();
		const query = this._criteriaConverter.convert(criteria);

		return await collection.findOne<D>(query.filter);
	}

	protected async findById<D>(id: string): Promise<D | null> {
		await this._client.connect();
		const collection = this.collection();
		return await collection.findOne<D>({ _id: id });
	}

	protected async persist(id: string, aggregate: T): Promise<string> {
		await this._client.connect();
		const collection = this.collection();

		const result = await collection.updateOne(
			{ _id: id },
			{ $set: aggregate.toPrimitives() },
			{ upsert: true }
		);

		return result.upsertedId ? result.upsertedId.toString() : id;
	}
}
