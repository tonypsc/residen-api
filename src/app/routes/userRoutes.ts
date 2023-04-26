import Express from 'express';
import { JwtAuthorization } from '../middleware/JwtAuthorization';

import {
	UserPostController,
	UserGetByIdController,
	UserLoginController,
} from '../controllers';

const userRouter = Express.Router();
const userPostController = new UserPostController();
const userGetByIdController = new UserGetByIdController();
const userLoginController = new UserLoginController();

userRouter.post('/login', userLoginController.run);
userRouter.post('/', userPostController.run);
userRouter.get('/', userGetByIdController.run);

export { userRouter };
