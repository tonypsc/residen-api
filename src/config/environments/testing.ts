import { ConfigType } from '../types';

const environment: ConfigType = {
	dbHostName: 'mongodb://localhost/residen-test',
	forcePasswordStrength: true,
	recoverLinkExpiration: process.env.RECOVER_LINK_EXPIRATION,
	confirmationLinkExpiration: process.env.CONFIRMATION_LINK_EXPIRATION,
	captchaEnabled: false,
	mailHost: process.env.MAIL_HOST ?? 'localhost',
	mailUser: process.env.MAIL_USER ?? 'admin',
	mailPassword: process.env.MAIL_PASSWORD ?? '',
	mailPort: process.env.MAIL_PORT ?? '25',
	sendMails: false,
};

export { environment };
