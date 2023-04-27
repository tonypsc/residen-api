export type ConfigType = {
	dbHostName?: string;
	forcePasswordStrength?: boolean;
	recoverLinkExpiration?: string;
	confirmationLinkExpiration?: string;
	captchaEnabled?: boolean;
	captchaSecret?: string;
	googleApiKey?: string;
	mailHost: string;
	mailUser: string;
	mailPassword: string;
	mailPort: string;
	sendMails: boolean;
};
