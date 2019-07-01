// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './env';

export const environment = {
  production: true,
  serverUrl: 'http://node-express-env.smyfpeipzf.eu-west-1.elasticbeanstalk.com/api',
  version: env.version,
  defaultTheme: env.defaultTheme,
  supportedThemes: env.supportedThemes,
  defaultLanguage: env.defaultLanguage,
  supportedLanguages: env.supportedLanguages
};
