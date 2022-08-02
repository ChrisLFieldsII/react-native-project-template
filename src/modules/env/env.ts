import {
  INIT_ENV,
  DEV_HOME_MSG,
  STAGE_HOME_MSG,
  PROD_HOME_MSG,
  DEV_API_URL,
  PROD_API_URL,
  STAGE_API_URL,
} from '@env';

/** env variables for an env type */
export type EnvConfig = {
  HOME_MSG: string;
  API_URL: string;
};

/** the diff types of env configurations */
export type EnvType = 'dev' | 'stage' | 'prod';

export const envConfigs: Record<EnvType, EnvConfig> = {
  dev: {
    HOME_MSG: DEV_HOME_MSG,
    API_URL: DEV_API_URL,
  },
  stage: {
    HOME_MSG: STAGE_HOME_MSG,
    API_URL: STAGE_API_URL,
  },
  prod: {
    HOME_MSG: PROD_HOME_MSG,
    API_URL: PROD_API_URL,
  },
};

export const env = envConfigs[INIT_ENV];
export const envTypes: EnvType[] = ['dev', 'stage', 'prod'];
