import { JwtRepository } from '../../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { config } from '../../../../../src/config';
import { InvalidArgumentError } from '../../../../../src/contexts/shared/domain';

describe('constructor', () => {
	test('should throw (Wrong secret key) on empty payload string', () => {
		try {
			const jwtRepository = new JwtRepository(config.jwtSecret);
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidArgumentError);
			if (err instanceof InvalidArgumentError) {
				expect(err.message).toBe('Wrong secret key');
			}
		}
	});
});

describe('generate', () => {
	test('should throw (Wrong payload) on empty payload string', () => {
		try {
			const jwtRepository = new JwtRepository(config.jwtSecret);
			jwtRepository.generate('');
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidArgumentError);
			if (err instanceof InvalidArgumentError) {
				expect(err.message).toBe('Wrong payload');
			}
		}
	});

	test('should generate a string with 155 chars', () => {
		const jwtRepository = new JwtRepository(config.jwtSecret);
		const token = jwtRepository.generate('somepayload');
		expect(token).toHaveLength(155);
	});
});
