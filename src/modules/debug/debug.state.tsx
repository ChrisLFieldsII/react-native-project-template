import create from 'zustand';
import { EnvConfig, env, EnvType, envConfigs } from '../env';

type DebugState = {
  env: EnvConfig;
  /** change whole env config */
  setEnv: (newEnv: EnvType) => void;
  /** change individual env key */
  setEnvKey: (args: { key: keyof EnvConfig; type: EnvType }) => void;
};

export const useDebugStore = create<DebugState>()((set, get) => ({
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
