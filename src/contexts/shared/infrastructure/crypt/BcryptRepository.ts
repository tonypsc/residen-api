import { CryptRepository } from './CryptRepository';
import bcrypt from 'bcryptjs';

class BcryptRepository implements CryptRepository {
	generateHash(password: string): string {
		if (password === '') throw new Error('Wrong input string');
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}
}

export { BcryptRepository };
