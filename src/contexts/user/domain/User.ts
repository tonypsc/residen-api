import { AggregateRoot } from '../../shared/domain';

import { UserName } from './UserName';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserPosibleStatus, UserStatus } from './UserStatus';
import { UserConfirmationLink } from './UserConfirmationLink';
import { UserRecoverLink } from './UserRecoverLink';
import { UserConfirmationLinkDate } from './UserConfirmationLinkDate';
import { UserRecoverLinkDate } from './UserRecoverLinkDate';
import { UserDto } from './UserDto';
import { UserAvatar } from './UserAvatar';

class User extends AggregateRoot {
	private _id: UserId;
	private _name: UserName;
	private _email: UserEmail;
	private _password: UserPassword;
	private _status?: UserStatus;
	private _confirmationLink?: UserConfirmationLink;
	private _recoverLink?: UserRecoverLink;
	private _confirmationLinkDate?: UserConfirmationLinkDate;
	private _recoverLinkDate?: UserRecoverLinkDate;
	private _avatar?: UserAvatar;

	constructor(
		id: UserId,
		name: UserName,
		email: UserEmail,
		password: UserPassword,
		status?: UserStatus,
		confirmationLink?: UserConfirmationLink,
		confirmationLinkDate?: UserConfirmationLinkDate,
		recoverLink?: UserRecoverLink,
		recoverLinkDate?: UserRecoverLinkDate,
		avatar?: UserAvatar
	) {
		super();
		this._id = id;
		this._name = name;
		this._email = email;
		this._password = password;
		this._status = status ?? new UserStatus(UserPosibleStatus.inactive);
		this._confirmationLink = confirmationLink;
		this._confirmationLinkDate = confirmationLinkDate;
		this._recoverLink = recoverLink;
		this._recoverLinkDate = recoverLinkDate;
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
			dto.confirmationLink
				? new UserConfirmationLink(dto.confirmationLink)
				: undefined,
			dto.confirmationLinkDate
				? new UserConfirmationLinkDate(dto.confirmationLinkDate)
				: undefined,
			dto.recoverLink ? new UserRecoverLink(dto.recoverLink) : undefined,
			dto.recoverLinkDate
				? new UserRecoverLinkDate(dto.recoverLinkDate)
				: undefined,
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
			confirmationLink: this._confirmationLink?.toString(),
			confirmationLinkDate: this._confirmationLinkDate?.value,
			recoverLink: this._recoverLink?.toString(),
			recoverLinkDate: this._recoverLinkDate?.value,
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
