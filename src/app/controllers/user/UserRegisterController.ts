import { Request, Response } from 'express';

import { UserRegister } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { JwtRepository } from '../../../contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import {
	BcryptRepository,
	NodeMailerRepository,
} from '../../../contexts/shared/infrastructure';
import { config } from '../../../config';
import { User } from '../../../contexts/user/domain';

class UserRegisterController {
	async run(req: Request, res: Response) {
		try {
			const { name, email, password, registerUrl } = req.body;

			const userRepository = new MongoUserRepository();
			const jwtRepository = new JwtRepository(config.jwtSecret);
			const bcryptRepository = new BcryptRepository();
			const mailRepository = new NodeMailerRepository(
				config.sendMails,
				config.mailHost,
				parseInt(config.mailPort),
				config.mailUser,
				config.mailPassword
			);

			const user = User.fromPrimitives('', name, email, password);

			const userRegister = new UserRegister(
				userRepository,
				bcryptRepository,
				jwtRepository,
				mailRepository,
				user,
				registerUrl
			);

			const result = await userRegister.invoke();

			res.json({ status: 'ok', data: result.toClient() });
		} catch (error) {
			res.status(400).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserRegisterController };
