import { UserExistingEmailVerifier } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';

const userRepo = new MongoUserRepository();

describe('invoke', () => {
	test('should return true for existing email', async () => {
		const userEmailVerifier = new UserExistingEmailVerifier(
			userRepo,
			'test-email@residen.com'
		);

		const result = await userEmailVerifier.invoke();
		expect(result).toBe(true);
	});

	test('should return false for non existing email', async () => {
		const userEmailVerifier = new UserExistingEmailVerifier(
			userRepo,
			'nonexisting@email.com'
		);

		const result = await userEmailVerifier.invoke();
		expect(result).toBe(false);
	});
});
