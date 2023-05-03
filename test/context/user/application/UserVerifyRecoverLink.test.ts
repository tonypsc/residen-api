import { config } from '../../../../src/config';

import { BcryptRepository } from '../../../../src/contexts/shared/infrastructure/crypt/BcryptRepository';
import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';
import { NodeMailerRepository } from '../../../../src/contexts/shared/infrastructure';

import { UserRecoverLinkCreator } from '../../../../src/contexts/user/application';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';

const mongoUserRepository = new MongoUserRepository();
const bcryptRepository = new BcryptRepository();
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
				bcryptRepository,
				''
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Email is required');
			}
		}
	});
});
