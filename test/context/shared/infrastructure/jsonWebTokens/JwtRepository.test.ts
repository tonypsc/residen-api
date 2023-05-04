import jwt from 'jsonwebtoken';

import { JwtRepository } from '../../../../../src/contexts/shared/infrastructure/jsonWebTokens/JwtRepository';
import { config } from '../../../../../src/config';
import { InvalidArgumentError } from '../../../../../src/contexts/shared/domain';

const jwtRepository = new JwtRepository(config.jwtSecret);
let generatedToken: string;

describe('constructor', () => {
	test('should throw (Wrong secret key) on empty secret', () => {
		try {
			const badJwtRepository = new JwtRepository('');
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
			jwtRepository.generate('');
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidArgumentError);
			if (err instanceof InvalidArgumentError) {
				expect(err.message).toBe('Wrong payload');
			}
		}
	});

	test('should generate a string with 155 chars', () => {
		generatedToken = jwtRepository.generate('somepayload');
		expect(generatedToken).toHaveLength(155);
	});
});

describe('authenticate', () => {
	test('should throw (jwt must be provided) on empty token', async () => {
		try {
			const result = await jwtRepository.authenticate('');
		} catch (err) {
			expect(err).toBeInstanceOf(jwt.JsonWebTokenError);
			if (err instanceof jwt.JsonWebTokenError) {
				expect(err.message).toBe('jwt must be provided');
			}
		}
	});

	test('should throw (jwt malformed) on not valid token', async () => {
		try {
			const result = await jwtRepository.authenticate('notvalidtoken');
		} catch (err) {
			expect(err).toBeInstanceOf(jwt.JsonWebTokenError);
			if (err instanceof jwt.JsonWebTokenError) {
				expect(err.message).toBe('jwt malformed');
			}
		}
	});

	test('should throw (jwt expired) on previously generated expired token', async () => {
		try {
			const result = await jwtRepository.authenticate(
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJwYXlsb2FkdG9leHBpcmUiLCJpYXQiOjE2ODMyMTkxNjIsImV4cCI6MTY4MzIxOTE2M30.0EcMUrjkxAo8RFdpyzRrMOXSf2MiIYOQw-DBaa8tkz0'
			);
		} catch (err) {
			expect(err).toBeInstanceOf(jwt.JsonWebTokenError);
			if (err instanceof jwt.JsonWebTokenError) {
				expect(err.message).toBe('jwt expired');
			}
		}
	});

	test('previously generated token must be valid', async () => {
		const result = await jwtRepository.authenticate(generatedToken);
		expect(result).toBe('somepayload');
	});
});
