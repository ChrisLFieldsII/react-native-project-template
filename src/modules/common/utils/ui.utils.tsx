import React from 'react';
import { ViewModelProps, DefaultModel } from '../types';

type CreateViewInput<Model extends DefaultModel> = {
  Success: (props: Model) => JSX.Element;
  Loading?: () => JSX.Element;
  Failure?: (props: { error: Error }) => JSX.Element;
  Empty?: () => JSX.Element;
};

export const RenderNull = () => null;

/**
 * Create a UI `View` given a `ViewModel` and components that represent different
 * states like `Success`, `Loading`, `Empty`, `Failure`.
 */
export const createView = <Model extends DefaultModel>(
  input: CreateViewInput<Model>,
): React.FC<ViewModelProps<Model>> => {
  const {
    Success,
    Failure = RenderNull,
    Loading = RenderNull,
    Empty = RenderNull,
  } = input;

  return (props) => {
    const { status } = props;

    if (status === 'error') {
      return <Failure {...props} />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    if (status === 'empty') {
      return <Empty />;
    }

    if (status === 'success') {
      const { model } = props;
      return <Success {...model} />;
    }

    return null;
  };
};
