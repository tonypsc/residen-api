import { InvalidArgumentError } from '../exceptions/InvalidArgumentError';
import { FilterField } from './FilterField';
import { FilterOperator } from './FilterOperator';
import { FilterValue, FilterValueType } from './FilterValue';

export class Filter {
	readonly field: FilterField;
	readonly operator: FilterOperator;
	readonly value: FilterValue;

	constructor(
		field: FilterField,
		operator: FilterOperator,
		value: FilterValue
	) {
		this.field = field;
		this.operator = operator;
		this.value = value;
	}

	static fromValues(values: Record<string, FilterValueType>): Filter {
		const field = values['field'];
		const operator = values['operator'];
		const value = values['value'];

		if (!field || !operator || !value) {
			throw new InvalidArgumentError(`The filter is invalid`);
		}

		return new Filter(
			new FilterField(field.toString()),
			FilterOperator.fromValue(operator.toString()),
			new FilterValue(value)
		);
	}
}
