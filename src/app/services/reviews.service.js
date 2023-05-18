import httpService from './http.service';

const reviewsEndPoint = 'review/';

const reviewsService = {
  getAll: async () => {
    const data = await httpService.get(reviewsEndPoint);
    return data;
  },
};

export default reviewsService;
