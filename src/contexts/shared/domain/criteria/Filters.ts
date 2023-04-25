import { Filter } from './Filter';
import { FilterValueType } from './FilterValue';

export class Filters {
	readonly filters: Filter[];

	constructor(filters: Filter[]) {
		this.filters = filters;
	}

	static fromValues(filters: Array<Record<string, FilterValueType>>): Filters {
		return new Filters(filters.map(Filter.fromValues));
	}

	static none(): Filters {
		return new Filters([]);
	}
}
