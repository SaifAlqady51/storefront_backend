import dotenv from 'dotenv';

dotenv.config();

export const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, POSTGRES_PORT } =
  process.env;
