import { AggregateRoot } from '../../shared/domain';

import { UserName } from './UserName';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserPosibleStatus, UserStatus } from './UserStatus';
import { UserDto } from './UserDto';
import { UserAvatar } from './UserAvatar';

class User extends AggregateRoot {
	private _id: UserId;
	private _name: UserName;
	private _email: UserEmail;
	private _password: UserPassword;
	private _status?: UserStatus;
	private _avatar?: UserAvatar;

	constructor(
		id: UserId,
		name: UserName,
		email: UserEmail,
		password: UserPassword,
		status?: UserStatus,
		avatar?: UserAvatar
	) {
		super();
		this._id = id;
		this._name = name;
		this._email = email;
		this._password = password;
		this._status = status ?? new UserStatus(UserPosibleStatus.inactive);
		this._avatar = avatar;
	}

	static fromPrimitives(
		id: string,
		name: string,
		email: string,
		password: string,
		status?: number
	) {
		return new User(
			new UserId(id),
			new UserName(name),
			new UserEmail(email),
			new UserPassword(password),
			new UserStatus(status)
		);
	}

	static fromDto(dto: UserDto): User {
		return new User(
			new UserId(dto._id),
			new UserName(dto.name),
			new UserEmail(dto.email),
			new UserPassword(dto.password),
			new UserStatus(dto.status),
			dto.avatar ? new UserAvatar(dto.avatar) : undefined
		);
	}

	toPrimitives(): UserDto {
		return {
			_id: this._id.toString(),
			name: this._name.toString(),
			email: this._email.toString(),
			password: this._password?.toString(),
			status: this._status?.value,
			avatar: this._avatar?.value,
		};
	}

	toClient(): Partial<UserDto> {
		return {
			_id: this._id.value,
			name: this._name.value,
			email: this._email.value,
			status: this._status?.value,
			avatar: this._avatar?.value,
		};
	}

	setCryptedPassword(password: string) {
		this._password = new UserPassword(password, false);
	}
}

export { User };
