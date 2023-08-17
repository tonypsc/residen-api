import { InvalidArgumentError, NonEmptyStringValue } from '../../shared/domain';
import { IdentityDocumentTypes } from './IdentityDocumentTypes';

class IdentityDocumentType extends NonEmptyStringValue {
	constructor(type: string) {
		super(type);
		this.checkValidType(type);
	}

	protected checkValidType(type: string) {
		if (type in IdentityDocumentTypes) {
			throw new InvalidArgumentError('Invalid document type');
		}
	}
}

export { IdentityDocumentType };
