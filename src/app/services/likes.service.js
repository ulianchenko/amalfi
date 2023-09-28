import httpService from './http.service';

const likesEndPoint = 'like/';

const likesService = {
  getAll: async () => {
    const data = await httpService.get(likesEndPoint);
    return data;
  },
  create: async (payload) => {
    const data = await httpService.post(likesEndPoint, payload);
    return data;
  },
  remove: async (id) => {
    await httpService.delete(likesEndPoint + id);
    return id;
  },
};

export default likesService;
