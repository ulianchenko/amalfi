const SEARCH_QUERY = 'search-query';
const BOOKING = 'booking';

export function setSessionStorageData(payload) {
  sessionStorage.setItem(SEARCH_QUERY, JSON.stringify(payload));
}

export function getSearchQueryData() {
  return JSON.parse(sessionStorage.getItem(SEARCH_QUERY));
}

export function resetSessionStorageData() {
  // sessionStorage.clear();
  sessionStorage.removeItem(SEARCH_QUERY);
}

export function setSessionStorageBooking(booking) {
  const bookingsArr = sessionStorage.getItem(BOOKING) ?
    [...JSON.parse(sessionStorage.getItem(BOOKING)), booking] :
    [booking];
  // const bookingStr = sessionStorage.getItem(BOOKING) ?
  //   sessionStorage.getItem(BOOKING) + `${JSON.stringify(booking)};` :
  //   JSON.stringify(booking);
  // sessionStorage.setItem(BOOKING, bookingStr);
  sessionStorage.setItem(BOOKING, JSON.stringify(bookingsArr));
}

export function getSessionStorageBooking() {
  // return JSON.parse(sessionStorage.getItem(BOOKING));
  // const bookingsArr = sessionStorage.getItem(BOOKING).split(';');
  // const bookingsArr = JSON.parse(sessionStorage.getItem(BOOKING));
  // return bookingsArr.map((booking) => JSON.parse(booking));
  return JSON.parse(sessionStorage.getItem(BOOKING)) || [];
}

export function removeSessionStorageBooking(bookingId) {
  const bookingsArr = JSON.parse(sessionStorage.getItem(BOOKING));
  if (bookingsArr) {
    const bookings = bookingsArr.filter(booking => booking._id !== bookingId)
    sessionStorage.setItem(BOOKING, JSON.stringify(bookings));
  }
}

const sessionStorageService = {
  setSessionStorageData,
  getSearchQueryData,
  resetSessionStorageData,
  setSessionStorageBooking,
  getSessionStorageBooking
};

export default sessionStorageService;