export const debounce = (callback: any, delay: number) => {
  let timer: any;

  return (data: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(data), delay);
  };
};
