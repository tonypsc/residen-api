import { Request, Response } from 'express';

import { UserCreator } from '../../../contexts/user/application';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { User } from '../../../contexts/user/domain/User';
import { BcryptRepository } from '../../../contexts/shared/infrastructure/crypt/BcryptRepository';

class UserPostController {
	async run(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body;
			const user = User.fromPrimitives('', name, email, password);
			const mongoUserRepository = new MongoUserRepository();
			const bcryptRepository = new BcryptRepository();
			const userCreator = new UserCreator(
				mongoUserRepository,
				user,
				bcryptRepository
			);
			await userCreator.invoke();

			res.json({
				status: 'ok',
				data: user.toClient(),
			});
		} catch (error) {
			res.status(400).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserPostController };
