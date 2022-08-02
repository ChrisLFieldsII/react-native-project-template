import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Screen } from '~/modules/navigation';

import { Text, View, Button, Flex } from '~/modules/common';
import { EnvConfig, EnvType, envTypes } from '~/modules/env';

import { useDebugStore } from './debug.state';

type DebugScreenProps = StackScreenProps<RootStackParamList, Screen.Debug>;

type DebugKeyValue = {
  key: string;
  value: string;
};

type DebugBtn = {
  text: string;
  onPress: () => void;
};

type EnvKey = keyof EnvConfig;

/** env vars to block from displaying in debug screen */
const envBlockList: EnvKey[] = [];

export const DebugScreen = ({}: DebugScreenProps) => {
  const { env, setEnv, setEnvKey } = useDebugStore();

  const keyValues: DebugKeyValue[] = [];

  // map over `env` object and add to `keyValues`
  const envKeys = (Object.keys(env) as EnvKey[]).filter(
    (k) => !envBlockList.includes(k),
  );

  envKeys.forEach((key) => {
    keyValues.push({
      key,
      value: env[key],
    });
  });

  return (
    <>
      <Flex flexDirection='row'>
        {envTypes.map((envType) => {
          return (
            <Button key={envType} onPress={() => setEnv(envType)}>
              {envType}
            </Button>
          );
        })}
      </Flex>

      {/* display key values */}
      {keyValues.map((kv) => {
        return (
          <View key={kv.key}>
            <Text>{kv.key}</Text>
            <Text>{kv.value}</Text>
            {(envKeys as string[]).includes(kv.key) ? (
              <Flex flexDirection='row'>
                {envTypes.map((envType) => {
                  return (
                    <Button
                      key={envType}
                      onPress={() =>
                        setEnvKey({
                          key: kv.key as keyof EnvConfig,
                          type: envType,
                        })
                      }
                    >
                      {envType}
                    </Button>
                  );
                })}
              </Flex>
            ) : null}
          </View>
        );
      })}
    </>
  );
};
