import { Request, Response } from 'express';

import { UserRecoverPassword } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { JwtRepository } from '../../../contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { BcryptRepository } from '../../../contexts/shared/infrastructure';
import { config } from '../../../config';

class UserRecoverPasswordController {
	async run(req: Request, res: Response) {
		try {
			const { password, confirm, recoverLink } = req.body;

			const userRepository = new MongoUserRepository();
			const jwtRepository = new JwtRepository(config.jwtSecret);
			const bcryptRepository = new BcryptRepository();

			const userRecoverPassword = new UserRecoverPassword(
				userRepository,
				jwtRepository,
				bcryptRepository,
				password,
				confirm,
				recoverLink,
				config.forcePasswordStrength ?? true
			);

			const result = await userRecoverPassword.invoke();
			res.json({ status: 'ok', data: result !== null });
		} catch (error) {
			res.status(400).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserRecoverPasswordController };
