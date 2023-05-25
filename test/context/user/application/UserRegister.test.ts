import { UserRegister } from '../../../../src/contexts/user/application';
import { User } from '../../../../src/contexts/user/domain';
import { BcryptRepository } from '../../../../src/contexts/shared/infrastructure/crypt/BcryptRepository';
import { MongoUserRepository } from '../../../../src/contexts/user/infrastructure/persistance/MongoUserRepository';
import { UuidValue } from '../../../../src/contexts/shared/domain';
import { JwtRepository } from '../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { config } from '../../../../src/config';
import { NodeMailerRepository } from '../../../../src/contexts/shared/infrastructure';
import { UserPosibleStatus } from '../../../../src/contexts/user/domain/UserStatus';

const generatedName = new UuidValue('').value;
const user = User.fromPrimitives(
	'',
	generatedName,
	generatedName + '@residen.com',
	'123456'
);

const bcryptRepository = new BcryptRepository();
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
	test('should return a user with name equal to generated name', async () => {
		const userRegister = new UserRegister(
			mongoUserRepository,
			bcryptRepository,
			jwtRepository,
			mailRepository,
			user,
			'some url'
		);

		const result = await userRegister.invoke();
		expect(result?.toPrimitives().status).toBe(UserPosibleStatus.unconfirmed);
	});
});
