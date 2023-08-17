import { Client } from '../../client/domain/Client';
import { Room } from '../../room/domain/Room';

interface Suite {
	_id: string;
	number: string;
	location: string;
	maxClientNumber: number;
	clients: Client[];
	contractHolder: Client;
	price: number;
	measures: string;
	rooms: Room[];
	movements: Movement[];
	payments: Payment[];
	paymentPeriod: number;
	disabled: boolean;
	residenceId: string;
}

export { Suite };
