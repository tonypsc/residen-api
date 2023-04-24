import { DateNumberValueObject } from '../../shared/domain';

class UserConfirmationLinkDate extends DateNumberValueObject {
	private _confirmationLinkDate;

	constructor(ndate: number) {
		super(ndate);
		this._confirmationLinkDate = ndate;
	}
}

export { UserConfirmationLinkDate };
