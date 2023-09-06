import httpService from './http.service';

const userEndpoint = 'user/';

const userService = {
  getAll: async () => {
    const data = await httpService.get(userEndpoint);
    return data;
  }
};

export default userService;
