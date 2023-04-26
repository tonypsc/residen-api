import { Request, Response } from 'express';

import { UserLogin } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { BcryptRepository } from '../../../contexts/shared/infrastructure/crypt/BcryptRepository';

class UserLoginController {
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

			const result = await userLogin.invoke();

			res.json({
				status: 'ok',
				data: result,
			});
		} catch (error) {
			res.status(400).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserLoginController };
