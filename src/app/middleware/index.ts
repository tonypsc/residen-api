import createError from 'http-errors';
import { Request, Response } from 'express';
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

export function error404Handler(req: Request, res: Response, next: Function) {
	next(createError(NOT_FOUND));
	//res.status(404).send('Not found');
}

export function errorHandler(err: any, req: Request, res: Response) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// sends the error to front
	res.status(err.status || SERVER_ERROR);
	res.send({
		status: 'error',
		errors: err.message,
	});
}
