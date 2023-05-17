import { TemplateRepository } from '../../../../../src/contexts/shared/infrastructure';

describe('generate', () => {
	test('should return empty string for non existing template file', () => {
		const templateRepository = new TemplateRepository('nonexisting');
		const result = templateRepository.generate();
		expect(result).toBe('');
	});

	test('should return string with <HTML> tag for register-email', () => {
		const templateRepository = new TemplateRepository('register-email');
		const result = templateRepository.generate();
		expect(result.includes('<!DOCTYPE html>')).toBe(true);
	});

	test('should return string with john doe for register-email and name=john doe', () => {
		const templateRepository = new TemplateRepository('register-email');
		const result = templateRepository.generate(new Map([['name', 'john doe']]));
		expect(result.includes('john doe')).toBe(true);
	});
});
