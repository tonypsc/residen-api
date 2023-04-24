import { BcryptRepository } from '../../../../../src/contexts/shared/infrastructure/crypt/BcryptRepository';

describe('BcryptRepository generateHash', () => {
	test('Should throw error on empty str', async () => {
		const bcryptRepo = new BcryptRepository();
		expect(() => bcryptRepo.generateHash('')).toThrow('Wrong input string');
	});

	test('should generate a 60 chars length string', async () => {
		const bcryptRepo = new BcryptRepository();
		expect(bcryptRepo.generateHash('123d').length).toBe(60);
	});
});
