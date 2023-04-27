import { Request, Response } from 'express';

import { UserLogin } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { BcryptRepository } from '../../../contexts/shared/infrastructure/crypt/BcryptRepository';
import { JwtAuthorization } from '../../middleware/JwtAuthorization';

class UserGenerateRecoverLinkController {
	async run(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const mongoUserRepository = new MongoUserRepository();
			const bcryptRepository = new BcryptRepository();
			const userLogin = new UserLogin(
				mongoUserRepository,
				bcryptRepository,
				email,
				password
			);

			const user = await userLogin.invoke();

			res.json({
				status: 'ok',
				data: {
					user: user?.toClient(),
					token: JwtAuthorization.generateToken(user?.toClient()._id!),
				},
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
