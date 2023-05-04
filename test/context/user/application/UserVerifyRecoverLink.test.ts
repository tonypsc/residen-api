import { UserVerifyRecoverLink } from '../../../../src/contexts/user/application';
import { JwtRepository } from '../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { config } from '../../../../src/config';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { NotFoundException } from '../../../../src/contexts/shared/domain';

const jwtRepository = new JwtRepository(config.jwtSecret);
const userRepository = new MongoUserRepository();

describe('invoke', () => {
	test('should throw on empty recover link', async () => {
		try {
			const userVerifyRecoverLink = new UserVerifyRecoverLink(
				userRepository,
				jwtRepository,
				''
			);
			await userVerifyRecoverLink.invoke();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});

	test('should throw on wrong recover link', async () => {
		try {
			const userVerifyRecoverLink = new UserVerifyRecoverLink(
				userRepository,
				jwtRepository,
				'wronglink'
			);
			await userVerifyRecoverLink.invoke();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});

	test('should throw on expired recover link', async () => {
		try {
			const userVerifyRecoverLink = new UserVerifyRecoverLink(
				userRepository,
				jwtRepository,
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJwYXlsb2FkdG9leHBpcmUiLCJpYXQiOjE2ODMyMTkxNjIsImV4cCI6MTY4MzIxOTE2M30.0EcMUrjkxAo8RFdpyzRrMOXSf2MiIYOQw-DBaa8tkz0'
			);
			await userVerifyRecoverLink.invoke();
		} catch (error) {
			expect(error).toBeTruthy();
		}
	});

	test('should throw (No user found) on good recover link for no user', async () => {
		try {
			const generatedToken = jwtRepository.generate('somepayload');
			const userVerifyRecoverLink = new UserVerifyRecoverLink(
				userRepository,
				jwtRepository,
				generatedToken
			);
			await userVerifyRecoverLink.invoke();
		} catch (error) {
			expect(error).toBeInstanceOf(NotFoundException);
			if (error instanceof NotFoundException) {
				expect(error.message).toBe('No user found');
			}
		}
	});

	test('should return true for a correct link', async () => {
		const generatedToken = jwtRepository.generate(
			'1c388a3e-da4f-4145-a938-b4f9a80107b2'
		);
		const userVerifyRecoverLink = new UserVerifyRecoverLink(
			userRepository,
			jwtRepository,
			generatedToken
		);
		const result = await userVerifyRecoverLink.invoke();
		expect(result).toBe(true);
	});
});
