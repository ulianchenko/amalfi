import configFile from '../config.json';

const http = () => {

  const get = async (requestEndPoint, queryParams = null, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    const url = new URL(`${configFile.apiEndPoint}${requestEndPoint}`);
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        if (Array.isArray(queryParams[key])) {
          queryParams[key].forEach(elem => url.searchParams.append(key, elem));
        } else {
          url.searchParams.append(key, queryParams[key]);
        }
      })
    };

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