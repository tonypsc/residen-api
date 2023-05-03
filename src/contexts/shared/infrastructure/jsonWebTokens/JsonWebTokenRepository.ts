interface JsonWebTokenRepository {
	generate(value: string): string;
	authenticate(value: string): boolean;
}
