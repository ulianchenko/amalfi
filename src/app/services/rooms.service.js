
import httpService from './http.service';

const roomsEndPoint = 'rooms/';

const roomsService = {
  getAll: async (queryParams) => {
    const data = await httpService.get(roomsEndPoint, queryParams);
    return data;
  },
  update: async (payload) => {
    const data = await httpService.patch(roomsEndPoint + payload._id, payload);
    return data;
  },
  setBooking: async (payload) => {
    const data = await httpService.post(roomsEndPoint + payload.roomId, { bookings: payload._id });
    return data;
  },
  deleteBooking: async (payload) => {
    const { data } = await httpService.post(roomsEndPoint + payload.roomId, { bookings: payload._id });
    return data;
  },
};

export default roomsService;