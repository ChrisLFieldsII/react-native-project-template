/** type that represents a data transform function which accepts input and returns output */
export type DataTransform<Input, Output> = (input: Input) => Output;
