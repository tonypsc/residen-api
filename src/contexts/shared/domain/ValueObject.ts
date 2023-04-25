export type Primitives = String | string | number | Boolean | boolean | Date;

abstract class ValueObject<T extends Primitives> {
	readonly value: T;

	constructor(value: T) {
		this.value = value;
	}

	public equals(compareValue: T): boolean {
		return this.value === compareValue;
	}

	public toString(): string {
		return this.value.toString();
	}

	public valueOf(): T {
		return this.value;
	}
}

export { ValueObject };
