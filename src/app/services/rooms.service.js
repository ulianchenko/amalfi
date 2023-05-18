
import httpService from './http.service';

const roomsEndPoint = 'rooms/';

const roomsService = {
  getAll: async (queryParams) => {
    const data = await httpService.get(roomsEndPoint, queryParams);
    return data;
  },
};

export default roomsService;