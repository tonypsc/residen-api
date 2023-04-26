interface CryptRepository {
	generateHash(password: string): string;
	compare(value: string, hash: string): Promise<boolean>;
}

export { CryptRepository };
