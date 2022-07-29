import { DataTransform } from '~/modules/common';
import { HomeModel } from '../types';

/**
 * Transform api data for home screen into our frontend model to de-couple from api
 */
export const transformHomeApiData: DataTransform<string, HomeModel> = (
  data,
) => {
  return {
    title: data,
  };
};
