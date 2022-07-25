import React from 'react';

import { Text, FailureProps, createView } from '~/modules/common';
import { HomeModel } from '../../home.types';

const Loading = () => {
  return (
    <>
      <Text>Loading...</Text>
    </>
  );
};

const Success = ({ title }: HomeModel) => {
  return (
    <>
      <Text>{title}</Text>
    </>
  );
};

const Failure = ({ error }: FailureProps) => {
  return (
    <>
      <Text style={{ color: 'red' }}>{error.message}</Text>
    </>
  );
};

export const HomeView = createView<HomeModel>({
  Success,
  Loading,
  Failure,
});
