import envalid from 'envalid';
import dotenv from 'dotenv';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
dotenv.config({ path: dev ? '.env.development' : '.env' });

export default envalid.cleanEnv(process.env, {
  MONGO_URI: envalid.str(),
  PORT: envalid.port(),
});
