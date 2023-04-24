import Express from 'express';
import { JwtAuthorization } from '../middleware/JwtAuthorization';

import { UserPostController, UserGetByIdController } from '../controllers';

const userRouter = Express.Router();
const userPostController = new UserPostController();
const userGetByIdController = new UserGetByIdController();

userRouter.post('/login', userPostController.run);
userRouter.post('/', userPostController.run);
userRouter.get('/', userGetByIdController.run);

export { userRouter };
