import { Request, Response } from 'express';
import { UserExistingEmailVerifier } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';

class UserVerifyEmailExistsController {
	async run(req: Request, res: Response) {
		try {
			const { email } = req.body;

			const userRepository = new MongoUserRepository();
			const userExistingEmailVerifier = new UserExistingEmailVerifier(
				userRepository,
				email
			);

			const result = await userExistingEmailVerifier.invoke();
			res.json({ status: 'ok', data: result });
		} catch (error) {
			res.status(400).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserVerifyEmailExistsController };
