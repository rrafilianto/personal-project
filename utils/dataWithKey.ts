export const dataWithKey = (data: any[]): any[] => {
  return data.map((result: any, index: number) => {
    result.key = index;

    return result;
  });
};
