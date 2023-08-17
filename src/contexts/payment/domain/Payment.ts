import { Client } from '../../client/domain';
import { AggregateRoot } from '../../shared/domain';
import { PaymentAmount } from './PaymentAmount';
import { PaymentDto } from './PaymentDto';
import { PaymentId } from './PaymentId';
import { PaymentObservation } from './PaymentObservation';
import { PaymentOccurrence } from './PaymentOccurrence';

class Payment extends AggregateRoot {
	private _id: PaymentId;
	private occurrence: PaymentOccurrence;
	private observation: PaymentObservation;
	private amount: PaymentAmount;
	private client: Client;

	constructor(
		_id: string,
		occurrence: number,
		observation: string,
		amount: number,
		client: Client
	) {
		super();
		this._id = new PaymentId(_id);
		this.occurrence = new PaymentOccurrence(occurrence);
		this.observation = new PaymentObservation(observation);
		this.amount = new PaymentAmount(amount);
		this.client = client;
	}

	toPrimitives(): PaymentDto {
		return {
			_id: this._id.value,
			occurrence: this.occurrence.value,
			observation: this.observation.value,
			amount: this.amount.value,
			client: this.client.toPrimitives(),
		};
	}

	static fromPrimitives(dto: PaymentDto): Payment {
		return new Payment(
			dto._id,
			dto.occurrence,
			dto.observation,
			dto.amount,
			Client.fromPrimitives(dto.client)
		);
	}
}

export { Payment };
