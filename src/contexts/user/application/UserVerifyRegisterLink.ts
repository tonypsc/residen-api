class UserVerifyRegisterLink {
	private _registerLink: string;

	constructor(registerLink: string) {
		this._registerLink = registerLink;
	}

	async invoke() {
		// get user id from link
		// get user from id
		// verify status is unconfirmed
		// change status to active
	}
}

export { UserVerifyRegisterLink };
