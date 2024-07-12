import { useState, useEffect } from 'react';

const useTodayDate = () => {
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    setTodayDate(`${day} ${month} ${year}`);
  }, []);

  return { todayDate };
};

export default useTodayDate;
