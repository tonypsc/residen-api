import {
	InvalidArgumentError,
	NonEmptyStringValue,
} from '../../../../src/contexts/shared/domain';

describe('constructor', () => {
	test('should throw error on empty initialization value', () => {
		try {
			const nonEmpty = new NonEmptyStringValue('');
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidArgumentError);
		}
	});
});
