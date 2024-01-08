
import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';
import authService from './auth.service';
import localStorageService from './localStorage.service';

// const http = () => {

//   const get = async (requestEndPoint, queryParams = null, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
//     const url = new URL(`${configFile.apiEndPoint}${requestEndPoint}`);

//     if (queryParams) {
//       Object.keys(queryParams).forEach(key => {
//         if (Array.isArray(queryParams[key])) {
//           queryParams[key].forEach(elem => url.searchParams.append(key, elem));
//         } else {
//           url.searchParams.append(key, queryParams[key]);
//         }
//       })
//     };

//       try {
//         const response = await fetch(url, {method, body, headers});

//           if (!response.ok) {
//               throw new Error(`Could not fetch ${url}, status: ${response.status}`);
//           }
//           const data = await response.json();
//           return data;
//       } catch(error) {
//           throw error;
//       }
//   };

//   const post = async (requestEndPoint, body = null, method = 'POST', headers = {'Content-Type': 'application/json'}) => {
//     const url = `${configFile.apiEndPoint}${requestEndPoint}`;
//     const accessToken = localStorageService.getAccessToken();
//     headers = {...headers, Authorization: `Bearer ${accessToken}`};
//     const bodyStringified = JSON.stringify(body);
//     try {
//       const response = await fetch(url, {method, body: bodyStringified, headers});

//         if (!response.ok) {
//           const errorResponse = await response.json();
//           throw errorResponse;
//         }
//         const data = await response.json();
//         return data;
//     } catch(error) {
//         throw error;
//     }
//   };

//   const patch = async (requestEndPoint, body = null, method = 'PATCH', headers = {'Content-Type': 'application/json'}) => {
//     const url = `${configFile.apiEndPoint}${requestEndPoint}`;
//     const accessToken = localStorageService.getAccessToken();
//     headers = {...headers, Authorization: `Bearer ${accessToken}`};
//     const bodyStringified = JSON.stringify(body);
//     try {
//       const response = await fetch(url, {method, body: bodyStringified, headers});

//         if (!response.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch(error) {
//         throw error;
//     }
//   };

//   const deleteReq = async (requestEndPoint, body = null, method = 'DELETE', headers = {'Content-Type': 'application/json'}) => {
//     const url = `${configFile.apiEndPoint}${requestEndPoint}`;
//     const accessToken = localStorageService.getAccessToken();
//     headers = {...headers, Authorization: `Bearer ${accessToken}`};
//     try {
//       const response = await fetch(url, {method, body, headers});

//         if (!response.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch(error) {
//         throw error;
//     }
//   };

//   return { get, post, patch, deleteReq };
// }

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();

    const isExpired = refreshToken && Number(expiresDate) < Date.now();
    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map(key => ({
        ...data[key],
      }))
    : data;
}

http.interceptors.response.use(
  res => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  patch: http.patch,
  delete: http.delete
};

export default httpService;