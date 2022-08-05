const useDatesFormat = () => {
  const getNewDigit = (digit: number) => {
    return digit < 10 ? `0${digit}` : digit;
  };

  const toDMYTimeFormat = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();

    return `${getNewDigit(day)}-${getNewDigit(month)}-${year} ${getNewDigit(
      hour
    )}:${getNewDigit(minute)}`;
  };

  return { toDMYTimeFormat };
};

export default useDatesFormat;
