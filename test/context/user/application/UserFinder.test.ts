import { UserFinder } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { UserPosibleStatus } from '../../../../src/contexts/user/domain/UserStatus';

const mongoUserRepository = new MongoUserRepository();

describe('Invoke', () => {
	test('should return name (test-name) if we search this name', async () => {
		const userFinder = new UserFinder(mongoUserRepository, 'test-name');
		const result = await userFinder.invoke();
		expect(result?.[0]?.toPrimitives().email).toBe('test-email@residen.com');
	});

	test('should return name (testing name) for test-email@residen.com', async () => {
		const userFinder = new UserFinder(
			mongoUserRepository,
			undefined,
			'test-email@residen.com'
		);
		const result = await userFinder.invoke();
		expect(result?.[0].toPrimitives().name).toBe('test-name');
	});

	test('should return greater than 0 for inactive status', async () => {
		const userFinder = new UserFinder(
			mongoUserRepository,
			undefined,
			undefined,
			UserPosibleStatus.inactive
		);
		const result = await userFinder.invoke();
		expect(result?.length).toBeGreaterThan(0);
	});
});
