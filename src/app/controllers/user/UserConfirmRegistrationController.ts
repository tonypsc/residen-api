import { Request, Response } from 'express';

import { UserConfirmRegistration } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { JwtRepository } from '../../../contexts/shared/infrastructure/jsonWebTokens/JwtRepository';

import { config } from '../../../config';

class UserConfirmRegistrationController {
	async run(req: Request, res: Response) {
		try {
			const { link } = req.body;
			const mongoUserRepository = new MongoUserRepository();
			const jwtRepository = new JwtRepository(config.jwtSecret!);

			const userVerifyRecoverLink = new UserConfirmRegistration(
				mongoUserRepository,
				jwtRepository,
				link
			);

			const result = await userVerifyRecoverLink.invoke();

			res.json({
				status: 'ok',
				data: result !== null,
			});
		} catch (error) {
			res.status(401).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserConfirmRegistrationController };
