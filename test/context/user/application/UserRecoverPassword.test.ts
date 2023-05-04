import { UserRecoverPassword } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { BcryptRepository } from '../../../../src/contexts/shared/infrastructure';
import { JwtRepository } from '../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { config } from '../../../../src/config';
import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';

const userRepository = new MongoUserRepository();
const bcryptRepository = new BcryptRepository();
const jwtRepository = new JwtRepository(config.jwtSecret);

describe('constructor', () => {
	test('should throw for empty password', () => {
		try {
			const userRecover = new UserRecoverPassword(
				userRepository,
				jwtRepository,
				bcryptRepository,
				'',
				'algo',
				'',
				true
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
		}
	});

	test('should throw for weak password', () => {
		try {
			const userRecover = new UserRecoverPassword(
				userRepository,
				jwtRepository,
				bcryptRepository,
				'weak',
				'algo',
				'',
				true
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
		}
	});

	test('should throw different pass and confirmation', () => {
		try {
			const userRecover = new UserRecoverPassword(
				userRepository,
				jwtRepository,
				bcryptRepository,
				'somePassword123',
				'anotherpassword',
				'',
				true
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
		}
	});

	test('should throw for empty recover link', () => {
		try {
			const userRecover = new UserRecoverPassword(
				userRepository,
				jwtRepository,
				bcryptRepository,
				'somePassword123',
				'somePassword123',
				'',
				true
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
		}
	});
});
