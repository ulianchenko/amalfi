import httpService from './http.service';

const reviewsEndPoint = 'review/';

const reviewsService = {
  getAll: async () => {
    const { data } = await httpService.get(reviewsEndPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(reviewsEndPoint, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(reviewsEndPoint + payload._id, payload);
    return data;
  },
  remove: async (id) => {
    // console.log(id);
    await httpService.delete(reviewsEndPoint + id);
    return id;
  },
};

export default reviewsService;
