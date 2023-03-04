import configFile from '../config.json';

const http = () => {

  const get = async (requestEndPoint, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    const url = `${configFile.apiEndPoint}${requestEndPoint}`;

      try {
          const response = await fetch(url, {method, body, headers});

          if (!response.ok) {
              throw new Error(`Could not fetch ${url}, status: ${response.status}`);
          }
          const data = await response.json();
          return data;
      } catch(error) {
          throw error;
      }
  };

  return { get };
}

const httpService = {
  get: http().get
};

export default httpService;