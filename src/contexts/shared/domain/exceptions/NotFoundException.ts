class NotFoundException extends Error {
	constructor(message?: string) {
		super(`No ${message ? message : 'element'} found`);
	}
}

export { NotFoundException };
