import { UuidValue } from '../../shared/domain';

export class UserId extends UuidValue {
	constructor(id: string) {
		super(id);
	}
}
