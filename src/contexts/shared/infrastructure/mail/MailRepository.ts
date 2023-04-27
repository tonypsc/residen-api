interface MailRepository {
	sendMail(to: string, subject?: string, text?: string): Promise<boolean>;
}

export { MailRepository };
