import { Request, Response } from 'express';

import { UserRecoverLinkCreator } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { JwtRepository } from '../../../contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { NodeMailerRepository } from '../../../contexts/shared/infrastructure';

import { config } from '../../../config';

class UserGenerateRecoverLinkController {
	async run(req: Request, res: Response) {
		try {
			const { email } = req.body;
			const mongoUserRepository = new MongoUserRepository();
			const jwtRepository = new JwtRepository(config.jwtSecret!);
			const mailRepository = new NodeMailerRepository(
				config.sendMails,
				config.mailHost,
				parseInt(config.mailPort),
				config.mailUser,
				config.mailPassword
			);

			const userRecoverLinkCreator = new UserRecoverLinkCreator(
				mongoUserRepository,
				mailRepository,
				jwtRepository,
				email,
				config.recoverLinkExpiration
			);

			await userRecoverLinkCreator.invoke();

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

export { UserGenerateRecoverLinkController };
