import Express from 'express';
import { JwtAuthorization } from '../middleware/JwtAuthorization';
import { Captcha } from '../middleware/Captcha';

import {
	UserPostController,
	UserGetByIdController,
	UserLoginController,
	UserGenerateRecoverLinkController,
	UserVerifyRecoverLinkController,
	UserVerifyEmailExistsController,
	UserRecoverPasswordController,
	UserRegisterController,
} from '../controllers';

const userRouter = Express.Router();
const userPostController = new UserPostController();
const userGetByIdController = new UserGetByIdController();
const userLoginController = new UserLoginController();
const userGenerateRecoverLinkController =
	new UserGenerateRecoverLinkController();
const userVerifyRecoverLinkController = new UserVerifyRecoverLinkController();
const userVerifyEmailExistsController = new UserVerifyEmailExistsController();
const userRecoverPasswordController = new UserRecoverPasswordController();
const userRegisterController = new UserRegisterController();

// Unsecured
userRouter.post('/login', Captcha.verify, userLoginController.run);
userRouter.post(
	'/recover',
	Captcha.verify,
	userGenerateRecoverLinkController.run
);
userRouter.post(
	'/checkrecoverlink',
	Captcha.verify,
	userVerifyRecoverLinkController.run
);
userRouter.post(
	'/emailexists',
	Captcha.verify,
	userVerifyEmailExistsController.run
);
userRouter.post(
	'/confirmrecover',
	Captcha.verify,
	userRecoverPasswordController.run
);
userRouter.post('/register', Captcha.verify, userRegisterController.run);

// Secured
userRouter.post('/', userPostController.run);
userRouter.get('/', userGetByIdController.run);

export { userRouter };
