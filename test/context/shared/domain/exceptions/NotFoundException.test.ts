import { NotFoundException } from '../../../../../src/contexts/shared/domain';

describe('NotFoundException constructor', () => {
	test('Should asign No object found message to Error.message', () => {
		const notFound = new NotFoundException('pizza');
		expect(notFound.message).toBe('No pizza found');
	});
});
