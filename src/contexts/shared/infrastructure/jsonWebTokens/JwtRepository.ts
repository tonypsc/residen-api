import jwt from 'jsonwebtoken';

class JwtRepository implements JsonWebTokenRepository {
	private _secret: string;

	constructor(secret: string) {
		this._secret = secret;
	}

	generate(payload: string, expiration: string = '86400'): string {
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
