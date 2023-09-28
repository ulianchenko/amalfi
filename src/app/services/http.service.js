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

  const post = async (requestEndPoint, body = null, method = 'POST', headers = {'Content-Type': 'application/json'}) => {
    const url = `${configFile.apiEndPoint}${requestEndPoint}`
    const bodyStringified = JSON.stringify(body);
    try {
      const response = await fetch(url, {method, body: bodyStringified, headers});

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw error;
    }
  };

  const patch = async (requestEndPoint, body = null, method = 'PATCH', headers = {'Content-Type': 'application/json'}) => {
    const url = `${configFile.apiEndPoint}${requestEndPoint}`
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

  const deleteReq = async (requestEndPoint, body = null, method = 'DELETE', headers = {'Content-Type': 'application/json'}) => {
    const url = `${configFile.apiEndPoint}${requestEndPoint}`
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

  return { get, post, patch, deleteReq };
}

const httpService = {
  get: http().get,
  post: http().post,
  patch: http().patch,
  delete: http().deleteReq
};

export default httpService;