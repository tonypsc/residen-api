interface CryptRepository {
	generateHash(password: string): string;
}

export { CryptRepository };
