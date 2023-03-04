
import httpService from './http.service';

const roomsEndPoint = 'rooms/';

const roomsService = {
  getAll: async () => {
    const data = await httpService.get(roomsEndPoint);
    return data;
  },
};

export default roomsService;