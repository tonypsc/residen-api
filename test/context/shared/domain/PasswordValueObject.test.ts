import {
	InvalidArgumentError,
	PasswordValueObject,
} from '../../../../src/contexts/shared/domain';

class PasswordValue extends PasswordValueObject {}

describe('constructor', () => {
	test('should return (Password is required) for empty password', () => {
		try {
			const pValue = new PasswordValue('');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Password is required');
			}
		}
	});

	test('should return (Password too weak) for weak password', () => {
		try {
			const pValue = new PasswordValue('weak');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Password too weak');
			}
		}
	});
});
