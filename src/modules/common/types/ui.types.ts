export type DefaultModel = Record<string, unknown>;

export type ViewModelProps<Model extends DefaultModel = DefaultModel> =
  | {
      status: 'success';
      model: Model;
    }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'empty' };

export type FailureProps = {
  error: Error;
};
