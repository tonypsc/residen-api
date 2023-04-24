import { ConfigType } from '../types';

const environment: ConfigType = {
	dbHostName: process.env.DB_HOST,
	forcePasswordStrength: true,
	recoverLinkExpiration: process.env.RECOVER_LINK_EXPIRATION,
	confirmationLinkExpiration: process.env.CONFIRMATION_LINK_EXPIRATION,
};

export { environment };
