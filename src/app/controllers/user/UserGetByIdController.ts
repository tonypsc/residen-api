import { Request, Response } from 'express';

import { MongoUserRepository } from '../../../contexts/user/infrastructure/persistance/MongoUserRepository';
import { UserGetById } from '../../../contexts/user/application';

class UserGetByIdController {
	async run(req: Request, res: Response) {
		try {
			const { id } = req.query;
			const mongoUserRepository = new MongoUserRepository();
			const userGetById = new UserGetById(mongoUserRepository, id as string);
			const user = await userGetById.invoke();
			res.json({ status: 'success', data: user });
		} catch (error) {
			res.status(400).json({
				status: 'error',
				message: error instanceof Error ? error.message : JSON.stringify(error),
			});
		}
	}
}

export { UserGetByIdController };
