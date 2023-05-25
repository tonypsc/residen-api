import {
	UserConfirmRegistration,
	UserRegister,
} from '../../../../src/contexts/user/application';
import { JwtRepository } from '../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import {
	BcryptRepository,
	NodeMailerRepository,
} from '../../../../src/contexts/shared/infrastructure';
import { config } from '../../../../src/config';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import {
	NotFoundException,
	UuidValue,
} from '../../../../src/contexts/shared/domain';
import { ValidationException } from '../../../../src/contexts/shared/domain/exceptions/ValidationException';
import { User } from '../../../../src/contexts/user/domain';
import { UserPosibleStatus } from '../../../../src/contexts/user/domain/UserStatus';

const jwtRepository = new JwtRepository(config.jwtSecret);
const userRepository = new MongoUserRepository();
const bcryptRepository = new BcryptRepository();
const mailRepository = new NodeMailerRepository(
	config.sendMails,
	config.mailHost,
	parseInt(config.mailPort),
	config.mailUser,
	config.mailPassword
);

describe('invoke', () => {
	test('should throw on empty recover link', async () => {
		try {
			const userConfirmRegistration = new UserConfirmRegistration(
				userRepository,
				jwtRepository,
				''
			);
			await userConfirmRegistration.invoke();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});

	test('should throw on wrong recover link', async () => {
		try {
			const userConfirmRegistration = new UserConfirmRegistration(
				userRepository,
				jwtRepository,
				'wronglink'
			);
			await userConfirmRegistration.invoke();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});

	test('should throw on expired recover link', async () => {
		try {
			const userConfirmRegistration = new UserConfirmRegistration(
				userRepository,
				jwtRepository,
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJwYXlsb2FkdG9leHBpcmUiLCJpYXQiOjE2ODMyMTkxNjIsImV4cCI6MTY4MzIxOTE2M30.0EcMUrjkxAo8RFdpyzRrMOXSf2MiIYOQw-DBaa8tkz0'
			);
			await userConfirmRegistration.invoke();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});

	test('should throw (No user found) on good recover link for no user', async () => {
		try {
			const generatedToken = jwtRepository.generate('somepayload');
			const userConfirmRegistration = new UserConfirmRegistration(
				userRepository,
				jwtRepository,
				generatedToken
			);
			await userConfirmRegistration.invoke();
		} catch (error) {
			expect(error).toBeInstanceOf(NotFoundException);
			if (error instanceof NotFoundException) {
				expect(error.message).toBe('No user found');
			}
		}
	});

	test('should throw (Wrong user status) with a link for a user with state different from unconfirmed', async () => {
		try {
			const generatedToken = jwtRepository.generate(
				'1c388a3e-da4f-4145-a938-b4f9a80107b2'
			);
			const userConfirmRegistration = new UserConfirmRegistration(
				userRepository,
				jwtRepository,
				generatedToken
			);
			const user = await userConfirmRegistration.invoke();
		} catch (error) {
			expect(error).toBeInstanceOf(ValidationException);
			if (error instanceof ValidationException) {
				expect(error.message).toBe('Wrong user status');
			}
		}
	});

	test('should return true for a correct link', async () => {
		const generatedName = new UuidValue('').value;
		const newUser = User.fromPrimitives(
			'',
			generatedName,
			generatedName + '@residen.com',
			'123456'
		);

		const userRegister = new UserRegister(
			userRepository,
			bcryptRepository,
			jwtRepository,
			mailRepository,
			newUser,
			'some url'
		);

		const unconfirmedUser = await userRegister.invoke();
		const unconfirmedUserId = unconfirmedUser.toPrimitives()._id;

		const generatedToken = jwtRepository.generate(unconfirmedUserId);

		const userConfirmRegistration = new UserConfirmRegistration(
			userRepository,
			jwtRepository,
			generatedToken
		);
		const user = await userConfirmRegistration.invoke();
		expect(user?.toClient().status).toBe(UserPosibleStatus.active);
	});
});
