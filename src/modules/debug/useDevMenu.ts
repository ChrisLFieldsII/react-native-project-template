import { useEffect } from 'react';
import { DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screen, Navigation } from '~/modules/navigation';

/**
 * @desc hook to customize dev menu options
 */
export const useDevMenu = () => {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    if (!__DEV__) {
      return;
    }

    DevSettings.addMenuItem('Go to Debug Screen', () => {
      navigation.navigate(Screen.Debug, undefined);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
