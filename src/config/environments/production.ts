import { ConfigType } from '../types';

const environment: ConfigType = {
	dbHostName: process.env.DB_HOST,
	forcePasswordStrength: true,
	recoverLinkExpiration: process.env.RECOVER_LINK_EXPIRATION,
	confirmationLinkExpiration: process.env.CONFIRMATION_LINK_EXPIRATION,
	captchaEnabled: true,
	captchaSecret: process.env.CAPTCHA_SECRET,
	googleApiKey: process.env.GOOGLE_API_KEY,
	mailHost: process.env.MAIL_HOST,
	mailUser: process.env.MAIL_USER,
	mailPassword: process.env.MAIL_PASSWORD,
	mailPort: process.env.MAIL_PORT,
	sendMails: true,
};

export { environment };
