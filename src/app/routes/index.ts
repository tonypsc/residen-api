import express from 'express';
import { userRouter } from './userRoutes';
import { JwtAuthorization } from '../middleware/JwtAuthorization';

const router = express.Router();

router.use('/user', userRouter);

// private

export default router;
