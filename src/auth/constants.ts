// eslint-disable-next-line @typescript-eslint/no-var-requires
const env = require('dotenv').config().parsed;

export const jwtConstants = {
  secret: env.JWT_KEY,
};
