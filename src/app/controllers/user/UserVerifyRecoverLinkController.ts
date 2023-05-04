import { Request, Response } from 'express';

import { UserVerifyRecoverLink } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { JwtRepository } from '../../../contexts/shared/infrastructure/jsonWebTokens/JwtRepository';

import { config } from '../../../config';

class UserVerifyRecoverLinkController {
	async run(req: Request, res: Response) {
		try {
			const { link } = req.body;
			const mongoUserRepository = new MongoUserRepository();
			const jwtRepository = new JwtRepository(config.jwtSecret!);

			const userVerifyRecoverLink = new UserVerifyRecoverLink(
				mongoUserRepository,
				jwtRepository,
				link
			);

			await userVerifyRecoverLink.invoke();

			res.json({
				status: 'ok',
			});
		} catch (error) {
			res.status(401).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserVerifyRecoverLinkController };
