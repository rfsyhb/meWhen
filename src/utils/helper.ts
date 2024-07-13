export const getTodayDateKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // example: 05
  const day = String(today.getDate()).padStart(2, '0'); // example: 11
  return `${year}-${month}-${day}`;
};
