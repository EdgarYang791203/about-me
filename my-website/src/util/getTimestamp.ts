const getTimeNumbers = (): number[] => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const addZero = (num: number) => `${num > 9 ? "" : "0"}${num}`;
  const timeString = `${addZero(hours)}:${addZero(minutes)}:${addZero(
    seconds
  )}`;
  return timeString
    .split("")
    .map((numStr) => (Number(numStr) ? Number(numStr) : 0));
};

export default getTimeNumbers;
