export type ViewModelProps<Model extends Record<string, unknown>> =
  | {
      status: 'success';
      model: Model;
    }
  | { status: 'loading' }
  | { status: 'error'; error: Error };
