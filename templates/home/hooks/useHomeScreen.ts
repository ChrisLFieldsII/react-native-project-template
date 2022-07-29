import { useQuery } from '@tanstack/react-query';
import { HomeViewModelProps } from '../types';
import { transformHomeApiData } from '../utils';

/**
 * Hook to get Home screen view model.
 *
 * The query fetches data from your api, and transforms the api data to your frontend model
 * to de-couple app from api.
 */
export const useHomeScreen = (): HomeViewModelProps => {
  const query = useQuery<string, Error>(['home'], () => {
    const mockError = false; // toggle to true to get view to mock an error

    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          return reject(new Error('Error loading home screen'));
        }

        resolve('Welcome to the home screen!');
      }, 1000 * 2);
    });
  });

  if (query.isLoading) {
    return {
      status: 'loading',
    };
  }

  if (query.isError) {
    return {
      status: 'error',
      error: query.error,
    };
  }

  const model = transformHomeApiData(query.data);

  return {
    status: 'success',
    model,
  };
};
