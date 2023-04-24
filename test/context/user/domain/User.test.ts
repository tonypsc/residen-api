import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';
import { User } from '../../../../src/contexts/user/domain';

describe('fromPrimitives', () => {
	test('should throw error (Name is required) on empty user name', () => {
		try {
			const user = User.fromPrimitives(
				'',
				'',
				'email@email.com',
				'Password.113'
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Name is required');
			}
		}
	});

	test('should throw error (Name "username" is larger than 50 chars) on long user name', () => {
		const name = 'the quick brown bat flies over the woods';
		try {
			const user = User.fromPrimitives(
				'',
				name,
				'email@email.com',
				'Password.113'
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe(
					`The user name ${name} has more than 50 characters.`
				);
			}
		}
	});

	test('should throw error (Email is required) on empty user email', () => {
		try {
			const user = User.fromPrimitives('', 'test-user', '', 'Password.113');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Email is required');
			}
		}
	});

	test('should throw error (Invalid email address) on empty user email', () => {
		try {
			const user = User.fromPrimitives(
				'',
				'test-user',
				'wrong-email',
				'Password.113'
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Invalid email address');
			}
		}
	});

	test('should throw error (Password is required) on empty password', () => {
		try {
			const user = User.fromPrimitives('', 'test-user', 'email@email.com', '');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Password is required');
			}
		}
	});

	test('should throw error (Password too weak) on empty password', () => {
		try {
			const user = User.fromPrimitives(
				'',
				'test-user',
				'email@email.com',
				'weak'
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Password too weak');
			}
		}
	});

	test('should throw error (Invalid status code) if status not in enum', () => {
		try {
			const user = User.fromPrimitives(
				'',
				'test-user3',
				'email@email.com',
				'Password.113',
				5
			);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Invalid status code');
			}
		}
	});

	test('should create user if all good', () => {
		const user = User.fromPrimitives(
			'',
			'test-user',
			'email@email.com',
			'Password.113'
		);
		expect(user).toBeInstanceOf(User);
	});

	test('should create a new user id 36 chars length for empty user id', () => {
		const user = User.fromPrimitives(
			'',
			'test-user',
			'email@email.com',
			'Password.113'
		);
		expect(user.toClient()._id?.length).toBe(36);
	});
});

describe('toClient', () => {
	test('result should not return password', () => {
		const user = User.fromPrimitives(
			'',
			'test-user',
			'email@email.com',
			'Password.113'
		);
		expect(user.toClient().password).toBeUndefined();
	});
});
