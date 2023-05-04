import { ConfigType } from '../types';
import { defaults } from '../defaults';

const environment: ConfigType = {
	dbHostName: process.env.DB_HOST,
	forcePasswordStrength: false,
	recoverLinkExpiration:
		process.env.RECOVER_LINK_EXPIRATION ?? defaults.recoverLinkExpiration,
	confirmationLinkExpiration: process.env.CONFIRMATION_LINK_EXPIRATION,
	captchaEnabled: false,
	captchaSecret: process.env.CAPTCHA_SECRET,
	jwtSecret: process.env.JWT_SECRET ?? defaults.jwtSecret,
	googleApiKey: process.env.GOOGLE_API_KEY,
	mailHost: process.env.MAIL_HOST ?? 'localhost',
	mailUser: process.env.MAIL_USER ?? 'admin',
	mailPassword: process.env.MAIL_PWD ?? '',
	mailPort: process.env.MAIL_PORT ?? '25',
	sendMails: false,
};

export { environment };
