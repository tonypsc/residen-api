import nodemailer from 'nodemailer';

import { EmailException } from '../../domain';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailRepository } from './MailRepository';

class NodeMailerRepository implements MailRepository {
	private _sendMails: boolean;
	private _mailHost: string;
	private _mailPort: number;
	private _mailUser: string;
	private _mailPassword: string;

	constructor(
		sendMails: boolean,
		mailHost: string,
		mailPort: number,
		mailUser: string,
		mailPassword: string
	) {
		this._mailHost = mailHost;
		this._sendMails = sendMails;
		this._mailPort = mailPort;
		this._mailUser = mailUser;
		this._mailPassword = mailPassword;
	}

	async sendMail(to: string, subject = '', text = '') {
		if (!to) throw new EmailException('Mail receiver is required.');

		// if mails are active
		if (!this._sendMails) return true;

		const nodemailerOptions: SMTPTransport.Options = {
			host: this._mailHost,
			port: this._mailPort,
			auth: {
				user: this._mailUser,
				pass: this._mailPassword,
			},
		};

		console.log(nodemailerOptions);

		const transporter = nodemailer.createTransport({
			...nodemailerOptions,
		});

		const mailOptions = {
			from: this._mailUser,
			to: to,
			subject: subject,
			html: text,
		};

		try {
			// send mail with defined transport object
			await transporter.sendMail(mailOptions);
			return true;
		} catch (error) {
			throw new EmailException(
				'Mail system error. ' + (error as Error).message
			);
		}

		// const info = await transporter.sendMail(mailOptions);

		//console.log('Message sent: %s', info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		//console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	}
}

export { NodeMailerRepository };
