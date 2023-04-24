import { DateNumberValueObject } from '../../shared/domain';

class UserRecoverLinkDate extends DateNumberValueObject {
	private _recoverLinkDate;

	constructor(ndate: number) {
		super(ndate);
		this._recoverLinkDate = ndate;
	}
}

export { UserRecoverLinkDate };
