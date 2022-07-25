// since this modules types are small, we can keep them all in one file.
// if this file grows too big, extract types to a `types` dir within this module!

import { ViewModelProps } from '~/modules/common';

/**
 * @desc The model for the home screen
 */
export type HomeModel = {
  title: string;
};

export type HomeViewModelProps = ViewModelProps<HomeModel>;
