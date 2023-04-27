import { Request, Response, NextFunction } from 'express';

import { config } from '../../config';
import { AuthorizationException } from '../../contexts/shared/domain';

class Captcha {
	public static async verify(req: Request, res: Response, next: NextFunction) {
		const captcha = req.body['g-recaptcha-response'];
		const remoteIp = req.socket.remoteAddress?.split(':').slice(-1)[0];

		// skipping captcha for testing or development
		if (!config.captchaEnabled) return true;
		if (!captcha) throw new AuthorizationException('captcha empty');

		const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${config.captchaSecret}&response=${captcha}&remoteip=${remoteIp}`;

		try {
			const fetchRes = await fetch(verifyUrl);
			const data = await fetchRes.json();

			if (!data || !data.success) {
				res.status(400).send({ status: 'error', message: 'Captcha failed' });
			}

			next();
		} catch (err) {
			res.status(400).send({ status: 'error', message: 'Captcha failed' });
		}
	}
}

export { Captcha };
