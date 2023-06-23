import { Condo } from '../../condo/domain/Condo';
import { IdentityDocument } from '../../identityDocument/domain';
import { AggregateRoot, UuidValue } from '../../shared/domain';
import { ClientCondoId } from './ClientCondoId';
import { ClientDto } from './ClientDto';
import { ClientEmail } from './ClientEmail';
import { ClientId } from './ClientId';
import { ClientName } from './ClientName';
import { ClientPhone } from './ClientPhone';

class Client extends AggregateRoot {
	private _id: ClientId;
	private name: ClientName;
	private email: ClientEmail;
	private phone: ClientPhone;
	private identityDocument: IdentityDocument;
	private condoId: ClientCondoId;
	private condo?: Condo;

	constructor(
		id: ClientId,
		name: ClientName,
		email: ClientEmail,
		phone: ClientPhone,
		identityDocument: IdentityDocument,
		condoId: ClientCondoId,
		condo?: Condo
	) {
		super();
		this._id = id;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.identityDocument = identityDocument;
		this.condoId = condoId;
		this.condo = condo;
	}

	static fromPrimitives(dto: ClientDto) {
		return new Client(
			new ClientId(dto._id),
			new ClientName(dto.name),
			new ClientEmail(dto.email),
			new ClientPhone(dto.phone),
			IdentityDocument.fromPrimitives(dto.identityDocument),
			new ClientCondoId(dto.condoId),
			dto.condo ? Condo.fromPrimitives(dto.condo) : undefined
		);
	}

	toPrimitives(): ClientDto {
		return {
			_id: this._id.value,
			name: this.name.value,
			email: this.email.value,
			phone: this.phone.value,
			identityDocument: this.identityDocument.toPrimitives(),
			condoId: this.condoId.value,
			condo: this.condo?.toPrimitives(),
		};
	}
}

export { Client };
