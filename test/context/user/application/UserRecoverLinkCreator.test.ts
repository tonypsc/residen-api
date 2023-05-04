import { config } from '../../../../src/config';

import { JwtRepository } from '../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';
import { NodeMailerRepository } from '../../../../src/contexts/shared/infrastructure';

import { UserRecoverLinkCreator } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';

const mongoUserRepository = new MongoUserRepository();
const jwtRepository = new JwtRepository(config.jwtSecret);
const mailRepository = new NodeMailerRepository(
	config.sendMails,
	config.mailHost,
	parseInt(config.mailPort),
	config.mailUser,
	config.mailPassword
);

describe('Invoke', () => {
	test('should throw (Email is required) for empty email', async () => {
		try {
			const userRecoverLinkCreator = new UserRecoverLinkCreator(
				mongoUserRepository,
				mailRepository,
				jwtRepository,
				'',
				config.recoverLinkExpiration
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
			const userRecoverLinkCreator = new UserRecoverLinkCreator(
				mongoUserRepository,
				mailRepository,
				jwtRepository,
				'somebademail',
				config.recoverLinkExpiration
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Invalid email address');
			}
		}
	});

	test('should throw (No user found) for unexisting email', async () => {
		try {
			const userRecoverLinkCreator = new UserRecoverLinkCreator(
				mongoUserRepository,
				mailRepository,
				jwtRepository,
				'unexisting@email.com',
				config.recoverLinkExpiration
			);
			await userRecoverLinkCreator.invoke();
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
			if (error instanceof Error) {
				expect(error.message).toBe('No user found');
			}
		}
	});

	test('should return user with link and date for existing email', async () => {
		const userRecoverLinkCreator = new UserRecoverLinkCreator(
			mongoUserRepository,
			mailRepository,
			jwtRepository,
			'tony402@gmail.com',
			config.recoverLinkExpiration
		);
		const user = await userRecoverLinkCreator.invoke();
		expect(user?.recoverLink).toBeDefined();
		expect(user?.recoverLinkDate).toBeDefined();
	});

	// test('should return user with link for ok email', async () => {
	// 	try {
	// 		const userRecoverLinkCreator = new UserRecoverLinkCreator(
	// 			mongoUserRepository,
	// 			mailRepository,
	// 			bcryptRepository,
	// 			'some@okemail.com'
	// 		);

	// 	} catch (error) {
	// 		expect(error).toBeInstanceOf(InvalidArgumentError);
	// 		if (error instanceof InvalidArgumentError) {
	// 			expect(error.message).toBe('Invalid email address');
	// 		}
	// 	}
	// });
});
