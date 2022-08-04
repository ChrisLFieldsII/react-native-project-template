import { useNavigation as useNavigationBase } from '@react-navigation/native';

import { Navigation } from './navigation.types';

/**
 * @desc `useNavigation` with typings already applied.
 */
export const useNavigation = () => {
  return useNavigationBase<Navigation>();
};
