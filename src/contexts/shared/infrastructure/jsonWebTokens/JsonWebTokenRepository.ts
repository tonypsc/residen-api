interface JsonWebTokenRepository {
	generate(payload: string, expiration: string): string;
	authenticate(value: string): Promise<string>;
}
