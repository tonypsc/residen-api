import nodemailer from 'nodemailer';
import { config } from '../../config';
import { InvalidArgumentError } from '../../contexts/shared/domain';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

class Mailer {
	async sendMail(to: string, subject = '', text = '') {
		if (!to) throw new InvalidArgumentError('Mail receiver is required.');

		// if mails are active
		if (!config.sendMails) return true;

		const nodemailerOptions: SMTPTransport.Options = {
			host: config.mailHost,
			port: parseInt(config.mailPort!),
			auth: {
				user: config.mailUser,
				pass: config.mailPassword,
			},
		};

		const transporter = nodemailer.createTransport({
			...nodemailerOptions,
		});

		const mailOptions = {
			from: config.mailUser,
			to: to,
			subject: subject,
			html: text,
		};

		try {
			// send mail with defined transport object
			await transporter.sendMail(mailOptions);
			return true;
		} catch (error) {
			throw new InvalidArgumentError(
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

export { Mailer };
