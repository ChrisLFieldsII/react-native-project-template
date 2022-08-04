import { useEffect } from 'react';
import { DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screen, Navigation } from '~/modules/navigation';

type DevMenuItem = {
  text: string;
  onPress: (navigation: Navigation) => void;
};

const items: DevMenuItem[] = [
  {
    text: 'Go to Debug Screen',
    onPress(navigation) {
      navigation.navigate(Screen.Debug, undefined);
    },
  },
  {
    text: 'Go to Storybook',
    onPress(navigation) {
      navigation.navigate(Screen.Storybook);
    },
  },
];

/**
 * @desc hook to customize dev menu options
 */
export const useDevMenu = () => {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    if (!__DEV__) {
      return;
    }

    items.forEach(({ onPress, text }) => {
      DevSettings.addMenuItem(text, onPress.bind(undefined, navigation));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
