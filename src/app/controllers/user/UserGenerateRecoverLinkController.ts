import { Request, Response } from 'express';

import { UserRecoverLinkCreator } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { BcryptRepository } from '../../../contexts/shared/infrastructure';
import { NodeMailerRepository } from '../../../contexts/shared/infrastructure';

import { config } from '../../../config';

class UserGenerateRecoverLinkController {
	async run(req: Request, res: Response) {
		try {
			const { email } = req.body;
			const mongoUserRepository = new MongoUserRepository();
			const bcryptRepository = new BcryptRepository();
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
				bcryptRepository,
				email
			);

			await userRecoverLinkCreator.invoke();

			res.json({
				status: 'ok',
				data: {},
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
