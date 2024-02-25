import httpService from './http.service';

const paymentEndPoint = 'payment/';

const paymentService = {
  create: async (payload) => {
    const { data } = await httpService.post(paymentEndPoint + payload.endPoint, payload.data);
    return data;
  }
};

export default paymentService;
