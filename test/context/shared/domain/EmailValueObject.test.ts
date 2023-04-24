import {
	EmailValueObject,
	InvalidArgumentError,
} from '../../../../src/contexts/shared/domain';

class EmailValue extends EmailValueObject {}

describe('constructor', () => {
	test('should throw Email is required for empty email', () => {
		try {
			const emailVal = new EmailValue('');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Email is required');
			}
		}
	});

	test('should throw Invalid email address non email string', () => {
		try {
			const emailVal = new EmailValue('1411');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Invalid email address');
			}
		}
	});
});
