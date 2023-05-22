import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  if (!process.env.APP_NAME) throw new Error('[ENV] App name not defined!!');

  if (!process.env.APP_PORT) throw new Error('[ENV] App port not defined!!');

  if (!process.env.MONGO_URL) throw new Error('[ENV] Database not defined!!');

  if (!process.env.ROUTE_DOCS)
    throw new Error('[ENV] Route docs not defined!!');

  return {
    name: process.env.APP_NAME,
    appPort: process.env.APP_PORT,
    routeDocs: process.env.ROUTE_DOCS,
    database: process.env.MONGO_URL,
  };
});
