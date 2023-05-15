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

describe('invoke', () => {
	test('should change pass', async () => {
		const generatedToken = jwtRepository.generate(
			'1c388a3e-da4f-4145-a938-b4f9a80107b2'
		);

		const newPassword = 'Okpassword.123';

		const userRecoverPassword = new UserRecoverPassword(
			userRepository,
			jwtRepository,
			bcryptRepository,
			newPassword,
			newPassword,
			generatedToken,
			true
		);

		const user = await userRecoverPassword.invoke();
		const result = await bcryptRepository.compare(
			newPassword,
			user?.toPrimitives().password ?? ''
		);

		expect(result).toBe(true);
	});
});
