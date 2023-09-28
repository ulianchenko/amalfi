import httpService from './http.service';

const authEndPoint = 'auth/signInWithPassword/'

const authService = {
  signIn: async ({ email, password }) => {
    const data = await httpService.post(authEndPoint, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  }
};

export default authService;
