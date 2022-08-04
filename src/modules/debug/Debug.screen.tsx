import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Screen } from '~/modules/navigation';

import { Text, View, Button, Flex, Spacer } from '~/modules/common';
import { EnvConfig, envTypes } from '~/modules/env';
import { useNavigation } from '~/modules/navigation';
import { LoggerUI } from '~/modules/logger';

import { useEnvStore } from '~/modules/env';

// this UI sux :p

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
  return (
    <Flex padding={16}>
      <DebugKeyValues />

      <DebugButtons />

      <Spacer height={16} />
      <LoggerUI />
    </Flex>
  );
};

const DebugKeyValues = () => {
  const { env, setEnv, setEnvKey } = useEnvStore();

  // place custom key/values here
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
      <Text>Change whole env</Text>
      <Flex flexDirection='row'>
        {envTypes.map((envType) => {
          return (
            <Button key={envType} onPress={() => setEnv(envType)}>
              {envType}
            </Button>
          );
        })}
      </Flex>

      <Spacer height={16} />

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

            <Spacer height={16} />
          </View>
        );
      })}
    </>
  );
};

type DebugButtonsProps = {};

const DebugButtons = ({}: DebugButtonsProps) => {
  const navigation = useNavigation();

  // place debug btns here
  const btns: DebugBtn[] = [
    {
      text: 'Go to Storybook',
      onPress() {
        navigation.navigate(Screen.Storybook);
      },
    },
  ];

  return (
    <>
      <Text>Buttons</Text>
      {btns.map((btn) => {
        return (
          <Button key={btn.text} onPress={btn.onPress}>
            {btn.text}
          </Button>
        );
      })}
    </>
  );
};
