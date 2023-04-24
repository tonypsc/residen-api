import { ValueObject } from '../../../../src/contexts/shared/domain';

class StringValue extends ValueObject<string> {
	constructor(stringValue: string) {
		super(stringValue);
	}
}

class BooleanValue extends ValueObject<boolean> {
	constructor(boolValue: boolean) {
		super(boolValue);
	}
}

describe('valueOf', () => {
	const stringValue = new StringValue('hello world');
	test('Should return constructor value', () => {
		expect(stringValue.valueOf()).toBe('hello world');
	});
});

describe('equals', () => {
	const stringValue = new StringValue('hello world');
	test('Should return false for diferent strings', () => {
		expect(stringValue.equals('HELLO')).toBe(false);
	});

	test('Should return true for equal strings', () => {
		expect(stringValue.equals('hello world')).toBe(true);
	});

	test('Should return false for differences in casing', () => {
		expect(stringValue.equals('Hello world')).toBe(false);
	});
});

describe('toString', () => {
	const stringValue = new StringValue('hello world');
	const booleanValue = new BooleanValue(false);
	test('Should return same value on string', () => {
		expect(stringValue.toString()).toBe('hello world');
	});

	test('Should return "false" on false boolean', () => {
		expect(booleanValue.toString()).toBe('false');
	});
});
