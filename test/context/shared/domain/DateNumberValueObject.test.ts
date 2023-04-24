import { DateNumberValueObject } from '../../../../src/contexts/shared/domain';

class DateValue extends DateNumberValueObject {}

describe('getDate', () => {
	test('should return date', () => {
		const dValue = new DateValue(1258);
		expect(dValue.getDate()).toBeInstanceOf(Date);
	});

	test('should return true on expired link', () => {
		let testDate = new Date();
		testDate.setDate(testDate.getDate() - 30);
		const linkDate = new DateValue(testDate.getTime()); // Current date, 30 days substracted
		expect(linkDate.isExpired(15)).toBe(true);
	});

	test('should return false on NON expired link', () => {
		let testDate = new Date();
		testDate.setDate(testDate.getDate() - 80);
		const linkDate = new DateValue(testDate.getTime()); // Current date, 80 days substracted
		expect(linkDate.isExpired(90)).toBe(false);
	});
});
