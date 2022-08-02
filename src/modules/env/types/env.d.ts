declare module '@env' {
  export const INIT_ENV: 'dev' | 'stage' | 'prod';

  export const DEV_HOME_MSG: string;
  export const STAGE_HOME_MSG: string;
  export const PROD_HOME_MSG: string;

  export const DEV_API_URL: string;
  export const STAGE_API_URL: string;
  export const PROD_API_URL: string;
}
