import { UserCreator } from '../../../../src/contexts/user/application';
import { User } from '../../../../src/contexts/user/domain';
import { BcryptRepository } from '../../../../src/contexts/shared/infrastructure/crypt/BcryptRepository';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { UuidValue } from '../../../../src/contexts/shared/domain';

const generatedName = new UuidValue('').value;
const user = User.fromPrimitives(
	'',
	generatedName,
	generatedName + '@bookito.com',
	'123456'
);

const bcryptRepository = new BcryptRepository();
const mongoUserRepository = new MongoUserRepository();

describe('Invoke', () => {
	test('should return a user with name equal to generated name', async () => {
		const userCreator = new UserCreator(
			mongoUserRepository,
			user,
			bcryptRepository
		);
		const result = await userCreator.invoke();
		expect(result?.toPrimitives().name).toBe(generatedName);
	});
});
