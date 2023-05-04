import { ConfigType } from '../types';
import { defaults } from '../defaults';

const environment: ConfigType = {
	dbHostName: 'mongodb://localhost/residen-test',
	forcePasswordStrength: true,
	recoverLinkExpiration:
		process.env.RECOVER_LINK_EXPIRATION ?? defaults.recoverLinkExpiration,
	confirmationLinkExpiration: process.env.CONFIRMATION_LINK_EXPIRATION,
	jwtSecret: process.env.JWT_SECRET ?? defaults.jwtSecret,
	captchaEnabled: false,
	mailHost: process.env.MAIL_HOST ?? 'localhost',
	mailUser: process.env.MAIL_USER ?? 'admin',
	mailPassword: process.env.MAIL_PWD ?? '',
	mailPort: process.env.MAIL_PORT ?? '25',
	sendMails: false,
};

export { environment };
