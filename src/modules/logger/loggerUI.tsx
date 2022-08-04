import React, { useReducer } from 'react';
import { Text, Spacer, Flex, Button } from '~/modules/common';

import { tags, levels } from './logger.utils';

/**
 * Render UI to change logger levels
 */
export const LoggerUI = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <>
      <Text>Logger UI</Text>

      {tags.map((tag) => {
        return (
          <Flex
            key={tag}
            flexDirection='row'
            alignItems='center'
            marginVertical={3}
          >
            <Text>{tag}:</Text>
            <Spacer width={6} />

            {levels.map((level) => {
              const isSelected =
                console[`${tag}Logger`]?.getLeveL() === level || false;

              return (
                <Flex key={level} flexDirection='row' alignItems='center'>
                  <Button
                    // style={{ padding: 1, borderWidth: 1 }}
                    onPress={() => {
                      console[`${tag}Logger`].setLevel(level);
                      forceUpdate(); // get ui to re-render & run getters
                    }}
                    children={isSelected ? 'x' : '-'}
                  />
                  <Spacer width={6} />
                  <Text>{level}</Text>
                  <Spacer width={6} />
                </Flex>
              );
            })}
          </Flex>
        );
      })}
    </>
  );
};
