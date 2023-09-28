import httpService from './http.service';

const authEndPointSignIn = 'auth/signInWithPassword/';
const authEndPointSignUp = 'auth/signUp/';

const authService = {
  signUp: async (payload) => {
    const data = await httpService.post(authEndPointSignUp, payload);
    return data;
  },
  signIn: async ({ email, password }) => {
    const data = await httpService.post(authEndPointSignIn, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  }
};

export default authService;
