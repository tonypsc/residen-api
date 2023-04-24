import {
	UserStatus,
	UserPosibleStatus,
} from '../../../../src/contexts/user/domain/UserStatus';

describe('constructor', () => {
	test('should create default status on empty instance', () => {
		const newUserStatus = new UserStatus();
		expect(newUserStatus.valueOf()).toBe(UserPosibleStatus.inactive);
	});
});
