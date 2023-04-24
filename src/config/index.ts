import path from 'path';
import dotenv from 'dotenv';
import { ConfigType } from './types';

const ENV = process.env.ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, '.env') });

const envConfig = require(path.resolve(
	__dirname,
	'./environments',
	ENV + '.ts'
));

const config: ConfigType = { ...envConfig.environment, env: ENV };

export { config };
