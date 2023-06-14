import { AggregateRoot } from '../../shared/domain';

class Condo extends AggregateRoot {
	constructor() {
		super();
	}

	toPrimitives() {}
}

export { Condo };
