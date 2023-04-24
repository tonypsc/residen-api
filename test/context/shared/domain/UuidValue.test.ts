import { UuidValue } from '../../../../src/contexts/shared/domain';

describe('constructor', () => {
	test('should generate new id for empty string', () => {
		const newUuid = new UuidValue('');
		expect(newUuid.valueOf().length).toBe(36);
	});

	test('should return 36 digits string', () => {
		expect(UuidValue.random().valueOf().length).toBe(36);
	});
});
