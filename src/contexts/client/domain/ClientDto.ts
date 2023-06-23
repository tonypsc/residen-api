import { CondoDto } from '../../condo/domain/CondoDto';
import { IdentityDocumentDto } from '../../identityDocument/domain';

interface ClientDto {
	_id: string;
	name: string;
	phone: string;
	email: string;
	identityDocument: IdentityDocumentDto;
	condoId: string;
	condo?: CondoDto;
}

export { ClientDto };
