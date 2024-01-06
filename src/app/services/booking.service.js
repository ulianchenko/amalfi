import httpService from './http.service';

const bookingEndPoint = 'booking/';

const bookingService = {
  getAll: async () => {
    const { data } = await httpService.get(bookingEndPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(bookingEndPoint, payload);
    return data;
  },
  remove: async (id) => {
    await httpService.delete(bookingEndPoint + id);
    return id;
  },
};

export default bookingService;
