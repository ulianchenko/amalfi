import declOfNum from './declOfNum';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function decomposeDate(date) {
  date = new Date(date).getTime();
  if (typeof date === 'string') {
    date = Number(date);
  }
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const hours = new Date(date).getHours();
  const min = new Date(date).getMinutes();

  return { date, year, month, day, hours, min };
}

export function getDateDDMMYYYY(date) {
  const { day, month, year } = decomposeDate(date);
  return `${day} ${months[month]} ${year}`;
}

export default function formatDate(value) {
  value = new Date(value).getTime();
  const { year, month, day, hours, min } = decomposeDate(value);

  const currentDateTime = Date.now();
  const postCreatedTime = Number(value);
  const diffTime = Math.abs(currentDateTime - postCreatedTime);

  const checkLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getValidTime = (hours, min) => {
    hours = hours < 10 ? `0${hours}` : hours;
    min = min < 10 ? `0${min}` : min;
    return `${hours}:${min}`;
  };

  const oneMinutesAgo = 60000;
  const thirtyMinutesAgo = oneMinutesAgo * 30;
  const lessOneDay = oneMinutesAgo * 60 * 24;
  const lessCurrentYear = lessOneDay * (checkLeapYear(year) ? 366 : 365);

  if (diffTime <= oneMinutesAgo) {
    return 'just now';
  } else if (diffTime <= thirtyMinutesAgo) {
    const minutes = Math.floor(diffTime / 60000);
    return `${minutes} ${declOfNum(minutes, ['minute', 'minutes'])} ago`;
  } else if (diffTime > thirtyMinutesAgo && diffTime <= lessOneDay) {
    return `today at ${getValidTime(hours, min)}`;
  } else if (diffTime > lessOneDay && diffTime <= lessCurrentYear) {
    return `${day} ${months[month]} at ${getValidTime(hours, min)}`;
  } else if (diffTime > lessCurrentYear) {
    return `${day} ${months[month]} ${year} года в ${getValidTime(hours, min)}`;
  } else {
    return `This comment was left by UFO ¯\\_(ツ)_/¯`;
  }
}
