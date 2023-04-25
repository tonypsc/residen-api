import { ValueObject } from '../ValueObject';

export type FilterValueType = boolean | string | number;

export class FilterValue extends ValueObject<FilterValueType> {
	constructor(value: FilterValueType) {
		super(value);
	}
}
