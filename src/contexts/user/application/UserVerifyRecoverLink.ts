import { JwtRepository } from '../../shared/infrastructure/jsonWebTokens/JwtRepository';

class UserVerifyRecoverLink {
	private _jwtRepository: JwtRepository;
	private _recoverLink: string;

	constructor(jwtRepository: JwtRepository, recoverLink: string) {
		this._jwtRepository = jwtRepository;
		this._recoverLink = recoverLink;
	}

	public invoke() {}
}

export { UserVerifyRecoverLink };

/* 
-Search a user with the recover link sent (throw)
-Verify link is valid (throw)

return ok
*/
