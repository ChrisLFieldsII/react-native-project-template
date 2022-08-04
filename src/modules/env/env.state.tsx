import create from 'zustand';
import { EnvConfig, env, EnvType, envConfigs } from './env';

export type EnvState = {
  env: EnvConfig;
  /** change whole env config */
  setEnv: (newEnv: EnvType) => void;
  /** change individual env key */
  setEnvKey: (args: { key: keyof EnvConfig; type: EnvType }) => void;
};

export const useEnvStore = create<EnvState>()((set, get) => ({
  env,
  setEnv(newEnv) {
    const newConfig = envConfigs[newEnv];
    set({ env: newConfig });
  },
  setEnvKey({ key, type }) {
    const config = get().env;

    set({
      env: {
        ...config,
        [key]: envConfigs[type][key],
      },
    });
  },
}));
