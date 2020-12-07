

export const validateRequired = ( property: string , message: string ) => {
  const error = property === "" || property === null ? message : null;
  return error;
}