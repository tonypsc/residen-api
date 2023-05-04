import jwt from 'jsonwebtoken';
import { InvalidArgumentError } from '../../domain';
import { JsonWebTokenRepository } from './JsonWebTokenRepository';

class JwtRepository implements JsonWebTokenRepository {
	private _secret: string;

	constructor(secret: string) {
		this.validateSecret(secret);
		this._secret = secret;
	}

	private validateSecret(secret: string) {
		if (!secret) throw new InvalidArgumentError('Wrong secret key');
	}

	generate(payload: string, expiration: string = '86400'): string {
		if (!payload) throw new InvalidArgumentError('Wrong payload');
		const token = jwt.sign({ _id: payload }, this._secret, {
			expiresIn: `${expiration}s`,
		});
		return token;
	}

	async authenticate(token: string): Promise<string> {
		return new Promise((resolve, reject) => {
			jwt.verify(token, this._secret, (err, data) => {
				if (err) reject(err);
				if (!data) reject('Wrong token');

				resolve(data?.toString() ?? '');
			});
		});
	}
}

export { JwtRepository };
