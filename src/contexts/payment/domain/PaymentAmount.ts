import { InvalidArgumentError, MoneyValueObject } from '../../shared/domain';

class PaymentAmount extends MoneyValueObject {
	constructor(value: number) {
		super(value);
		this.checkGreaterThanZero(value);
	}

	checkGreaterThanZero(value: number) {
		if (value <= 0) {
			throw new InvalidArgumentError('Amount should be greater than zero');
		}
	}
}

export { PaymentAmount };
