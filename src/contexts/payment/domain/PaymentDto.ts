import { ClientDto } from '../../client/domain';

interface PaymentDto {
	_id: string;
	occurrence: number;
	observation: string;
	amount: number;
	client: ClientDto;
}

export { PaymentDto };
