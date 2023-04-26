import { UserLogin } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { BcryptRepository } from '../../../../src/contexts/shared/infrastructure/crypt/BcryptRepository';
import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';

const mongoUserRepository = new MongoUserRepository();
const bcryptRepository = new BcryptRepository();

describe('Invoke', () => {
	test('should throw (Email is required) for empty email', async () => {
		try {
			const userLogin = new UserLogin(
				mongoUserRepository,
				bcryptRepository,
				'',
				'somePwd'
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Email is required');
			}
		}
	});

	test('should throw (Invalid email address) for bad email', async () => {
		try {
			const userLogin = new UserLogin(
				mongoUserRepository,
				bcryptRepository,
				'someBadEmail',
				'somePwd'
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Invalid email address');
			}
		}
	});

	test('should throw (Password is required) for empty password', async () => {
		try {
			const userLogin = new UserLogin(
				mongoUserRepository,
				bcryptRepository,
				'some@okemail.com',
				''
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Password is required');
			}
		}
	});

	test('should return (false) for wrong credentials', async () => {
		const userLogin = new UserLogin(
			mongoUserRepository,
			bcryptRepository,
			'some@badcredential.com',
			'somebadpassword'
		);
		const result = await userLogin.invoke();
		expect(result).toBe(false);
	});
});
