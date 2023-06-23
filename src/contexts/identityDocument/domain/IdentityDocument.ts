import { AggregateRoot } from '../../shared/domain';
import { IdentityDocumentCountry } from './IdentityDocumentCountry';
import { IdentityDocumentDto } from './IdentityDocumentDto';
import { IdentityDocumentNumber } from './IdentityDocumentNumber';
import { IdentityDocumentType } from './IdentityDocumentType';

class IdentityDocument extends AggregateRoot {
	private type: IdentityDocumentType;
	private country: IdentityDocumentCountry;
	private idNumber: IdentityDocumentNumber;

	constructor(
		type: IdentityDocumentType,
		country: IdentityDocumentCountry,
		idNumber: IdentityDocumentNumber
	) {
		super();
		this.type = type;
		this.country = country;
		this.idNumber = idNumber;
	}

	static fromPrimitives(dto: IdentityDocumentDto) {
		return new IdentityDocument(
			new IdentityDocumentType(dto.type),
			new IdentityDocumentCountry(dto.country),
			new IdentityDocumentNumber(dto.idNumber)
		);
	}

	toPrimitives(): IdentityDocumentDto {
		return {
			type: this.type.value,
			country: this.country.value,
			idNumber: this.idNumber.value,
		};
	}
}

export { IdentityDocument };
