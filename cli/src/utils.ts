/** convert hello to Hello */
export const pascalCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
