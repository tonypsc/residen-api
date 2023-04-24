import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class JwtAuthorization {
	static generateToken(payload: string) {
		const token = jwt.sign(payload, process.env.SECRET!, {
			expiresIn: '180000s',
		});
		return token;
	}

	static authenticateToken(req: Request, res: Response, next: NextFunction) {
		const excludedPaths = [
			'/login',
			'/recoverpwd',
			'/setpwd',
			'/uploads',
			'/register',
			'/confirmregister',
			'/resendconfirmation',
			'/newmessage',
			'/userexists',
			'/karaoke/search',
			'/karaoke/getone',
		];

		for (const path of excludedPaths) {
			if (req.originalUrl.includes(path)) {
				next();
				return;
			}
		}

		const authHeader = req.header('authorization');
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, process.env.SECRET!, (err, data) => {
			if (err) {
				console.log(err);
				res.status(403).json({ status: 'error', message: 'Forbiden' });
			}
			req.params.user = data as string;
			next();
		});
	}
}

export { JwtAuthorization };
