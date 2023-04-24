import { ValueObject } from './ValueObject';

abstract class MoneyValueObject extends ValueObject<number> {
	constructor(value?: number) {
		const formatedValue = value ? parseFloat(Math.abs(value).toFixed(2)) : 0;
		super(formatedValue);
	}

	public toMoneyString() {
		return this.value.toFixed(2);
	}
}

export { MoneyValueObject };
