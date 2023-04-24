import { InvalidArgumentError } from '../../../../src/contexts/shared/domain';
import { UserName } from '../../../../src/contexts/user/domain/UserName';

describe('constructor', () => {
	test('should throw Name is required for empty name', () => {
		try {
			const uName = new UserName('');
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe('Name is required');
			}
		}
	});

	test('should throw error on user name biger than 50 chars', () => {
		const name = 'the quick brown bat flies over the woods';
		try {
			const uName = new UserName(name);
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidArgumentError);
			if (error instanceof InvalidArgumentError) {
				expect(error.message).toBe(
					`The user name ${name} has more than 50 characters.`
				);
			}
		}
	});
});
