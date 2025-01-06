export const getOneYearAgoTimestamp = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 1); // Subtract 1 year
  return currentDate.getTime(); // Get Unix timestamp in milliseconds
};
