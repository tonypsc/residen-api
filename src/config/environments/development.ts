import { ConfigType } from '../types';

const environment: ConfigType = {
	dbHostName: process.env.DB_HOST,
	forcePasswordStrength: false,
	recoverLinkExpiration: process.env.RECOVER_LINK_EXPIRATION,
	confirmationLinkExpiration: process.env.CONFIRMATION_LINK_EXPIRATION,
	captchaEnabled: false,
	captchaSecret: process.env.CAPTCHA_SECRET,
	googleApiKey: process.env.GOOGLE_API_KEY,
};

export { environment };
