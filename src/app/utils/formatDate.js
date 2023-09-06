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
