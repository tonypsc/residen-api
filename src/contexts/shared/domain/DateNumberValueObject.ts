import { ValueObject } from './ValueObject';

abstract class DateNumberValueObject extends ValueObject<number> {
	_date: number;

	constructor(ndate: number) {
		super(ndate);
		this._date = ndate;
	}

	public getDate() {
		return new Date(this._date);
	}

	public toDateString() {
		return new Date(this._date).toDateString();
	}

	/**
	 * Verifies if date has expired against a number of days
	 * @param duration Duration in days
	 */
	public isExpired(duration: number) {
		const durationMiliSeconds = duration * 24 * 60 * 60 * 1000;
		return this._date + durationMiliSeconds < new Date().getTime();
	}
}

export { DateNumberValueObject };
