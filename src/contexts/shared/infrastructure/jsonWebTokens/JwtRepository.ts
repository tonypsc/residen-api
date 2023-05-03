import { Jwt } from 'jsonwebtoken';

class JwtRepository implements JsonWebTokenRepository {
	generate(value: string): string {
		return value;
	}

	authenticate(value: string): boolean {
		return true;
	}
}
