import { UserGetById } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';

const mongoUserRepository = new MongoUserRepository();

describe('Invoke', () => {
	test('should return name (testing name) for id=1c388a3e-da4f-4145-a938-b4f9a80107b2', async () => {
		const userGetById = new UserGetById(
			mongoUserRepository,
			'1c388a3e-da4f-4145-a938-b4f9a80107b2'
		);
		const result = await userGetById.invoke();
		expect(result?.toPrimitives().name).toBe('test-name');
	});
});
