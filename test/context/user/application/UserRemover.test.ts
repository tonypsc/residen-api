import {
	UserRemover,
	UserCreator,
} from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';
import { User } from '../../../../src/contexts/user/domain';
import { BcryptRepository } from '../../../../src/contexts/shared/infrastructure';

const userRepository = new MongoUserRepository();
const cryptRepository = new BcryptRepository();

describe('constructor', () => {
	test('Should throw Invalid string value for empty id', () => {
		try {
			const userRemover = new UserRemover(userRepository, '');
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidArgumentError);
			if (err instanceof InvalidArgumentError) {
				expect(err.message).toBe('Invalid string value');
			}
		}
	});
});

describe('invoke', () => {
	test('Should return false for unexisting id', async () => {
		const userRemover = new UserRemover(userRepository, 'someunexistingid');
		const result = await userRemover.invoke();
		expect(result).toBe(false);
	});

	test('Should return true for existing id', async () => {
		// Create a new user to ensure it exists for deleting
		const newUser = User.fromPrimitives(
			'',
			'to delete',
			'todelte@gmail.com',
			'somePassword.123'
		);
		const userCreator = new UserCreator(
			userRepository,
			newUser,
			cryptRepository
		);
		const createdUser = await userCreator.invoke();
		const createdUserId = createdUser?.toPrimitives()._id;

		// Delete created user
		const userRemover = new UserRemover(userRepository, createdUserId!);
		const result = await userRemover.invoke();
		expect(result).toBe(true);
	});
});
