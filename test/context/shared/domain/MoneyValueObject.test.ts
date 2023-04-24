import { MoneyValueObject } from '../../../../src/contexts/shared/domain';

class MoneyValue extends MoneyValueObject {}

describe('constructor', () => {
	test('should return 2 decimal places rounded', () => {
		const mValue = new MoneyValue(5.369);
		expect(mValue.valueOf()).toBe(5.37);
	});

	test('should return 0.00 for empty inputs', () => {
		const mValue = new MoneyValue();
		expect(mValue.valueOf()).toBe(0.0);
	});
});
