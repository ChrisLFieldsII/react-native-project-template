import { EnvState, useEnvStore } from './env.state';

const selector = (store: EnvState) => store.env;

export const useEnv = () => {
  const env = useEnvStore(selector);
  return env;
};
