import { INIT_ENV, DEV_HOME_MSG, STAGE_HOME_MSG, PROD_HOME_MSG } from '@env';

/** env variables for an env type */
export type EnvConfig = {
  HOME_MSG: string;
};

/** the diff types of env configurations */
export type EnvType = 'dev' | 'stage' | 'prod';

export const envConfigs: Record<EnvType, EnvConfig> = {
  dev: {
    HOME_MSG: DEV_HOME_MSG,
  },
  stage: {
    HOME_MSG: STAGE_HOME_MSG,
  },
  prod: {
    HOME_MSG: PROD_HOME_MSG,
  },
};

export const env = envConfigs[INIT_ENV];
